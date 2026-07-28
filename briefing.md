# Briefing: Catalogo Digital - Brecho da Maria

> Servico: Interface de Catalogo | Categoria: Core | Preco referencia: R$ 2.500

## Cliente (Fictional)
- **Nome:** Brecho da Maria
- **Ramo:** Moda feminina seminova, vendas pelo Instagram + WhatsApp
- **Porte:** Microempreendedora individual (1 pessoa)
- **Publico-alvo:** Mulheres 20-40 anos, busca por moda sustentavel e precos acessiveis

## O Problema
A Maria tira fotos das pecas, monta um PDF semanal de catalogo e envia por WhatsApp. O PDF e pesado, dificil de navegar, nao tem busca e ela passa horas respondendo "tem esse numero?" ou "qual o preco?". Ela perde vendas porque as clientes desistem de procurar.

## A Solucao Desejada
- Catalogo digital com visual "app-like" no navegador
- Busca por categoria, tamanho e preco
- Cada produto com foto, preco, tamanhos disponiveis e link direto para WhatsApp
- A Maria precisa conseguir atualizar o catalogo sem saber programar — idealmente via planilha do Google Sheets

## Requisitos Tecnicos
- Next.js + Tailwind + Shadcn/UI
- Integracao com Google Sheets como CMS (Maria edita a planilha, o site atualiza)
- Busca client-side com filtros (categoria, tamanho, faixa de preco)
- Funcionar perfeitamente em celulares Android basico (Chrome versoes antigas)
- Botao "Comprar via WhatsApp" por produto com mensagem pre-preenchida
- Layout PWA-ready (pode virar atalho na tela inicial)

## Diferenciais para o Portfolio
- **CMS via Google Sheets:** Sem backend proprio, sem custo de infra
- **UX Mobile:** Interface fluida em celulares de entrada (desafio real de performance)
- **Integracao WhatsApp:** Fluxo completo do clique a mensagem pre-preenchida

## Criterios de Sucesso
- Busca retornar resultados em <500ms (client-side)
- Catalogo funcional offlinne basico (via service worker opcional)
- Google Sheets sincronizado a cada 5 min ou manualmente
- Lighthouse Performance > 90 em 3G

---

## Estrutura de Paginas
```
/ (home)
  - Hero com "Novidades" (ultimos 8 itens adicionados)
  - Categorias em grid
  - Busca com filtros (categoria, tamanho, preco)
/categoria/[slug] (listagem filtrada)
/produto/[id] (pagina individual)
  - Foto, preco, descricao, tamanhos
  - Botao "Comprar via WhatsApp"

CMS = Google Sheets com colunas:
nome, descricao, preco, categoria, tamanhos, fotos (URLs), disponivel
```
