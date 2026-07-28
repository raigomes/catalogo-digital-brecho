import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Produto, PriceFilter } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPreco(preco: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(preco / 100)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function produtosPorCategoria(
  produtos: Produto[]
): Record<string, Produto[]> {
  return produtos.reduce(
    (acc, p) => {
      if (!acc[p.categoria]) acc[p.categoria] = []
      acc[p.categoria].push(p)
      return acc
    },
    {} as Record<string, Produto[]>
  )
}

/**
 * Filtro de preço por faixa.
 * @param preco - valor em centavos (ex: R$ 89,90 = 8990)
 * @param filtro - faixa selecionada
 */
export function enquadrarPreco(preco: number, filtro: PriceFilter): boolean {
  if (filtro === "TODOS") return true
  const p = preco / 100 // converte centavos pra reais
  switch (filtro) {
    case "ATE50":
      return p <= 50
    case "50A100":
      return p > 50 && p <= 100
    case "100A200":
      return p > 100 && p <= 200
    case "MAIS200":
      return p > 200
  }
}
