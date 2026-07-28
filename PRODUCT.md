# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Maria (owner)** — microempreendedora individual. Gerencia inventário editando planilha Google Sheets. Hoje envia PDF semanal por WhatsApp — processo manual, pesado, sem busca. Quer catálogo que atualize sem programação.

**Cliente** — mulher 20-40, busca moda sustentável e preços acessíveis. Navega no celular em momentos de ócio. Descobre peças e contacta via WhatsApp.

## Product Purpose

Catálogo digital para Brechó da Maria (moda feminina semi-nova). Substitui PDF semanal por catálogo web pesquisável, sempre atualizado. Cliente navega itens disponíveis e contacta para comprar. Venda acontece via WhatsApp.

## Positioning

Catálogo que transforma a planilha Google Sheets da Maria numa vitrine "app-like" no navegador. Diferenciação zero-custo de infra (sem backend) + fluxo WhatsApp direto + atualização sem saber programar.

## Operating Context

Maria mantém planilha Google Sheets com colunas: nome, descrição, preço, categoria, tamanhos, fotos (URLs), disponível. Site lê via API, busca client-side <500ms. Sincronização a cada 5 min ou manual. Cliente acessa navegador Android básico. PWA como atalho na tela inicial.

## Capabilities and Constraints

- Home com hero "Novidades" (últimos 8 itens), grid de categorias, busca com filtros
- Listagem por categoria `/categoria/[slug]`
- Página de detalhe `/produto/[id]` com foto, preço, descrição, tamanhos
- Botão "Comprar via WhatsApp" por produto com mensagem pré-preenchida
- Busca client-side com filtros (categoria, tamanho, faixa de preço) em <500ms
- PWA: instalável, offline básico via service worker
- Google Sheets como CMS (leitura via API, sem escrita do site na planilha)
- Funcionar em celulares Android básico (Chrome versões antigas)
- Lighthouse Performance > 90 em 3G
- Sem carrinho, sem pagamento, sem login de cliente
- Projeto vitrine para portfólio: CMS via Sheets, UX Mobile, integração WhatsApp

## Brand Commitments

Brechó da Maria (nome fictício do case). Tema visual trocável por variáveis CSS. Nenhuma marca fixa além do nome do case.

## Evidence on Hand

Briefing.md com requisitos detalhados. Nenhum conteúdo real — dados sintéticos para build. Estrutura da planilha definida: nome, descrição, preço, categoria, tamanhos, fotos (URLs), disponível.

## Product Principles

1. **Simplicidade operacional** — owner gerencia tudo numa planilha. Zero atrito.
2. **Vitrine com personalidade** — curadoria visual que valoriza o item, não o grid genérico.
3. **Mobile-first** — maioria do tráfego vem de celular. PWA é requisito, não extra.
4. **Privacidade por design** — sem login, sem dados de cliente armazenados. Contato é direto.
5. **Offline resiliente** — catálogo navegável mesmo sem conexão.

## Accessibility & Inclusion

Contraste suficiente para leitura em celular sob luz solar. Suporte a leitores de tela para navegação de catálogo.
