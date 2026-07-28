import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Produto } from "./types"

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
