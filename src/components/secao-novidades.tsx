"use client"

import type { Produto } from "@/lib/types"
import { CardPolaroid } from "@/components/card-polaroid"
import { SkeletonCard } from "@/components/skeleton-card"

// ============================================
// PROPS
// ============================================
interface SecaoNovidadesProps {
  loading: boolean
  filtrados: Produto[]
  maxCards?: number
}

// ============================================
// SEÇÃO NOVIDADES
// Três estados possíveis:
//   1. loading — esqueletos cinza com pulse animation
//   2. vazio — mensagem "edição em breve"
//   3. grid — cards Polaroid dos produtos
// ============================================
export function SecaoNovidades({
  loading,
  filtrados,
  maxCards = 8,
}: SecaoNovidadesProps) {
  return (
    <section className="px-4 pt-4 pb-6 lg:px-6">
      <h2 className="font-mono text-base text-[#1a1a1a] font-bold mb-3">
        NOVIDADES
      </h2>

      {loading ? (
        /* Estado 1: Loading — skeleton cards com animate-pulse */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtrados.length === 0 ? (
        /* Estado 2: Vazio — mensagem amigável */
        <div className="py-12 text-center">
          <p className="font-mono text-sm text-[#1a1a1a]/60">
            edição em breve — volto já!
          </p>
        </div>
      ) : (
        /* Estado 3: Grid de produtos — 2 col mobile, 3 tablet, 4 desktop */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtrados.slice(0, maxCards).map((produto, index) => (
            <CardPolaroid key={produto.id} produto={produto} priority={index < 8} />
          ))}
        </div>
      )}
    </section>
  )
}
