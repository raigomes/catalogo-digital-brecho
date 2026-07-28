# Brief: Catálogo Digital — Brechó da Maria

<!-- impeccable:surface-brief schema 1 -->

## Job e Audiência

**Maria (owner):** microempreendedora, 1 pessoa. Hoje tira fotos, monta PDF semanal e envia por WhatsApp. PDF é pesado, sem busca, sem navegação. Ela passa horas respondendo "tem esse número?" e perde vendas. Precisa de catálogo que atualize sem programação.

**Visitante:** mulher 20-40, busca moda sustentável e preços acessíveis. Chega no celular em momento de ócio. Navega, descobre peças, se apaixona. Clique no WhatsApp com mensagem pré-preenchida.

**Modo do visitante:** Experience — artefatos (roupas) lideram, interface recua.

## Outcome e Prova

**Tarefa primária:** visitante acha peça que interessa, vê detalhes, abre WhatsApp com mensagem citando a peça.

**Sucesso:** visitante sai com peça na cabeça e WhatsApp aberto. Maria vende sem responder pergunta repetitiva.

**Evidência:** briefing.md com requisitos completos. Dados sintéticos no build, etiquetados.

## Direção Selecionada

**Zine Independente.** Catálogo como zine: fotocópia, colagem, tipografia crua, papel pardo, grampo, dobras.

### Tese

Zine não tenta ser loja. Mostra, coleciona, celebra cada peça como achado único. Imperfeição comunica honestidade — peça única, edição única.

### Mundo

- **Paleta:** papel pardo #f4f1ea, toner preto #1a1a1a, marcador rosa #ff3b7f (CTA), fita crepe #f5d742 (tags)
- **Material:** textura fotocópia, colagem, manchas toner, dobras. Fotos Polaroid
- **Tipografia:** títulos letra recortada manual, corpo Courier (datilografia)
- **Composição:** grid 2-3 col. Cards colados, desalinhados, sombra de papel.

### Primeiro viewport

Hero "Novidades" — 8 cards Polaroid dos últimos itens, como capa de zine. Abaixo, grid de categorias. Header com nome em letras recortadas.

### Caminho e interação

Home (novidades + categorias + busca) → clica categoria → `/categoria/[slug]` (grid filtrado) → clica card → `/produto/[id]` (página dupla de zine: foto + ficha técnica). Botão "Quero esse!" → WhatsApp pré-preenchido.

### Interação assinatura

Card colado com fita crepe. Hover levanta borda do papel. Transição de página simula virar folha de zine (CSS view transitions).

### Risco honesto

Estética raw exige fotos excelentes pra não parecer "quebrado". Contraste papel + luz solar — precisa validar. Identidade visual forte pode não agradar todos brechós (mas é trocável por tema CSS).

## Escopo e Limites

**Fidelidade:** produção-ready. Todas 3 rotas: `/`, `/categoria/[slug]`, `/produto/[id]`.

**Abrangência:** home (hero novidades + categorias + busca), listagem filtrada, detalhe. Sem carrinho, pagamento, login.

**O que não mexer:** tema trocável por CSS variables. Nome "Brechó da Maria" como case.

## Estados e Variações

**Dados:** planilha com colunas: nome, descrição, preço, categoria, tamanhos, fotos (URLs), disponível. 10-50+ itens.

**Estados:** loading (esqueleto grid Polaroid fantasma), vazio ("edição em breve — volto já!"), erro ("nossa tiragem atrasou — tenta de novo"), offline (PWA cache).

## Interação e Layout

**Hierarquia:** hero novidades → categorias → busca/filtros → grid → detalhe.

**Rotas:**
- `/` — hero (últimos 8), grid categorias, busca + filtros (categoria/tamanho/preço)
- `/categoria/[slug]` — grid filtrado por categoria
- `/produto/[id]` — detalhe: foto grande + ficha + WhatsApp

**Responsivo:** celular 2 col, tablet 3 col, desktop 4 col + filtros à esquerda.

**Affordances:** card elevanta borda no hover. WhatsApp rosa fluorescente destaque. Filtros como tags de papel.

**Performance:** busca client-side <500ms. Lighthouse >90 em 3G.

## Restrições e Decisões em Aberto

**Stack:** Next.js 14+ App Router + Tailwind + Shadcn/UI + PWA (service worker).

**Google Sheets:** leitura via API pública (ou planilha publicada como JSON). Sem backend próprio. Sync a cada 5 min ou manual.

**Android:** Chrome versões antigas. PWA como atalho tela inicial.

**Acessibilidade:** WCAG AA contraste. Foco visível. Alt text fotos.

**Decisões:** nome brechó ("Brechó da Maria" fixo no case). Fotos reais não existem — sintéticas. Template de planilha a criar.
