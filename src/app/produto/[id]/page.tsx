import { notFound } from "next/navigation"
import { Header } from "@/components/header"
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
      <Header variant="produto" titulo={produto.categoria} />

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
