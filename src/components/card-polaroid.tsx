"use client"

import Link from "next/link"
import Image from "next/image"
import type { Produto } from "@/lib/types"
import { formatPreco } from "@/lib/utils"
import { TagCategoria } from "./tag-categoria"

interface CardPolaroidProps {
  produto: Produto
  showTag?: boolean
  priority?: boolean
  eager?: boolean
}

export function CardPolaroid({ produto, showTag = true, priority, eager }: CardPolaroidProps) {
  return (
    <Link
      href={`/produto/${produto.id}`}
      className="block group"
    >
      <article
        className="relative bg-white border border-[#1a1a1a] p-2 transition-all duration-200 ease-in-out
                   shadow-[2px_2px_0px_rgba(0,0,0,0.15)]
                   hover:-translate-y-[--hover-lift] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)]
                   active:-translate-y-[--hover-lift] active:shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
      >
        {/* Tag fita crepe */}
        {showTag && (
          <div className="absolute -top-1 -left-1 z-10">
            <TagCategoria label="NOVIDADE" />
          </div>
        )}

        {/* Foto */}
        <div className="relative aspect-[3/4] bg-[#e0ddd5] border border-[#1a1a1a] overflow-hidden">
          <Image
            src={produto.fotos[0] || "/placeholder.svg"}
            alt={produto.nome}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
            loading={eager && !priority ? "eager" : undefined}
          />
        </div>

        {/* Info */}
        <div className="mt-1.5 space-y-0.5">
          <h3 className="font-mono text-xs text-[#1a1a1a] leading-tight">
            {produto.nome}
          </h3>
          <p className="font-mono text-sm font-bold text-[#e62e6e]">
            {formatPreco(produto.preco)}
          </p>
        </div>
      </article>
    </Link>
  )
}
