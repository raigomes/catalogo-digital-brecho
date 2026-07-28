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
