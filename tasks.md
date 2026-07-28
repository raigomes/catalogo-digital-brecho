# Tasks — Home Page

> **Fonte:** `.impeccable/surfaces/catalog/brief.md` (direção Zine)
> **Design Tokens:** `.impeccable/surfaces/catalog/catalogo.pen`
> **Status:** Next.js não iniciado

## Setup

- [ ] **TS-01** Mover `PRODUCT.md`, `briefing.md`, `.impeccable/`, `.opencode/`, `opencode.json`, `AGENTS.md`, `tasks.md` pra fora do diretório
- [ ] **TS-02** `npx create-next-app@latest catalogo-digital-brecho --typescript --tailwind --eslint --app --src-dir --no-import-alias` no diretório vazio
- [ ] **TS-03** Devolver arquivos movidos + `npx shadcn@latest init -d`
- [ ] **TS-04** Adicionar `npx shadcn@latest add button input sheet` (componentes base)

## Design Tokens (Tailwind Config)

- [ ] **DT-01** Configurar `tailwind.config.ts` com cores Zine:
  - `bg`/`background`: `#f4f1ea` (papel pardo)
  - `fg`/`foreground`: `#1a1a1a` (toner)
  - `primary`: `#ff3b7f` (rosa CTA, usar como `primary` shadcn)
  - `accent`: `#f5d742` (fita crepe, usar como `accent` shadcn)
- [ ] **DT-02** Configurar fontes: `Courier Prime` como `font-mono` padrão (importar do Google Fonts), mesma fonte pra body e headings
- [ ] **DT-03** Configurar CSS custom properties no `:root`:
  - `--shadow-paper`: `2px 2px 0px rgba(0,0,0,0.15)`
  - `--border-toner`: `1px solid #1a1a1a`
  - `--hover-lift`: `4px` (distância que card levanta no hover)
- [ ] **DT-04** Global CSS: resetar `border-radius: 0` pra tudo (Zine não usa arredondamento), background `#f4f1ea`

## Dados Sintéticos

- [ ] **DS-01** Criar `src/lib/data.ts` com array de produtos mock (10-15 itens):
  ```
  { id, nome, descricao, preco, categoria, tamanhos: string[], fotos: string[], disponivel: boolean }
  ```
  - Fotos: placeholder via `https://placehold.co/400x500?text=Produto+X`
  - Categorias: Vestidos, Blusas, Saias, Calças, Jaquetas, Acessórios
  - Etiquetar como `/* DADOS SINTÉTICOS */`
- [ ] **DS-02** Criar `src/lib/types.ts` com tipos `Produto` e `Categoria`
- [ ] **DS-03** Criar `src/lib/utils.ts` com helpers: `formatPreco`, `slugify`, `produtosPorCategoria`

## Componentes Base (Zine Style)

- [ ] **CP-01** `CardPolaroid` (`src/components/card-polaroid.tsx`):
  - Fundo branco, borda toner 1px, rotation `-1deg` (CSS `transform: rotate()`)
  - Sombra papel (`var(--shadow-paper)`)
  - Foto placeholder (aspect-ratio 3/4)
  - Nome produto (Courier, 12px)
  - Preço (rosa primary, 14px, bold)
  - Tag "fita crepe" no canto superior esquerdo (amarelo `#f5d742`, texto toner)
  - State: hover levanta borda (transition 200ms ease, `rotate(0deg)`, `translateY(-4px)`, shadow intensifica)
- [ ] **CP-02** `TagCategoria` (`src/components/tag-categoria.tsx`):
  - Fundo `#f5d742`, borda toner 1px, Courier 11px
  - Padding 4px 10px
- [ ] **CP-03** `BotaoWhatsApp` (`src/components/botao-whatsapp.tsx`):
  - Fundo `#ff3b7f`, texto branco "QUERO ESSE!", Courier bold
  - `border-radius: 0`, borda toner
  - Link `https://wa.me/...?text=...` com mensagem pré-preenchida

## Interações Assinatura

- [ ] **IA-01** View transitions entre rotas:
  - Simular virar folha de zine ao navegar entre Home → Categoria → Produto
  - Usar CSS `@view-transition` ou `document.startViewTransition()` com fallback
  - Efeito: animação de "virada de página" (slide horizontal + fade, como virar folha)
  - Desktop: transição mais sutil (só fade)
- [ ] **IA-02** Card hover "levanta borda":
  - `transition: all 200ms ease`
  - Hover: `rotate(0deg)`, `translateY(calc(var(--hover-lift) * -1))`, sombra expande 2x
  - Tap em mobile: mesmo efeito via `:active`

## Home Page (`/`)

- [ ] **HP-01** Layout página em `src/app/page.tsx`:
  - Scroll vertical, fundo `#f4f1ea`
  - Seções empilhadas: Header → Busca/Filtros → Novidades → Categorias
- [ ] **HP-02** Header "BREChÓ DA MARIA":
  - Fundo toner `#1a1a1a`, texto `#f4f1ea`
  - Courier, uppercase, letter-spacing largo
  - Padding 16px
- [ ] **HP-03** Seção Busca + Filtros:
  - Input text com placeholder "Buscar peças..."
  - Abaixo, row de `TagCategoria` (TODOS, VESTIDOS, BLUSAS, etc.)
  - State: `selectedCategoria` controla filtro ativo
- [ ] **HP-04** Seção "NOVIDADES":
  - Título Courier 16px bold
  - Grid 2 col (mobile), 3 col (tablet), 4 col (desktop)
  - 6-8 `CardPolaroid` dos últimos itens
  - Estado loading: skeleton cards (retângulos cinza `#e0ddd5` com animação pulse)
  - Estado vazio: "edição em breve — volto já!" em Courier
- [ ] **HP-05** Seção "CATEGORIAS":
  - Título Courier 16px bold
  - Grid 3 col de `TagCategoria`
  - Cada tag linka pra `/categoria/[slug]`
- [ ] **HP-06** Busca client-side:
  - Filtrar por nome, categoria, tamanho
  - Debounce 300ms
  - <500ms conforme spec

## Performance & Responsivo

- [ ] **PR-01** Mobile-first: 2 colunas, breakpoints tablet (768px) 3 col, desktop (1024px) 4 col + filtros à esquerda
- [ ] **PR-02** Imagens lazy loading
- [ ] **PR-03** Lighthouse > 90: code-splitting, preload fontes, minificação

## Estados de UI

- [ ] **EU-01** Loading: skeleton grid com cards fantasma (retângulos cinza + pulse animation)
- [ ] **EU-02** Vazio: mensagem "edição em breve — volto já!" com ilustração simples
- [ ] **EU-03** Erro: "nossa tiragem atrasou — tenta de novo" + botão retry
- [ ] **EU-04** Offline: detectado via `navigator.onLine`, mensagem "modo zine — dados offline"

## Verificação

- [ ] **VF-01** `npm run dev` sem erros
- [ ] **VF-02** Home renderiza: Header, Busca, Novidades (6 cards), Categorias (6 tags)
- [ ] **VF-03** Busca filtra em <500ms
- [ ] **VF-04** Responsivo: 2/3/4 colunas
- [ ] **VF-05** Todos estados (loading/vazio/erro) funcionais
