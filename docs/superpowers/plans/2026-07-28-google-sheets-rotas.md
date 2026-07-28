# Google Sheets + Rotas Categoria/Produto — Impl Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar camada de dados mock do Google Sheets + rotas `/categoria/[slug]` e `/produto/[id]`.

**Architecture:** Camada `api.ts` isola fonte de dados (hoje mock sintético, amanhã planilha real). Páginas consomem `api.ts` sem saber origem. Rotas seguem App Router com async components + error/loading boundaries.

**Tech Stack:** Next.js 16 App Router, Tailwind 4, Courier Prime, dados sintéticos.

## Global Constraints

- Todas as cores e fontes seguem tokens Zine do `catalog.pen`: bg `#f4f1ea`, fg `#1a1a1a`, primary `#ff3b7f`, accent `#f5d742`
- `border-radius: 0` global
- Fonte: Courier Prime (via `next/font`, já configurado no layout)
- View transitions já configuradas no `ViewTransitionsProvider`
- Dados sintéticos etiquetados como `/* DADOS SINTÉTICOS */`
- Prices em centavos (int)
- Nenhuma página importa `data.ts` diretamente — só via `api.ts`

---

### Task 1: Camada de Dados — `api.ts` + schema + fixture

**Files:**
- Create: `src/lib/api.ts`
- Create: `.impeccable/surfaces/catalog/google-sheets-schema.md`
- Create: `src/lib/planilha-exemplo.json`
- Modify: `src/lib/data.ts` (adicionar campo `id` aos comentários se necessário — já tem)

**Interfaces:**
- Consumes: `Produto` e `Categoria` de `types.ts`, dados sintéticos de `data.ts`
- Produces: `fetchProdutos()`, `fetchProdutoPorId(id)`, `fetchProdutosPorCategoria(nome)`, `fetchCategorias()`

- [ ] **Step 1: Criar `.impeccable/surfaces/catalog/google-sheets-schema.md`**

```markdown
# Schema Google Sheets — Catálogo Brechó da Maria

## Colunas da Planilha

| Coluna | Tipo | Obrigatório | Descrição | Exemplo |
|--------|------|-------------|-----------|---------|
| `nome` | texto | sim | Nome do produto | Vestido Flor |
| `descricao` | texto | sim | Descrição detalhada | Vestido florido em viscose... |
| `preco` | número | sim | Preço em centavos (R$ 89,90 = 8990) | 8990 |
| `categoria` | texto | sim | Nome da categoria | Vestidos |
| `tamanhos` | texto | sim | Tamanhos separados por vírgula | P, M, G |
| `fotos` | texto | sim | URLs das fotos separadas por vírgula | https://placehold.co/400x600?text=Vestido+Flor |
| `disponivel` | booleano | sim | TRUE ou FALSE | TRUE |
| `createdAt` | data | não | Data de inclusão (ISO 8601) | 2026-07-28T10:00:00Z |

## Como publicar

1. Criar planilha no Google Sheets com estas colunas na primeira linha
2. Preencher dados a partir da linha 2
3. Publicar como JSON via Google Apps Script Web App (endpoint GET)
4. Atualizar `api.ts` para usar `fetch(url)` no lugar do import sintético
```

- [ ] **Step 2: Criar `src/lib/planilha-exemplo.json`**

```json
/* DADOS SINTÉTICOS — fixture para testes */
[
  {
    "nome": "Vestido Flor",
    "descricao": "Vestido florido em viscose. Leve, fresco, ideal para dias quentes.",
    "preco": 8990,
    "categoria": "Vestidos",
    "tamanhos": "P, M, G",
    "fotos": "https://placehold.co/400x600?text=Vestido+Flor",
    "disponivel": true,
    "createdAt": "2026-07-28T10:00:00Z"
  },
  {
    "nome": "Blusa Transpassada",
    "descricao": "Blusa em crepe com amarração lateral. Decote V, manga longa.",
    "preco": 5990,
    "categoria": "Blusas",
    "tamanhos": "P, M",
    "fotos": "https://placehold.co/400x600?text=Blusa+Transpassada",
    "disponivel": true,
    "createdAt": "2026-07-27T14:30:00Z"
  },
  {
    "nome": "Jaqueta Couro",
    "descricao": "Jaqueta couro legítimo. Preta, zíper diagonal, gola careca.",
    "preco": 19990,
    "categoria": "Jaquetas",
    "tamanhos": "M, G",
    "fotos": "https://placehold.co/400x600?text=Jaqueta+Couro",
    "disponivel": true,
    "createdAt": "2026-07-18T14:20:00Z"
  }
]
```

- [ ] **Step 3: Criar `src/lib/api.ts`**

```ts
/* DADOS SINTÉTICOS — camada de dados mock */
/* Trocar implementação para fetch() quando planilha Google Sheets estiver pronta */

import type { Produto, Categoria } from "./types"
import { produtos as produtosMock, categorias as categoriasMock } from "./data"
import { slugify } from "./utils"

function delay(ms: number = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchProdutos(): Promise<Produto[]> {
  await delay(150) // simula latência de rede
  return [...produtosMock].filter((p) => p.disponivel)
}

export async function fetchProdutoPorId(id: string): Promise<Produto | null> {
  await delay(100)
  const produto = produtosMock.find((p) => p.id === id && p.disponivel)
  return produto ?? null
}

export async function fetchProdutosPorCategoria(
  nome: string
): Promise<Produto[]> {
  await delay(150)
  return produtosMock.filter((p) => p.categoria === nome && p.disponivel)
}

export async function fetchCategorias(): Promise<Categoria[]> {
  await delay(50)
  return [...categoriasMock]
}
```

- [ ] **Step 4: Atualizar `tasks.md` — marcar tarefa GS-01 como concluída**

```bash
git add .impeccable/surfaces/catalog/google-sheets-schema.md src/lib/planilha-exemplo.json src/lib/api.ts
git commit -m "feat: add google sheets mock layer (api.ts + schema + fixture)"
```

---

### Task 2: Rota `/categoria/[slug]`

**Files:**
- Create: `src/app/categoria/[slug]/page.tsx`
- Create: `src/app/categoria/[slug]/loading.tsx`
- Create: `src/app/categoria/[slug]/error.tsx`

**Interfaces:**
- Consumes: `fetchProdutosPorCategoria(nome)`, `fetchCategorias()` de `api.ts`
- Consumes: componentes `CardPolaroid`, `SidebarFiltros`, `FiltrosMobile`, `TagCategoria`
- Produces: Página de listagem filtrada por categoria

- [ ] **Step 1: Criar `src/app/categoria/[slug]/page.tsx`**

```tsx
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchCategorias, fetchProdutosPorCategoria } from "@/lib/api"
import { CardPolaroid } from "@/components/card-polaroid"
import { SidebarFiltros } from "@/components/sidebar-filtros"
import { FiltrosMobile } from "@/components/filtros-mobile"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categorias = await fetchCategorias()
  return categorias.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const categorias = await fetchCategorias()
  const cat = categorias.find((c) => c.slug === slug)
  if (!cat) return { title: "Categoria — BreChó da Maria" }
  return {
    title: `${cat.nome} — BreChó da Maria`,
    description: `Catálogo de ${cat.nome.toLowerCase()} — moda feminina seminova.`,
  }
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params
  const categorias = await fetchCategorias()
  const cat = categorias.find((c) => c.slug === slug)
  if (!cat) notFound()

  const produtos = await fetchProdutosPorCategoria(cat.nome)

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f1ea]">
      {/* Header */}
      <header className="bg-[#1a1a1a] px-4 py-4 flex items-center gap-4">
        <Link
          href="/"
          className="text-[#f4f1ea] text-xs uppercase tracking-widest hover:text-[#ff3b7f] transition-colors"
          style={{ viewTransitionName: "back-link" }}
        >
          ← Voltar
        </Link>
        <h1 className="text-[#f4f1ea] text-lg uppercase tracking-[0.2em] font-bold">
          {cat.nome}
        </h1>
      </header>

      {/* Filtros mobile */}
      <div className="lg:hidden">
        <FiltrosMobile
          categorias={categorias}
          selectedCategoria={cat.nome}
          // busca e outros filtros operam client-side
        />
      </div>

      {/* Desktop: sidebar + grid */}
      <div className="flex flex-1">
        <aside className="hidden lg:block w-[200px] shrink-0 border-r border-[#1a1a1a]/20 p-4">
          <SidebarFiltros
            categorias={categorias}
            selectedCategoria={cat.nome}
          />
        </aside>

        <main className="flex-1 p-4">
          {produtos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm uppercase tracking-wider text-[#1a1a1a]/60">
                nada nessa edição — volto já!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {produtos.map((produto) => (
                <CardPolaroid key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Criar `src/app/categoria/[slug]/loading.tsx`**

```tsx
import { SkeletonCard } from "@/components/skeleton-card"

export default function CategoriaLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f1ea]">
      <header className="bg-[#1a1a1a] px-4 py-4">
        <div className="h-5 w-32 bg-[#f4f1ea]/20 animate-pulse" />
      </header>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Criar `src/app/categoria/[slug]/error.tsx`**

```tsx
"use client"

export default function CategoriaError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f1ea] gap-4 p-4">
      <p className="text-sm uppercase tracking-wider text-center text-[#1a1a1a]/60">
        nossa tiragem atrasou — tenta de novo
      </p>
      <button
        onClick={reset}
        className="bg-[#ff3b7f] text-white text-xs uppercase tracking-widest px-6 py-2 border border-[#1a1a1a] hover:bg-[#e63572] transition-colors"
      >
        tentar de novo
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Testar build**

Run: `npm run build`
Expected: Compila sem erros, rota `/categoria/vestidos` aparece no output

- [ ] **Step 5: Commit**

```bash
git add src/app/categoria/
git commit -m "feat: add categoria/[slug] route with loading/error states"
```

---

### Task 3: Rota `/produto/[id]`

**Files:**
- Create: `src/app/produto/[id]/page.tsx`
- Create: `src/app/produto/[id]/loading.tsx`
- Create: `src/app/produto/[id]/error.tsx`
- Create: `src/app/produto/[id]/not-found.tsx`

**Interfaces:**
- Consumes: `fetchProdutoPorId(id)` de `api.ts`
- Consumes: `BotaoWhatsApp` component
- Produces: Página de detalhe do produto

- [ ] **Step 1: Criar `src/app/produto/[id]/page.tsx`**

```tsx
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { fetchProdutoPorId } from "@/lib/api"
import { formatPreco } from "@/lib/utils"
import { BotaoWhatsApp } from "@/components/botao-whatsapp"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const produto = await fetchProdutoPorId(id)
  if (!produto) return { title: "Produto — BreChó da Maria" }
  return {
    title: `${produto.nome} — BreChó da Maria`,
    description: produto.descricao,
  }
}

export default async function ProdutoPage({ params }: Props) {
  const { id } = await params
  const produto = await fetchProdutoPorId(id)
  if (!produto) notFound()

  return (
    <div className="min-h-screen bg-[#f4f1ea] flex flex-col">
      {/* Header */}
      <header className="bg-[#1a1a1a] px-4 py-4 flex items-center gap-4">
        <Link
          href="/"
          className="text-[#f4f1ea] text-xs uppercase tracking-widest hover:text-[#ff3b7f] transition-colors"
        >
          ← Voltar
        </Link>
        <span className="text-[#f4f1ea]/60 text-xs uppercase tracking-wider">
          {produto.categoria}
        </span>
      </header>

      {/* Foto */}
      <div className="relative w-full aspect-[3/4] bg-[#e0ddd5]">
        <Image
          src={produto.fotos[0]}
          alt={produto.nome}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        {!produto.disponivel && (
          <div className="absolute inset-0 bg-[#1a1a1a]/60 flex items-center justify-center">
            <span className="text-[#f4f1ea] text-sm uppercase tracking-widest">
              Vendido
            </span>
          </div>
        )}
      </div>

      {/* Ficha técnica */}
      <div className="flex-1 p-4 space-y-4">
        <div>
          <h1 className="text-base uppercase tracking-wider text-[#1a1a1a] font-bold">
            {produto.nome}
          </h1>
          <p className="text-sm text-[#ff3b7f] font-bold mt-1">
            {formatPreco(produto.preco)}
          </p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#1a1a1a]/40 mb-2">
            Tamanhos
          </h2>
          <div className="flex flex-wrap gap-2">
            {produto.tamanhos.map((t) => (
              <span
                key={t}
                className="bg-[#f5d742] text-[#1a1a1a] text-[11px] uppercase tracking-wider px-2.5 py-1 border border-[#1a1a1a]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-[#1a1a1a]/40 mb-1">
            Descrição
          </h2>
          <p className="text-xs leading-relaxed text-[#1a1a1a]/80">
            {produto.descricao}
          </p>
        </div>

        <div className="pt-4">
          <BotaoWhatsApp
            mensagem={`Olá! Tenho interesse em ${produto.nome} (ref #${produto.id})`}
          />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Criar `src/app/produto/[id]/loading.tsx`**

```tsx
export default function ProdutoLoading() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] flex flex-col">
      <header className="bg-[#1a1a1a] px-4 py-4">
        <div className="h-4 w-24 bg-[#f4f1ea]/20 animate-pulse" />
      </header>
      <div className="w-full aspect-[3/4] bg-[#e0ddd5] animate-pulse" />
      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-2">
          <div className="h-5 w-48 bg-[#e0ddd5] animate-pulse" />
          <div className="h-4 w-24 bg-[#e0ddd5] animate-pulse" />
        </div>
        <div className="space-y-1">
          <div className="h-3 w-16 bg-[#e0ddd5] animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 w-10 bg-[#e0ddd5] animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-3 w-16 bg-[#e0ddd5] animate-pulse" />
          <div className="h-3 w-full bg-[#e0ddd5] animate-pulse" />
          <div className="h-3 w-3/4 bg-[#e0ddd5] animate-pulse" />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Criar `src/app/produto/[id]/error.tsx`**

```tsx
"use client"

export default function ProdutoError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f1ea] gap-4 p-4">
      <p className="text-sm uppercase tracking-wider text-center text-[#1a1a1a]/60">
        nossa tiragem atrasou — tenta de novo
      </p>
      <button
        onClick={reset}
        className="bg-[#ff3b7f] text-white text-xs uppercase tracking-widest px-6 py-2 border border-[#1a1a1a] hover:bg-[#e63572] transition-colors"
      >
        tentar de novo
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Criar `src/app/produto/[id]/not-found.tsx`**

```tsx
import Link from "next/link"

export default function ProdutoNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f1ea] gap-4 p-4">
      <p className="text-sm uppercase tracking-wider text-center text-[#1a1a1a]/60">
        essa peça já era — edição esgotada
      </p>
      <Link
        href="/"
        className="bg-[#ff3b7f] text-white text-xs uppercase tracking-widest px-6 py-2 border border-[#1a1a1a] hover:bg-[#e63572] transition-colors"
      >
        ver novidades
      </Link>
    </div>
  )
}
```

- [ ] **Step 5: Atualizar `BotaoWhatsApp` se necessário para aceitar `mensagem` prop**

Verificar `src/components/botao-whatsapp.tsx` atual:
```tsx
// Se o componente atual já aceita `mensagem` prop, ok.
// Se não, adicionar suporte para receber mensagem customizada.
```

- [ ] **Step 6: Testar build**

Run: `npm run build`
Expected: Compila sem erros

- [ ] **Step 7: Commit**

```bash
git add src/app/produto/
git commit -m "feat: add produto/[id] route with loading/error/not-found states"
```

---

### Task 4: Atualizar tasks.md

**Files:**
- Modify: `tasks.md`

- [ ] **Step 1: Adicionar seção "Camada de Dados" com tasks GS-01 concluída**

```
## Camada de Dados (Google Sheets Mock)

- [x] **GS-01** Criar `api.ts` com interface fetch* mock (isola dados sintéticos)
- [x] **GS-02** Schema planilha documentado (`google-sheets-schema.md`)
- [x] **GS-03** Fixture JSON de exemplo (`planilha-exemplo.json`)
- [ ] **GS-04** Integração real com Google Sheets (quando planilha da Maria estiver pronta)
```

- [ ] **Step 2: Adicionar seção "Rota /categoria/[slug]" com tasks CR-01..CR-03 concluídas**

```
## Rota /categoria/[slug]

- [x] **CR-01** Página de listagem filtrada (reaproveita CardPolaroid, SidebarFiltros, FiltrosMobile)
- [x] **CR-02** Loading state (skeleton grid)
- [x] **CR-03** Error state ("nossa tiragem atrasou" + retry)
- [x] **CR-04** Geração de metadados SEO (generateMetadata, generateStaticParams)
```

- [ ] **Step 3: Adicionar seção "Rota /produto/[id]" com tasks PR-01..PR-06 concluídas**

```
## Rota /produto/[id]

- [x] **PR-01** Página detalhe (foto grande + ficha técnica + WhatsApp)
- [x] **PR-02** Loading state (esqueleto foto + texto)
- [x] **PR-03** Error state ("nossa tiragem atrasou" + retry)
- [x] **PR-04** Not found state ("essa peça já era — edição esgotada")
- [x] **PR-05** Botão WhatsApp com mensagem pré-preenchida
- [x] **PR-06** Geração de metadados SEO (generateMetadata)
```

- [ ] **Step 4: Commit**

```bash
git add tasks.md
git commit -m "docs: update tasks.md with google sheets mock + categoria/produto routes"
```

---

## Self-Review Checklist

- [ ] **Spec coverage:** All items from spec covered:
  - Google Sheets mock layer (api.ts, schema, fixture) ✅ Task 1
  - `/categoria/[slug]` route ✅ Task 2
  - `/produto/[id]` route ✅ Task 3
  - BotaoWhatsApp with product message ✅ Task 3
  - Loading/error/not-found/empty states ✅ Tasks 2, 3

- [ ] **Placeholder scan:** No TBD/TODO/incomplete steps ✅

- [ ] **Type consistency:** `fetchProdutos()`, `fetchProdutoPorId(id)`, `fetchProdutosPorCategoria(nome)`, `fetchCategorias()` use consistent types across all tasks ✅
