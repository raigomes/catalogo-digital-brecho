"use client"

import Link from "next/link"
import type { Produto } from "@/lib/types"
import { formatPreco } from "@/lib/utils"
import { TagCategoria } from "./tag-categoria"

interface CardPolaroidProps {
  produto: Produto
}

export function CardPolaroid({ produto }: CardPolaroidProps) {
  return (
    <Link
      href={`/produto/${produto.id}`}
      className="block group"
    >
      <article
        className="relative bg-white border border-[#1a1a1a] p-2 transition-all duration-200 ease-in-out
                   shadow-[2px_2px_0px_rgba(0,0,0,0.15)]
                   -rotate-[1deg] lg:rotate-0
                   hover:rotate-0 hover:-translate-y-[--hover-lift] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)]
                   active:rotate-0 active:-translate-y-[--hover-lift] active:shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
      >
        {/* Tag fita crepe */}
        <div className="absolute -top-1 -left-1 z-10">
          <TagCategoria label="NOVIDADE" />
        </div>

        {/* Foto */}
        <div className="aspect-[3/4] bg-[#e0ddd5] border border-[#1a1a1a] overflow-hidden">
          <img
            src={produto.fotos[0] || "/placeholder.svg"}
            alt={produto.nome}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="mt-1.5 space-y-0.5">
          <h3 className="font-mono text-xs text-[#1a1a1a] leading-tight">
            {produto.nome}
          </h3>
          <p className="font-mono text-sm font-bold text-[#ff3b7f]">
            {formatPreco(produto.preco)}
          </p>
        </div>
      </article>
    </Link>
  )
}
