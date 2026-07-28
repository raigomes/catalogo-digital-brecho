# Design: Catálogo Digital Brechó da Maria

> Aprovado em 28/07/2026. Direção visual: Zine Independente.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home: header + busca + filtros + novidades + categorias |
| `/categoria/[slug]` | Grid filtrado por categoria |
| `/produto/[id]` | Página detalhe do produto |

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

## Página Detalhe (`/produto/[id]`)

Layout vertical scroll:

- **Header** — seta "← Voltar" + nome categoria
- **Foto grande** — 3:4 ratio, largura total
- **Ficha** — nome (Courier 16px), preço (rosa 14px bold), tamanhos (tags fita crepe), descrição (Courier 12px)
- **Botão WhatsApp** — fundo rosa `#ff3b7f`, texto "QUERO ESSE!", link `wa.me` com mensagem pré-preenchida

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
| `Botao CTA` | `Y8xMg` | ✅ |

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
