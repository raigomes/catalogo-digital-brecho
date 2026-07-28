"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { produtos, categorias } from "@/lib/data"
import type { Produto } from "@/lib/types"
import { CardPolaroid } from "@/components/card-polaroid"
import { TagCategoria } from "@/components/tag-categoria"
import { SkeletonCard } from "@/components/skeleton-card"
import { useDebounce } from "@/lib/hooks"

type SizeFilter = "TODOS" | "P" | "M" | "G" | "GG"
type PriceFilter = "TODOS" | "ATE50" | "50A100" | "100A200" | "MAIS200"

const TAMANHOS: SizeFilter[] = ["TODOS", "P", "M", "G", "GG"]
const FAIXAS_PRECO: { label: string; value: PriceFilter }[] = [
  { label: "TODOS", value: "TODOS" },
  { label: "ATÉ R$50", value: "ATE50" },
  { label: "R$50-R$100", value: "50A100" },
  { label: "R$100-R$200", value: "100A200" },
  { label: "R$200+", value: "MAIS200" },
]

function enquadrarPreco(preco: number, filtro: PriceFilter): boolean {
  if (filtro === "TODOS") return true
  const p = preco / 100 // converte centavos pra reais
  switch (filtro) {
    case "ATE50":
      return p <= 50
    case "50A100":
      return p > 50 && p <= 100
    case "100A200":
      return p > 100 && p <= 200
    case "MAIS200":
      return p > 200
  }
}

export default function HomePage() {
  const [busca, setBusca] = useState("")
  const [catAtiva, setCatAtiva] = useState("TODOS")
  const [tamAtivo, setTamAtivo] = useState<SizeFilter>("TODOS")
  const [precoAtivo, setPrecoAtivo] = useState<PriceFilter>("TODOS")
  const [erro, setErro] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isOffline, setIsOffline] = useState(
    typeof window !== "undefined" ? !navigator.onLine : false
  )

  const buscaDebounced = useDebounce(busca, 300)

  // Simula carregamento inicial (para dev — quando API chegar, controlado externamente)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  // Offline detection
  useEffect(() => {
    const online = () => setIsOffline(false)
    const offline = () => setIsOffline(true)
    window.addEventListener("online", online)
    window.addEventListener("offline", offline)
    return () => {
      window.removeEventListener("online", online)
      window.removeEventListener("offline", offline)
    }
  }, [])

  // Ordenar por createdAt (mais recente primeiro) para seção Novidades
  const ordenados = useMemo(
    () =>
      [...produtos].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    []
  )

  // Filtrar produtos (client-side, <500ms)
  const filtrados = useMemo(() => {
    try {
      return ordenados.filter((p) => {
        // Texto (com debounce)
        if (buscaDebounced) {
          const q = buscaDebounced.toLowerCase()
          if (
            !p.nome.toLowerCase().includes(q) &&
            !p.descricao.toLowerCase().includes(q)
          )
            return false
        }
        // Categoria
        if (catAtiva !== "TODOS" && p.categoria !== catAtiva) return false
        // Tamanho
        if (tamAtivo !== "TODOS" && !p.tamanhos.includes(tamAtivo))
          return false
        // Preço
        if (!enquadrarPreco(p.preco, precoAtivo)) return false
        // Só disponíveis
        if (!p.disponivel) return false
        return true
      })
    } catch {
      setErro(true)
      return []
    }
  }, [buscaDebounced, catAtiva, tamAtivo, precoAtivo, ordenados])

  const handleRetry = useCallback(() => {
    setErro(false)
  }, [])

  // ---- Estados ----
  if (erro) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex flex-col items-center justify-center p-8 gap-4">
        <p className="font-mono text-base text-[#1a1a1a] text-center">
          nossa tiragem atrasou — tenta de novo
        </p>
        <button
          onClick={handleRetry}
          className="font-mono text-sm px-4 py-2 border border-[#1a1a1a] bg-[#ff3b7f] text-white hover:bg-[#e63572]"
        >
          TENTAR DE NOVO
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      {/* Offline banner */}
      {isOffline && (
        <div className="bg-[#1a1a1a] text-[#f4f1ea] font-mono text-[11px] text-center py-1 px-4">
          modo zine — dados offline
        </div>
      )}

      {/* ===== HEADER ===== */}
      <header className="bg-[#1a1a1a] px-4 py-4">
        <h1 className="font-mono text-xl text-[#f4f1ea] uppercase tracking-[0.15em]">
          BREChÓ DA MARIA
        </h1>
      </header>

      {/* ===== BUSCA + FILTROS (mobile) ===== */}
      <section className="px-4 pt-3 pb-2 space-y-3 lg:hidden">
        {/* Input Busca */}
        <input
          type="text"
          placeholder="Buscar peças..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full font-mono text-sm bg-white border border-[#1a1a1a] px-3 py-2
                     placeholder:text-[#1a1a1a]/40 focus:outline-none focus:ring-1 focus:ring-[#1a1a1a]"
        />

        {/* Filtro Categoria */}
        <div>
          <p className="font-mono text-[11px] text-[#1a1a1a] mb-1.5">
            CATEGORIA
          </p>
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

        {/* Filtro Tamanho */}
        <div>
          <p className="font-mono text-[11px] text-[#1a1a1a] mb-1.5">
            TAMANHO
          </p>
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

        {/* Filtro Preço */}
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

      {/* ===== MAIN: SIDEBAR + GRID (desktop) ===== */}
      <div className="lg:flex lg:flex-row gap-x-6 px-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[200px] shrink-0 pt-4 pb-4 space-y-4">
          {/* Input Busca */}
          <input
            type="text"
            placeholder="Buscar peças..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full font-mono text-sm bg-white border border-[#1a1a1a] px-3 h-9
                       placeholder:text-[#1a1a1a]/40 focus:outline-none focus:ring-1 focus:ring-[#1a1a1a]"
          />

          {/* Categoria */}
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

          {/* Tamanho */}
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

          {/* Preço */}
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

        {/* Grid Area */}
        <div className="flex-1 min-w-0">

      {/* ===== NOVIDADES ===== */}
      <section className="px-4 pt-4 pb-6 lg:px-6">
        <h2 className="font-mono text-base text-[#1a1a1a] font-bold mb-3">
          NOVIDADES
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtrados.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-mono text-sm text-[#1a1a1a]/60">
              edição em breve — volto já!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtrados.slice(0, 8).map((produto) => (
              <CardPolaroid key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </section>

      </div>
    </div>

      {/* ===== CATEGORIAS (mobile) ===== */}
      <section className="px-4 pb-8 lg:hidden">
        <h2 className="font-mono text-base text-[#1a1a1a] font-bold mb-3">
          CATEGORIAS
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {categorias.map((cat) => (
            <TagCategoria
              key={cat.slug}
              label={cat.nome}
              href={`/categoria/${cat.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
