import Image from "next/image"
import type { Produto } from "@/lib/types"

interface Props {
  produto: Produto
}

export function FotoProduto({ produto }: Props) {
  return (
    <div className="relative w-full h-full bg-[#e0ddd5]">
      <Image
        src={produto.fotos[0]}
        alt={produto.nome}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {!produto.disponivel && (
        <div className="absolute inset-0 bg-[#1a1a1a]/60 flex items-center justify-center">
          <span className="text-[#f4f1ea] text-sm uppercase tracking-widest">
            Vendido
          </span>
        </div>
      )}
    </div>
  )
}
