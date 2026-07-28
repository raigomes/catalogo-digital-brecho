import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchCategorias, fetchProdutosPorCategoria } from "@/lib/api"
import { CardPolaroid } from "@/components/card-polaroid"
import { TagCategoria } from "@/components/tag-categoria"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categorias = await fetchCategorias()
  return categorias.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const categorias = await fetchCategorias()
  const cat = categorias.find((c) => c.slug === slug)
  if (!cat) return { title: "Categoria — BreChó da Maria" }
  return {
    title: `${cat.nome} — BreChó da Maria`,
    description: `Catálogo de ${cat.nome.toLowerCase()} — moda feminina seminova.`,
  }
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params
  const categorias = await fetchCategorias()
  const cat = categorias.find((c) => c.slug === slug)
  if (!cat) notFound()

  const produtos = await fetchProdutosPorCategoria(cat.nome)

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f1ea]">
      <header className="bg-[#1a1a1a] px-4 py-4 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="text-[#f4f1ea] text-xs uppercase tracking-widest hover:text-[#ff3b7f] transition-colors"
        >
          ← Voltar
        </Link>
        <Image src="/sacola.png" alt="" width={24} height={24} className="invert" />
        <h1 className="text-[#f4f1ea] text-lg uppercase tracking-[0.2em] font-bold">
          {cat.nome}
        </h1>
      </header>

      {/* Navegação entre categorias (mobile) */}
      <nav className="lg:hidden overflow-x-auto px-4 py-3 border-b border-[#1a1a1a]/10">
        <div className="flex gap-2 min-w-max">
          <Link
            href="/"
            className={`font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border border-[#1a1a1a] transition-colors ${
              false
                ? "bg-[#1a1a1a] text-[#f4f1ea]"
                : "bg-[#f5d742] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f4f1ea]"
            }`}
          >
            TODOS
          </Link>
          {categorias.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className={`font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border border-[#1a1a1a] transition-colors whitespace-nowrap ${
                c.slug === slug
                  ? "bg-[#1a1a1a] text-[#f4f1ea]"
                  : "bg-[#f5d742] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f4f1ea]"
              }`}
            >
              {c.nome}
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex flex-1">
        <aside className="hidden lg:block w-[200px] shrink-0 border-r border-[#1a1a1a]/20 p-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#1a1a1a]/40 mb-3">
            CATEGORIAS
          </p>
          <div className="flex flex-col gap-1.5">
            {categorias.map((c) => (
              <TagCategoria
                key={c.slug}
                label={c.nome}
                active={c.slug === slug}
                href={`/categoria/${c.slug}`}
                fullWidth
              />
            ))}
          </div>
        </aside>

        <main className="flex-1 p-4">
          {produtos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-[#1a1a1a]/60">
                nada nessa edição — volto já!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {produtos.map((produto) => (
                <CardPolaroid key={produto.id} produto={produto} showTag={false} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
