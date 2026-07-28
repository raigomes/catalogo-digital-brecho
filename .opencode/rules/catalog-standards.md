# Regras de Catálogo Digital

- Todo produto deve ter `SKU` único e obrigatório.
- Imagens devem ser salvas em formato WebP com lazy loading.
- Preços nunca devem ser armazenados como float (usar Decimal/Integer).
- A paginação deve ser feita via cursor (não offset) para performance.
