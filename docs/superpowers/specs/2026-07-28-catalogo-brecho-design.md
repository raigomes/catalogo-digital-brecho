# Design: Catálogo Digital Brechó da Maria

> Aprovado em 28/07/2026. Direção visual: Zine Independente.
> v2 — Adicionado Google Sheets mock + rota categoria + rota produto.

## Rotas

| Rota | Descrição | Status |
|------|-----------|--------|
| `/` | Home: header + busca + filtros + novidades + categorias | ✅ Implementada |
| `/categoria/[slug]` | Grid filtrado por categoria | ⏳ Pendente |
| `/produto/[id]` | Página detalhe do produto | ⏳ Pendente |

## Home (`/`)

### Mobile (375px)

1. **Header** — fundo toner `#1a1a1a`, texto "BREChO DA MARIA" `#f4f1ea`, Courier, padding 16px
2. **Busca** — input texto com placeholder + abaixo: tags categoria (TODOS, VESTIDOS, BLUSAS, SAIAS, CALÇAS, JAQUETAS, ACESSÓRIOS)
3. **Filtro Tamanho** — tags fita crepe: TODOS, P, M, G, GG
4. **Filtro Preço** — tags fita crepe: TODOS, ATÉ R$50, R$50-R$100, R$100-R$200, R$200+
5. **Novidades** — título "NOVIDADES" + grid 2 col (6-8 cards Polaroid)
6. **Categorias** — título "CATEGORIAS" + grid tags de categoria

### Desktop (>768px)

- Sidebar filtros à esquerda (240px): busca input + categoria + tamanho + preço
- Grid cards à direita: 4 colunas
- Cards sem rotação negativa (mais sutil)

## Página Categoria (`/categoria/[slug]`)

### Layout

- Header Zine com nome da categoria (ex: "VESTIDOS")
- Grid de produtos filtrados (2/3/4 col)
- Busca + filtros (mesmo sistema da Home — reaproveitar `SidebarFiltros`/`FiltrosMobile`)
- Reaproveitar componentes: `CardPolaroid`, `TagCategoria`

### Estados

- Loading: skeleton grid (mesmo da Home)
- Vazio: "nada nessa edição — volto já!"
- Erro: "nossa tiragem atrasou — tenta de novo"
- Offline: mensagem PWA

### Data flow

1. `params.slug` → resolver nome da categoria via `fetchCategorias()`
2. `fetchProdutosPorCategoria(nome)` → array filtrado
3. Se categoria não existir → `notFound()`

## Página Detalhe (`/produto/[id]`)

### Mobile

Layout scroll vertical:

- **Header** — seta "← Voltar" + nome categoria
- **Foto grande** — 3:4 ratio, largura total
- **Ficha** — nome (Courier 16px), preço (rosa 14px bold), tamanhos (tags fita crepe), descrição (Courier 12px)
- **Botão WhatsApp** — fundo rosa `#ff3b7f`, texto "QUERO ESSE!", link `wa.me` com mensagem "Olá! Tenho interesse em [nome] (ref #[id])"

### Desktop

- Foto + ficha lado a lado (2 col)
- Foto ocupa 60% largura, ficha 40%

### Estados

- Loading: esqueleto página dupla (retângulo foto + barras texto)
- Não encontrado: "essa peça já era — edição esgotada" + link voltar
- Erro/offline: mensagens padrão

## Camada de Dados — Google Sheets Mock

### `src/lib/api.ts`

Interface pública da camada de dados:

```ts
export async function fetchProdutos(): Promise<Produto[]>
export async function fetchProdutoPorId(id: string): Promise<Produto | null>
export async function fetchProdutosPorCategoria(nome: string): Promise<Produto[]>
export async function fetchCategorias(): Promise<Categoria[]>
```

Hoje: implementação importa dados sintéticos de `data.ts` e filtra em memória.
Amanhã: trocar corpo das funções para `fetch()` contra Google Sheets publicada.

Nenhuma página importa `data.ts` diretamente. Só `api.ts`.

### Schema da Planilha (`.impeccable/surfaces/catalog/google-sheets-schema.md`)

| Coluna | Tipo | Exemplo |
|--------|------|---------|
| `nome` | texto | Vestido Flor |
| `descricao` | texto longo | Vestido florido em viscose... |
| `preco` | número (centavos) | 8990 |
| `categoria` | texto | Vestidos |
| `tamanhos` | texto (separado por vírgula) | P, M, G |
| `fotos` | texto (URLs separadas por vírgula) | https://placehold.co/... |
| `disponivel` | booleano (VERDADEIRO/FALSO) | VERDADEIRO |

### `src/lib/planilha-exemplo.json`

JSON array com 3-5 registros de exemplo seguindo o schema acima. Servir como fixture para testes e documentação do formato.

## Filtros

- **Categoria:** tags estilo fita crepe (`bg: #f5d742`, borda toner 1px), quebram em 2 linhas no mobile
- **Tamanho:** mesmas tags, quebram em 2 linhas: [TODOS P M] + [G GG]
- **Preço:** faixas pré-definidas, quebram em 2 linhas: [TODOS ATÉ R$50] + [R$50-R$100 R$100-R$200 R$200+]
- Estado ativo: destaque visual (toner bg, texto branco)
- Busca por texto com debounce 300ms
- <500ms conforme spec

## Componentes

| Componente | ID no .pen | Status |
|------------|-----------|--------|
| `Card` (Polaroid) | `ZIaU6` | ✅ |
| `Tag Categoria` | `Vemtv` | ✅ |
| `Botao CTA` (WhatsApp) | `Y8xMg` | ✅ |
| `SidebarFiltros` | — | ✅ |
| `FiltrosMobile` | — | ✅ |
| `SecaoNovidades` | — | ✅ |

## Telas no Design (.pen)

| Tela | ID | Descrição |
|------|-----|-----------|
| Home Mobile | `y5XGc` | 375×1200, header + busca + filtros (cat/tam/pre) + novidades + categorias |
| Produto Detalhe | `iK8mc` | 375×812, header voltar + foto + ficha + CTA |
| Home Desktop | `naI9g` | 1024×812, sidebar 240px + grid 4 col |

## Design Tokens (definidos no .pen)

- `bg`: #f4f1ea (papel pardo)
- `fg`: #1a1a1a (toner)
- `primary`: #ff3b7f (rosa CTA)
- `accent`: #f5d742 (fita crepe)
- `font-body`: Courier Prime
- `font-heading`: Courier Prime
- `hover-lift`: 4
- `spacing-xs/sm/md/lg/xl`: 4/8/16/24/32
- `transition-page`: view-transition
