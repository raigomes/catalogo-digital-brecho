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
