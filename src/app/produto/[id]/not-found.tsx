import Link from "next/link"

export default function ProdutoNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f1ea] gap-4 p-4">
      <p className="font-mono text-sm uppercase tracking-wider text-center text-[#1a1a1a]/60">
        essa peça já era — edição esgotada
      </p>
      <Link
        href="/"
        className="bg-[#ff3b7f] text-white font-mono text-xs uppercase tracking-widest px-6 py-2 border border-[#1a1a1a] hover:bg-[#e63572] transition-colors"
      >
        ver novidades
      </Link>
    </div>
  )
}
