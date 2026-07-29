export function SkeletonCard() {
  return (
    <article
      className="relative bg-white border border-[#1a1a1a] p-2
                 shadow-[2px_2px_0px_rgba(0,0,0,0.15)]
                 animate-pulse"
    >
      <div className="aspect-[3/4] bg-[#e0ddd5] border border-[#1a1a1a]" />
      <div className="mt-1.5 space-y-1">
        <div className="h-3 bg-[#e0ddd5] rounded-none w-3/4" />
        <div className="h-4 bg-[#e0ddd5] rounded-none w-1/2" />
      </div>
    </article>
  )
}