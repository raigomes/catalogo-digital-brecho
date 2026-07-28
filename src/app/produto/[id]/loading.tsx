export default function ProdutoLoading() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] flex flex-col">
      <header className="bg-[#1a1a1a] px-4 py-4">
        <div className="h-4 w-24 bg-[#f4f1ea]/20 animate-pulse" />
      </header>
      <div className="w-full aspect-[3/4] bg-[#e0ddd5] animate-pulse" />
      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-2">
          <div className="h-5 w-48 bg-[#e0ddd5] animate-pulse" />
          <div className="h-4 w-24 bg-[#e0ddd5] animate-pulse" />
        </div>
        <div className="space-y-1">
          <div className="h-3 w-16 bg-[#e0ddd5] animate-pulse" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 w-10 bg-[#e0ddd5] animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-3 w-16 bg-[#e0ddd5] animate-pulse" />
          <div className="h-3 w-full bg-[#e0ddd5] animate-pulse" />
          <div className="h-3 w-3/4 bg-[#e0ddd5] animate-pulse" />
        </div>
      </div>
    </div>
  )
}
