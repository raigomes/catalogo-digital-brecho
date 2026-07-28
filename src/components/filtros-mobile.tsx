"use client"

import type { Categoria, SizeFilter, PriceFilter, FaixaPreco } from "@/lib/types"
import { TagCategoria } from "@/components/tag-categoria"

// ============================================
// CONSTANTES DE FILTRO
// ============================================
const TAMANHOS: SizeFilter[] = ["TODOS", "P", "M", "G", "GG"]
const FAIXAS_PRECO: FaixaPreco[] = [
  { label: "TODOS", value: "TODOS" },
  { label: "ATÉ R$50", value: "ATE50" },
  { label: "R$50-R$100", value: "50A100" },
  { label: "R$100-R$200", value: "100A200" },
  { label: "R$200+", value: "MAIS200" },
]

// ============================================
// PROPS
// ============================================
interface FiltrosMobileProps {
  busca: string
  setBusca: (v: string) => void
  catAtiva: string
  setCatAtiva: (v: string) => void
  tamAtivo: SizeFilter
  setTamAtivo: (v: SizeFilter) => void
  precoAtivo: PriceFilter
  setPrecoAtivo: (v: PriceFilter) => void
  categorias: Categoria[]
}

// ============================================
// FILTROS MOBILE
// Exibido apenas em telas < 1024px (lg:hidden)
// Layout horizontal com tags organizadas em fila
// ============================================
export function FiltrosMobile({
  busca,
  setBusca,
  catAtiva,
  setCatAtiva,
  tamAtivo,
  setTamAtivo,
  precoAtivo,
  setPrecoAtivo,
  categorias,
}: FiltrosMobileProps) {
  return (
    <section className="px-4 pt-3 pb-2 space-y-3 lg:hidden">
      {/* Input de busca textual */}
      <input
        type="text"
        placeholder="Buscar peças..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full font-mono text-sm bg-white border border-[#1a1a1a] px-3 py-2
                   placeholder:text-[#1a1a1a]/40 focus:outline-none focus:ring-1 focus:ring-[#1a1a1a]"
      />

      {/* Filtro por categoria */}
      <div>
        <p className="font-mono text-[11px] text-[#1a1a1a] mb-1.5">CATEGORIA</p>
        <div className="flex flex-wrap gap-1.5">
          <TagCategoria
            label="TODOS"
            active={catAtiva === "TODOS"}
            onClick={() => setCatAtiva("TODOS")}
          />
          {categorias.map((cat) => (
            <TagCategoria
              key={cat.slug}
              label={cat.nome}
              active={catAtiva === cat.nome}
              onClick={() => setCatAtiva(cat.nome)}
            />
          ))}
        </div>
      </div>

      {/* Filtro por tamanho */}
      <div>
        <p className="font-mono text-[11px] text-[#1a1a1a] mb-1.5">TAMANHO</p>
        <div className="flex flex-wrap gap-1.5">
          {TAMANHOS.map((tam) => (
            <TagCategoria
              key={tam}
              label={tam}
              active={tamAtivo === tam}
              onClick={() => setTamAtivo(tam)}
            />
          ))}
        </div>
      </div>

      {/* Filtro por faixa de preço */}
      <div>
        <p className="font-mono text-[11px] text-[#1a1a1a] mb-1.5">PREÇO</p>
        <div className="flex flex-wrap gap-1.5">
          {FAIXAS_PRECO.map((fp) => (
            <TagCategoria
              key={fp.value}
              label={fp.label}
              active={precoAtivo === fp.value}
              onClick={() => setPrecoAtivo(fp.value)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
