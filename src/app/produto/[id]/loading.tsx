import { Header } from "@/components/header"

export default function ProdutoLoading() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] flex flex-col">
      <Header variant="produto" skeleton />

      {/* Skeleton único — CSS responsivo cuida do reflow */}
      <div className="flex-1 lg:flex lg:flex-row lg:gap-6 lg:px-6">
        {/* Foto skeleton */}
        <div className="w-full aspect-[3/4] lg:aspect-auto lg:flex-1 bg-[#e0ddd5] animate-pulse lg:border lg:border-[#1a1a1a]" />

        {/* Info skeleton */}
        <div className="flex-1 p-4 lg:p-0 lg:py-4 lg:flex lg:flex-col lg:space-y-4">
          {/* ← Voltar (só desktop) */}
          <div className="hidden lg:block h-4 w-20 bg-[#e0ddd5] animate-pulse" />

          <div className="space-y-2">
            <div className="h-5 w-48 bg-[#e0ddd5] animate-pulse lg:h-7 lg:w-64" />
            <div className="h-4 w-24 bg-[#e0ddd5] animate-pulse lg:h-5 lg:w-28" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-16 bg-[#e0ddd5] animate-pulse" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-10 bg-[#e0ddd5] animate-pulse lg:h-7 lg:w-12"
                />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <div className="h-3 w-16 bg-[#e0ddd5] animate-pulse" />
            <div className="h-3 w-full bg-[#e0ddd5] animate-pulse" />
            <div className="h-3 w-3/4 bg-[#e0ddd5] animate-pulse" />
            <div className="h-3 w-5/6 bg-[#e0ddd5] animate-pulse" />
          </div>

          <div className="pt-4">
            <div className="h-12 w-full bg-[#e0ddd5] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
