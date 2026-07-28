"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { produtos, categorias } from "@/lib/data"
import type { SizeFilter, PriceFilter } from "@/lib/types"
import { enquadrarPreco } from "@/lib/utils"
import { useDebounce } from "@/lib/hooks"
import { TagCategoria } from "@/components/tag-categoria"
import { FiltrosMobile } from "@/components/filtros-mobile"
import { SidebarFiltros } from "@/components/sidebar-filtros"
import { SecaoNovidades } from "@/components/secao-novidades"

// ============================================
// HOME PAGE — Catálogo Digital Brechó da Maria
// Direção visual: Zine Independente
// Stack: Next.js 16 + Tailwind CSS 4
// ============================================
export default function HomePage() {
  // ==========================================
  // ESTADO: controle de filtros e UI
  // ==========================================
  const [busca, setBusca] = useState("")
  const [catAtiva, setCatAtiva] = useState("TODOS")
  const [tamAtivo, setTamAtivo] = useState<SizeFilter>("TODOS")
  const [precoAtivo, setPrecoAtivo] = useState<PriceFilter>("TODOS")
  const [erro, setErro] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isOffline, setIsOffline] = useState(
    typeof window !== "undefined" ? !navigator.onLine : false
  )

  // Debounce de 300ms na busca — evita filtragem a cada tecla
  // A busca visual continua instantânea no input, mas o filtro
  // só executa após 300ms de inatividade do usuário
  const buscaDebounced = useDebounce(busca, 300)

  // Simula carregamento inicial (dev).
  // Em produção, loading será controlado pelo fetch da API (Google Sheets)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  // Detecção de conectividade — monitora navigator.onLine
  // Exibe banner "modo zine" quando o usuário estiver offline
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

  // ==========================================
  // FILTRAGEM: ordenação e busca client-side
  // Tudo memoizado para performance <500ms
  // Ordem dos filtros:
  //   1. Texto (nome + descrição, com debounce)
  //   2. Categoria
  //   3. Tamanho
  //   4. Faixa de preço
  //   5. Disponibilidade
  // ==========================================

  // Ordena por createdAt (mais recente primeiro) para a seção Novidades
  const ordenados = useMemo(
    () =>
      [...produtos].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    []
  )

  // Filtragem cross-criteria com fallback de erro
  const filtrados = useMemo(() => {
    try {
      return ordenados.filter((p) => {
        // 1. Filtro textual (nome + descrição)
        if (buscaDebounced) {
          const q = buscaDebounced.toLowerCase()
          if (
            !p.nome.toLowerCase().includes(q) &&
            !p.descricao.toLowerCase().includes(q)
          )
            return false
        }
        // 2. Filtro por categoria
        if (catAtiva !== "TODOS" && p.categoria !== catAtiva) return false
        // 3. Filtro por tamanho
        if (tamAtivo !== "TODOS" && !p.tamanhos.includes(tamAtivo))
          return false
        // 4. Filtro por faixa de preço (valores em centavos)
        if (!enquadrarPreco(p.preco, precoAtivo)) return false
        // 5. Apenas itens disponíveis
        if (!p.disponivel) return false
        return true
      })
    } catch {
      setErro(true)
      return []
    }
  }, [buscaDebounced, catAtiva, tamAtivo, precoAtivo, ordenados])

  // Reset do estado de erro (botão "TENTAR DE NOVO")
  const handleRetry = useCallback(() => {
    setErro(false)
  }, [])

  // ==========================================
  // RENDER: layout condicional por estado
  // ==========================================

  // Estado de ERRO — mensagem + botão retry
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

  // Estado NORMAL — layout completo da Home
  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      {/* Banner offline — exibido quando não há conexão */}
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

      {/* ===== FILTROS MOBILE (< 1024px) ===== */}
      <FiltrosMobile
        busca={busca}
        setBusca={setBusca}
        catAtiva={catAtiva}
        setCatAtiva={setCatAtiva}
        tamAtivo={tamAtivo}
        setTamAtivo={setTamAtivo}
        precoAtivo={precoAtivo}
        setPrecoAtivo={setPrecoAtivo}
        categorias={categorias}
      />

      {/* ===== LAYOUT DESKTOP (>= 1024px) ===== */}
      <div className="lg:flex lg:flex-row gap-x-6 px-6">
        {/* Sidebar de filtros — apenas desktop */}
        <SidebarFiltros
          busca={busca}
          setBusca={setBusca}
          catAtiva={catAtiva}
          setCatAtiva={setCatAtiva}
          tamAtivo={tamAtivo}
          setTamAtivo={setTamAtivo}
          precoAtivo={precoAtivo}
          setPrecoAtivo={setPrecoAtivo}
          categorias={categorias}
        />

        {/* Grid de novidades */}
        <div className="flex-1 min-w-0">
          <SecaoNovidades loading={loading} filtrados={filtrados} />
        </div>
      </div>

      {/* ===== CATEGORIAS (apenas mobile) ===== */}
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
