export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number; // em centavos (R$ 89,90 = 8990)
  categoria: string;
  tamanhos: string[];
  fotos: string[];
  disponivel: boolean;
  createdAt: string; // ISO date
}

export interface Categoria {
  slug: string;
  nome: string;
}

// Tipos para filtros
export type SizeFilter = "TODOS" | "P" | "M" | "G" | "GG"
export type PriceFilter = "TODOS" | "ATE50" | "50A100" | "100A200" | "MAIS200"

export interface FaixaPreco {
  label: string
  value: PriceFilter
}
