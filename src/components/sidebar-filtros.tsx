"use client"

import type { Categoria, SizeFilter, PriceFilter } from "@/lib/types"
import { TagCategoria } from "@/components/tag-categoria"

// ============================================
// CONSTANTES DE FILTRO
// ============================================
const TAMANHOS: SizeFilter[] = ["TODOS", "P", "M", "G", "GG"]
const FAIXAS_PRECO: { label: string; value: PriceFilter }[] = [
  { label: "TODOS", value: "TODOS" },
  { label: "ATÉ R$50", value: "ATE50" },
  { label: "R$50-R$100", value: "50A100" },
  { label: "R$100-R$200", value: "100A200" },
  { label: "R$200+", value: "MAIS200" },
]

// ============================================
// PROPS
// ============================================
interface SidebarFiltrosProps {
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
// SIDEBAR DESKTOP
// Exibida apenas em telas >= 1024px (hidden lg:block)
// Largura fixa de 200px, filtros empilhados verticalmente
// Conforme design do catalog.pen (frame "Home Desktop")
// ============================================
export function SidebarFiltros({
  busca,
  setBusca,
  catAtiva,
  setCatAtiva,
  tamAtivo,
  setTamAtivo,
  precoAtivo,
  setPrecoAtivo,
  categorias,
}: SidebarFiltrosProps) {
  return (
    <aside className="hidden lg:block w-[200px] shrink-0 pt-4 pb-4 space-y-4">
      {/* Input de busca textual */}
      <input
        type="text"
        placeholder="Buscar peças..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full font-mono text-sm bg-white border border-[#1a1a1a] px-3 h-9
                   placeholder:text-[#1a1a1a]/40 focus:outline-none focus:ring-1 focus:ring-[#1a1a1a]"
      />

      {/* Filtro por categoria (tags fullWidth empilhadas) */}
      <div>
        <p className="font-mono text-[11px] text-[#1a1a1a] mb-1.5 uppercase">CATEGORIA</p>
        <div className="flex flex-col gap-1.5">
          <TagCategoria
            label="TODOS"
            active={catAtiva === "TODOS"}
            onClick={() => setCatAtiva("TODOS")}
            fullWidth
          />
          {categorias.map((cat) => (
            <TagCategoria
              key={cat.slug}
              label={cat.nome}
              active={catAtiva === cat.nome}
              onClick={() => setCatAtiva(cat.nome)}
              fullWidth
            />
          ))}
        </div>
      </div>

      {/* Filtro por tamanho */}
      <div>
        <p className="font-mono text-[11px] text-[#1a1a1a] mb-1.5 uppercase">TAMANHO</p>
        <div className="flex flex-col gap-1.5">
          {TAMANHOS.map((tam) => (
            <TagCategoria
              key={tam}
              label={tam}
              active={tamAtivo === tam}
              onClick={() => setTamAtivo(tam)}
              fullWidth
            />
          ))}
        </div>
      </div>

      {/* Filtro por faixa de preço */}
      <div>
        <p className="font-mono text-[11px] text-[#1a1a1a] mb-1.5 uppercase">PREÇO</p>
        <div className="flex flex-col gap-1.5">
          {FAIXAS_PRECO.map((fp) => (
            <TagCategoria
              key={fp.value}
              label={fp.label}
              active={precoAtivo === fp.value}
              onClick={() => setPrecoAtivo(fp.value)}
              fullWidth
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
