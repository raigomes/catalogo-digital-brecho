"use client"

import { useState } from "react"
import Link from "next/link"
import { formatPreco } from "@/lib/utils"
import { BotaoWhatsApp } from "@/components/botao-whatsapp"
import type { Produto } from "@/lib/types"

interface Props {
  produto: Produto
}

export function InfoProduto({ produto }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const mensagemWhats = selectedSize
    ? `Olá! Tenho interesse em ${produto.nome} (ref #${produto.id}) — tamanho ${selectedSize}`
    : `Olá! Tenho interesse em ${produto.nome} (ref #${produto.id})`

  return (
    <>
      {/* ← Voltar — só desktop (mobile fica no header) */}
      <Link
        href="/"
        className="hidden lg:inline font-mono text-sm text-[#1a1a1a] uppercase tracking-widest hover:text-[#ff3b7f] transition-colors"
      >
        ← Voltar
      </Link>

      <div>
        <h1 className="font-mono text-base lg:text-2xl uppercase tracking-wider text-[#1a1a1a] font-bold">
          {produto.nome}
        </h1>
        <p className="font-mono text-sm lg:text-lg text-[#ff3b7f] font-bold mt-1 lg:mt-0">
          {formatPreco(produto.preco)}
        </p>
      </div>

      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/40 mb-2">
          Tamanhos
        </h2>
        <div className="flex flex-wrap gap-2">
          {produto.tamanhos.map((t) => {
            const isSelected = selectedSize === t
            return (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedSize(isSelected ? null : t)}
                className={`font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border border-[#1a1a1a] cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? "bg-[#1a1a1a] text-[#f4f1ea]"
                    : "bg-[#f5d742] text-[#1a1a1a]"
                }`}
              >
                {t}
                {isSelected && " ✓"}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/40 mb-1">
          Descrição
        </h2>
        <p className="font-mono text-xs leading-relaxed text-[#1a1a1a]/80">
          {produto.descricao}
        </p>
      </div>

      <div className="pt-4">
        <BotaoWhatsApp mensagem={mensagemWhats} />
      </div>
    </>
  )
}
