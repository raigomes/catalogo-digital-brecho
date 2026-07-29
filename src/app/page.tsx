import { fetchProdutos, fetchCategorias } from "@/lib/api"
import { HomePageContent } from "@/components/home-page-content"

// ============================================
// HOME PAGE — Catálogo Digital Brechó da Maria
// Server component: busca dados da Google Sheets (ou fallback mock)
// Lê searchParams no servidor pra evitar bailout do useSearchParams
// SEM Suspense — componente renderizado no HTML inicial (LCP imediato)
// ============================================
export default async function HomePage(props: {
  searchParams?: Promise<{ categoria?: string }>
}) {
  const searchParams = await props.searchParams
  const catAtiva = searchParams?.categoria || "TODOS"

  const [produtos, categorias] = await Promise.all([
    fetchProdutos(),
    fetchCategorias(),
  ])

  return (
    <HomePageContent
      produtos={produtos}
      categorias={categorias}
      catAtivaSSR={catAtiva}
    />
  )
}
