import { SkeletonCard } from "@/components/skeleton-card"

export default function CategoriaLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f1ea]">
      <header className="bg-[#1a1a1a] px-4 py-4">
        <div className="h-5 w-32 bg-[#f4f1ea]/20 animate-pulse" />
      </header>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
