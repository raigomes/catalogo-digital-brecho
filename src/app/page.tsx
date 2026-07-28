import { Suspense } from "react"
import { fetchProdutos, fetchCategorias } from "@/lib/api"
import { HomePageContent } from "@/components/home-page-content"

// ============================================
// HOME PAGE — Catálogo Digital Brechó da Maria
// Server component: busca dados da Google Sheets (ou fallback mock)
// e renderiza o client component com filtros
// ============================================
export default async function HomePage() {
  const [produtos, categorias] = await Promise.all([
    fetchProdutos(),
    fetchCategorias(),
  ])

  return (
    <Suspense fallback={null}>
      <HomePageContent produtos={produtos} categorias={categorias} />
    </Suspense>
  )
}
