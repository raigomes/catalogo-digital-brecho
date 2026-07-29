# 🛍️ Catálogo Digital — Brechó da Maria

Catálogo online de moda feminina seminova. Maria (MEI) gerencia uma planilha no Google Sheets, o site consome os dados automaticamente. Cliente navega, filtra, vê detalhes e entra em contato via WhatsApp.

**Live:** [catalogodamaria.raigomes.dev](https://catalogodamaria.raigomes.dev/)

---

## ✨ Funcionalidades

- **Catálogo com busca + filtros** — texto livre, categoria, tamanho, faixa de preço
- **Grid de cards "Polaroid"** com identidade visual Zine Independente
- **Página de detalhe** do produto com foto, ficha técnica e botão WhatsApp
- **Dados gerenciáveis via Google Sheets** — Maria atualiza a planilha, o site reflete automaticamente
- **Fallback sintético** — dados mock para desenvolvimento sem planilha configurada
- **PWA** — service worker para cache offline e manifesto para instalação
- **Responsivo** — mobile-first, adaptado para Android básico (Chrome antigo)
- **Performance** — Lighthouse Desktop 100, Acessibilidade 100, 3G ≥82

---

## 🧱 Stack

| Camada         | Tecnologia                                      |
|----------------|-------------------------------------------------|
| Framework      | Next.js 16 (App Router, Turbopack)              |
| Estilos        | Tailwind CSS + Shadcn/UI                        |
| Fonte          | Courier Prime (via `next/font`)                 |
| CMS            | Google Sheets (API pública, fallback mock)      |
| Ícone          | SVG inline + PNG (sacola.png)                   |
| PWA            | Service Worker + manifest.json                  |
| Deploy         | Vercel (auto-deploy via GitHub)                 |

---

## 🎨 Direção Visual — Zine Independente

O design é inspirado em zines independentes dos anos 90: fotocópia, colagem, tipografia datilografada.

| Elemento         | Valor                  | Uso                              |
|------------------|------------------------|----------------------------------|
| Fundo            | `#f4f1ea` (papel pardo) | Background da página             |
| Toner            | `#1a1a1a`              | Textos, bordas                   |
| Rosa CTA         | `#ff3b7f`              | Botões, destaque                 |
| Preço            | `#c62860`              | Valor dos produtos (contraste AA)|
| Fita crepe       | `#f5d742`              | Tags, badges, detalhes           |
| Fonte            | Courier Prime          | Títulos, corpo, labels           |
| Cards            | Polaroid colada        | Borda + sombra + tag "NOVIDADE"  |
| Grid             | 2 col mobile → 4 col desktop | Responsivo              |
| Transições       | Hover lift + sombra    | Micro-interação zine             |

---

## 🏗️ Arquitetura

```
Google Sheets (dados)
       ↓
fetchFromSheet()  ←  se SHEETS_ID + SHEETS_API_KEY
       ↓ (fallback)
produtosMock (data.ts)  ←  dados sintéticos para dev
       ↓
fetchProdutos() / fetchProdutoPorId()
       ↓
Server Components (page.tsx)
       ↓
Client Components (filtros, cards, interação)
```

**Fluxo de dados:**
1. O server component lê `searchParams` e faz `fetchProdutos()` + `fetchCategorias()`
2. Se as env vars `SHEETS_ID` e `SHEETS_API_KEY` estiverem configuradas, busca da Google Sheets
3. Caso contrário, usa dados sintéticos do `data.ts` (com delay simulado)
4. Os dados são passados para componentes client-side que gerenciam filtros e interação

**Rotas:**
- `/` — Home com grid de novidades, busca, filtros laterais/mobile
- `/produto/[id]` — Detalhe do produto com foto, informações e WhatsApp

---

## 📦 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fontes, footer, service worker
│   ├── page.tsx            # Home page (server component)
│   ├── not-found.tsx       # Página 404 zine
│   ├── globals.css         # Design tokens, animações
│   └── produto/[id]/
│       ├── page.tsx        # Detalhe do produto
│       ├── not-found.tsx   # 404 específico produto
│       └── error.tsx       # Error boundary
├── components/
│   ├── home-page-content.tsx    # Client: busca, filtros, grid
│   ├── card-polaroid.tsx        # Card produto (imagem + info)
│   ├── secao-novidades.tsx      # Grid de cards com loading/vazio
│   ├── header.tsx               # Header com logo + navegação
│   ├── footer.tsx               # Footer com redes + disclaimer
│   ├── sidebar-filtros.tsx      # Filtros desktop
│   ├── filtros-mobile.tsx       # Filtros mobile (drawer)
│   ├── botao-whatsapp.tsx       # CTA WhatsApp
│   ├── tag-categoria.tsx        # Tag fita crepe
│   ├── info-produto.tsx         # Ficha do produto
│   ├── skeleton-card.tsx        # Skeleton loading
│   ├── view-transitions-provider.tsx
│   └── service-worker-register.tsx
└── lib/
    ├── api.ts             # Camada de dados (sheets → mock)
    ├── sheets.ts          # Integração Google Sheets
    ├── data.ts            # Dados sintéticos
    ├── types.ts           # Tipos TypeScript
    ├── utils.ts           # Utilitários (formatação, filtros)
    └── hooks.ts           # Custom hooks (useDebounce)
```

---

## 🚀 Começando

```bash
# Clonar
git clone https://github.com/raigomes/catalogo-digital-brecho.git
cd catalogo-digital-brecho

# Instalar dependências
npm install

# Desenvolvimento
npm run dev
# → http://localhost:3000

# Build de produção
npm run build
npm start
```

**Para usar Google Sheets como CMS:**
```bash
# Configurar env vars (ex: .env.local)
SHEETS_ID=seu_id_da_planilha
SHEETS_API_KEY=sua_chave_api
```

A planilha deve ter uma aba chamada `data-template` com as colunas:
`nome`, `descricao`, `preco`, `categoria`, `tamanhos`, `fotos`, `disponivel`, `createdAt`

---

## 📊 Performance

| Métrica                | Desktop | 3G (simulado) |
|------------------------|---------|---------------|
| Performance            | 100     | 82-86         |
| Acessibilidade         | 100     | —             |
| Best Practices         | 100     | —             |
| SEO                    | 100     | —             |
| First Contentful Paint | 0.3s    | 0.9-1.1s      |
| Largest Contentful Paint | 0.6s  | 2.0-2.5s      |
| Cumulative Layout Shift | 0      | 0             |
| Total Blocking Time    | 0ms     | 30-70ms       |

**Otimizações aplicadas:**
- SSR direto (sem Suspense) — imagens no HTML inicial
- `preconnect` + `dns-prefetch` para Unsplash
- `fetchPriority="high"` na primeira imagem (LCP)
- Eager-load só nos 3 primeiros cards (resto lazy)
- Imagens via `next/image` com redimensionamento automático
- Fonte Courier Prime auto-hospedada (via `next/font`)
- Service worker com cache-first para assets estáticos

---

## 📝 Disclaimer

Este é um site **experimental/pessoal** criado como portfólio. Não é uma entidade comercial. Todo o conteúdo é fictício ou destinado apenas a fins de demonstração de design e desenvolvimento.

---

## 👤 Autoria

Desenvolvido por [raigomes.dev](https://raigomes.dev/)
