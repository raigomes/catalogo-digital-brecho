"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import type { Produto, Categoria, SizeFilter, PriceFilter } from "@/lib/types"
import { enquadrarPreco } from "@/lib/utils"
import { useDebounce } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { FiltrosMobile } from "@/components/filtros-mobile"
import { SidebarFiltros } from "@/components/sidebar-filtros"
import { SecaoNovidades } from "@/components/secao-novidades"

interface HomePageContentProps {
  produtos: Produto[]
  categorias: Categoria[]
  catAtivaSSR: string
}

// ============================================
// HOME PAGE CONTENT — Catálogo Digital Brechó da Maria
// Direção visual: Zine Independente
// Componente client-side com filtros e interação
// catAtiva vem do servidor pra evitar bailout (useSearchParams)
// ============================================
export function HomePageContent({ produtos, categorias, catAtivaSSR }: HomePageContentProps) {
  // ==========================================
  // ESTADO: controle de filtros e UI
  // ==========================================
  const [busca, setBusca] = useState("")
  const [tamAtivo, setTamAtivo] = useState<SizeFilter>("TODOS")
  const [precoAtivo, setPrecoAtivo] = useState<PriceFilter>("TODOS")
  const [erro, setErro] = useState(false)
  const loading = false // dados já chegam do servidor, sem estado de carregamento
  const [isOffline, setIsOffline] = useState(
    typeof window !== "undefined" ? !navigator.onLine : false,
  )

  const router = useRouter()
  const [catAtiva, setCatAtivaState] = useState(catAtivaSSR)
  const setCatAtiva = useCallback(
    (cat: string) => {
      setCatAtivaState(cat)
      router.replace(
        cat === "TODOS" ? "/" : `/?categoria=${encodeURIComponent(cat)}`,
        { scroll: false },
      )
    },
    [router],
  )

  // Debounce de 300ms na busca — evita filtragem a cada tecla
  const buscaDebounced = useDebounce(busca, 300)

  // Detecção de conectividade
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
  // ==========================================

  // Ordena por createdAt (mais recente primeiro)
  const ordenados = useMemo(
    () =>
      [...produtos].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [produtos],
  )

  // Filtragem cross-criteria com fallback de erro
  const filtrados = useMemo(() => {
    try {
      return ordenados.filter((p) => {
        // 1. Filtro textual
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
        if (tamAtivo !== "TODOS" && !p.tamanhos.includes(tamAtivo)) return false
        // 4. Filtro por faixa de preço
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

  // Reset do estado de erro
  const handleRetry = useCallback(() => {
    setErro(false)
  }, [])

  // ==========================================
  // RENDER
  // ==========================================

  // Estado de ERRO
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

  // Estado NORMAL
  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      {/* Banner offline */}
      {isOffline && (
        <div className="bg-[#1a1a1a] text-[#f4f1ea] font-mono text-[11px] text-center py-1 px-4">
          modo zine — dados offline
        </div>
      )}

      <Header variant="home" />

      {/* Filtros mobile */}
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

      {/* Layout desktop */}
      <div className="lg:flex lg:flex-row gap-x-6 px-6">
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

        <div className="flex-1 min-w-0">
          <SecaoNovidades loading={loading} filtrados={filtrados} />
        </div>
      </div>
    </div>
  )
}
