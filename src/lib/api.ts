/* Camada de dados — prioriza Google Sheets, fallback mock sintético */
/* DADOS SINTÉTICOS no fallback — etiquetados como tal */

import type { Produto, Categoria } from "./types";
import { produtos as produtosMock, categorias as categoriasMock } from "./data";
import { fetchFromSheet } from "./sheets";

function delay(ms: number = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProdutos(): Promise<Produto[]> {
  const sheetData = await fetchFromSheet();
  if (sheetData) return sheetData.produtos.filter((p) => p.disponivel);

  await delay(150);
  return [...produtosMock].filter((p) => p.disponivel);
}

export async function fetchProdutoPorId(id: string): Promise<Produto | null> {
  const sheetData = await fetchFromSheet();
  if (sheetData) {
    return sheetData.produtos.find((p) => p.id === id && p.disponivel) ?? null;
  }

  await delay(100);
  const produto = produtosMock.find((p) => p.id === id && p.disponivel);
  return produto ?? null;
}

export async function fetchCategorias(): Promise<Categoria[]> {
  const sheetData = await fetchFromSheet();
  if (sheetData) return sheetData.categorias;

  await delay(50);
  return [...categoriasMock];
}
