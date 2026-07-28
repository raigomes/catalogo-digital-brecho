import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { fetchProdutoPorId } from "@/lib/api"
import { formatPreco } from "@/lib/utils"
import { BotaoWhatsApp } from "@/components/botao-whatsapp"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const produto = await fetchProdutoPorId(id)
  if (!produto) return { title: "Produto — BreChó da Maria" }
  return {
    title: `${produto.nome} — BreChó da Maria`,
    description: produto.descricao,
  }
}

export default async function ProdutoPage({ params }: Props) {
  const { id } = await params
  const produto = await fetchProdutoPorId(id)
  if (!produto) notFound()

  return (
    <div className="min-h-screen bg-[#f4f1ea] flex flex-col">
      <header className="bg-[#1a1a1a] px-4 py-4 flex items-center gap-4">
        <Link
          href="/"
          className="text-[#f4f1ea] text-xs uppercase tracking-widest hover:text-[#ff3b7f] transition-colors"
        >
          ← Voltar
        </Link>
        <span className="text-[#f4f1ea]/60 text-xs uppercase tracking-wider">
          {produto.categoria}
        </span>
      </header>

      <div className="relative w-full aspect-[3/4] bg-[#e0ddd5]">
        <Image
          src={produto.fotos[0]}
          alt={produto.nome}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        {!produto.disponivel && (
          <div className="absolute inset-0 bg-[#1a1a1a]/60 flex items-center justify-center">
            <span className="text-[#f4f1ea] text-sm uppercase tracking-widest">
              Vendido
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div>
          <h1 className="font-mono text-base uppercase tracking-wider text-[#1a1a1a] font-bold">
            {produto.nome}
          </h1>
          <p className="font-mono text-sm text-[#ff3b7f] font-bold mt-1">
            {formatPreco(produto.preco)}
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/40 mb-2">
            Tamanhos
          </h2>
          <div className="flex flex-wrap gap-2">
            {produto.tamanhos.map((t) => (
              <span
                key={t}
                className="bg-[#f5d742] text-[#1a1a1a] font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border border-[#1a1a1a]"
              >
                {t}
              </span>
            ))}
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
          <BotaoWhatsApp
            mensagem={`Olá! Tenho interesse em ${produto.nome} (ref #${produto.id})`}
          />
        </div>
      </div>
    </div>
  )
}
