# Catálogo Digital Brechó da Maria

## O que é

Catálogo moda feminina seminova. Maria (MEI) gerencia planilha Google Sheets, site consome API. Cliente navega, filtra, vê detalhes, abre WhatsApp com mensagem pré-preenchida. Sem carrinho/pagamento/login.

## Stack

Next.js 14+ App Router + Tailwind + Shadcn/UI + PWA (service worker). Google Sheets como CMS (API pública ou JSON). Sem backend.

## Direção Visual

**Zine Independente** — fotocópia, colagem, tipografia crua, papel pardo. Paleta: fundo #f4f1ea, toner #1a1a1a, rosa #ff3b7f (CTA), fita crepe #f5d742 (tags). Títulos lettering manual recortado, corpo Courier (datilografia). Grid cards Polaroid colados, desalinhados, sombra papel. Transição como virar folha de zine.

## Rotas

- `/` — hero "Novidades" (últimos 8), grid categorias, busca + filtros
- `/categoria/[slug]` — grid filtrado
- `/produto/[id]` — detalhe: foto grande + ficha + botão WhatsApp

## Google Sheets

`nome`, `descricao`, `preco`, `categoria`, `tamanhos`, `fotos` (URLs), `disponivel`

## Estados UI

Loading (esqueleto grid Polaroid), vazio ("edição em breve"), erro ("nossa tiragem atrasou"), offline (PWA cache).

## Constraints

- Busca client-side <500ms, Lighthouse >90 em 3G
- Android básico (Chrome antigo)
- Tema trocável via CSS variables (case fictício "Brechó da Maria")
- Dados sintéticos no build, etiquetados como tal
- Nenhum dado de cliente armazenado. Contato via WhatsApp.

## Status

- [x] PRODUCT.md — contexto do produto
- [x] Brief superfície — direção Zine aprovada
- [ ] Next.js não inicializado (conflito .impeccable/ — criar app em diretório vazio, depois devolver arquivos)
- [ ] Template planilha Google Sheets + lib integração
- [ ] 3 rotas com direção Zine
- [ ] Busca + filtros client-side
- [ ] PWA + service worker

## Build

Mover `PRODUCT.md`, `briefing.md`, `.impeccable/` pra fora, `npx create-next-app`, devolver, `npx shadcn@latest init`, implementar UI. Brief completo: `.impeccable/surfaces/catalog/brief.md`. Antes de editar UI, carregar impeccable craft-floor.md.

## Diretrizes Globais

- **Design:** Use sempre o `.impeccable/surfaces/catalog/brief.md` como fonte da verdade visual.
- **Comunicação:** Responda usando o estilo `Caveman` (fragmentado, direto, sem polidez) para economizar tokens.
- **Fluxo:** Siga rigorosamente: Owner (Plano) → Reviewer (Valida) → Coder (Executa).

## Agentes (opencode.json)

3-agent harness:

- **owner** — orquestrador, delega ao coder, coordena review. `default_agent`.
- **coder** — implementa por spec. `task` + prompt detalhado.
- **reviewer** — só lê. Qualidade, a11y, perf, aderência Zine. Relatório P0/P1/P2.

Definições em `.opencode/agents/`. Usar `task` com `subagent_type: "general"` pra invocar subagentes.
