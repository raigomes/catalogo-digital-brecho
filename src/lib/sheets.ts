/* Google Sheets integration — fetch dados da planilha pública */
/* Fallback silencioso para mock se env vars não configuradas */

import type { Produto, Categoria } from "./types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseSheetRow(row: string[], index: number): Produto | null {
  const [
    nome,
    descricao,
    preco,
    categoria,
    tamanhos,
    fotos,
    disponivel,
    createdAtRaw,
  ] = row;

  if (!nome || !preco) return null;

  const id = `${slugify(nome)}-${index}`;
  const precoNum = parseInt(preco, 10);
  if (isNaN(precoNum)) return null;

  const tamanhosArray = tamanhos
    ? tamanhos
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];

  const fotosArray = fotos
    ? fotos
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];

  const createdAt = createdAtRaw?.trim()
    ? new Date(createdAtRaw.trim()).toISOString()
    : new Date().toISOString();

  return {
    id,
    nome: nome.trim(),
    descricao: (descricao || "").trim(),
    preco: precoNum,
    categoria: (categoria || "").trim(),
    tamanhos: tamanhosArray,
    fotos: fotosArray,
    disponivel: disponivel?.trim().toUpperCase() === "VERDADEIRO",
    createdAt,
  };
}

function extractCategorias(produtos: Produto[]): Categoria[] {
  const seen = new Set<string>();
  const categorias: Categoria[] = [];

  for (const p of produtos) {
    if (!seen.has(p.categoria)) {
      seen.add(p.categoria);
      categorias.push({
        slug: slugify(p.categoria),
        nome: p.categoria,
      });
    }
  }

  return categorias;
}

export async function fetchFromSheet(): Promise<{
  produtos: Produto[];
  categorias: Categoria[];
} | null> {
  const sheetId = process.env.SHEETS_ID;
  const apiKey = process.env.SHEETS_API_KEY;

  if (!sheetId || !apiKey) {
    return null;
  }

  const range = "data-template!A:H";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  let response: Response;
  try {
    response = await fetch(url, {
      next: { revalidate: 300 },
    });
  } catch {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  let data: { values?: string[][] };
  try {
    data = await response.json();
  } catch {
    return null;
  }

  if (!data.values || data.values.length < 2) {
    return null;
  }

  const rows = data.values;
  // Primeira linha = header (nome, descricao, preco, categoria, tamanhos, fotos, disponivel, createdAt)
  // Ignoramos o header, processamos linhas de dados a partir do índice 1

  const produtos: Produto[] = [];
  for (let i = 1; i < rows.length; i++) {
    const produto = parseSheetRow(rows[i], i);
    if (produto) {
      produtos.push(produto);
    }
  }

  const categorias = extractCategorias(produtos);

  return { produtos, categorias };
}
