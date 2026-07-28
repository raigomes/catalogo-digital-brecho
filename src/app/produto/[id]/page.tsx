import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchProdutoPorId } from "@/lib/api"
import { FotoProduto } from "@/components/foto-produto"
import { InfoProduto } from "@/components/info-produto"

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
      {/* Header: mobile ← Voltar + categoria, desktop logo */}
      <header className="bg-[#1a1a1a] px-4 py-4">
        <div className="lg:hidden flex items-center gap-4">
          <Link
            href="/"
            className="text-[#f4f1ea] text-xs uppercase tracking-widest hover:text-[#ff3b7f] transition-colors"
          >
            ← Voltar
          </Link>
          <span className="text-[#f4f1ea]/60 text-xs uppercase tracking-wider">
            {produto.categoria}
          </span>
        </div>
        <div className="hidden lg:flex items-center justify-center gap-3">
          <Image src="/sacola.png" alt="" width={28} height={28} className="invert" />
          <h1 className="font-mono text-xl text-[#f4f1ea] uppercase tracking-[0.15em]">
            BREChÓ DA MARIA
          </h1>
        </div>
      </header>

      {/* Layout único — CSS responsivo cuida do reflow */}
      <div className="flex-1 lg:flex lg:flex-row lg:gap-6 lg:px-6">
        {/* Foto: mobile aspect-ratio fixo, desktop flex-1 */}
        <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:flex-1 lg:border lg:border-[#1a1a1a]">
          <FotoProduto produto={produto} />
        </div>

        {/* Info: mobile p-4, desktop py-4 + gap vertical */}
        <div className="flex-1 p-4 lg:p-0 lg:py-4 lg:flex lg:flex-col lg:space-y-4">
          <InfoProduto produto={produto} />
        </div>
      </div>
    </div>
  )
}
