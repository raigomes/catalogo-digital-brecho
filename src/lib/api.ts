/* DADOS SINTÉTICOS — camada de dados mock */
/* Trocar implementação para fetch() quando planilha Google Sheets estiver pronta */

import type { Produto, Categoria } from "./types"
import { produtos as produtosMock, categorias as categoriasMock } from "./data"

function delay(ms: number = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchProdutos(): Promise<Produto[]> {
  // NOTA: quando migrar para Google Sheets real, aplicar:
  //   tamanhos: row.tamanhos.split(", ").map((s: string) => s.trim()),
  //   fotos: row.fotos.split(", ").map((s: string) => s.trim()),
  await delay(150)
  return [...produtosMock].filter((p) => p.disponivel)
}

export async function fetchProdutoPorId(id: string): Promise<Produto | null> {
  await delay(100)
  const produto = produtosMock.find((p) => p.id === id && p.disponivel)
  return produto ?? null
}

export async function fetchCategorias(): Promise<Categoria[]> {
  await delay(50)
  return [...categoriasMock]
}
