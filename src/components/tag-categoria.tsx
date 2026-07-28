import Link from "next/link"
import { cn } from "@/lib/utils"

interface TagCategoriaProps {
  label: string
  active?: boolean
  onClick?: () => void
  href?: string
  className?: string
  fullWidth?: boolean
}

export function TagCategoria({
  label,
  active,
  onClick,
  href,
  className,
  fullWidth,
}: TagCategoriaProps) {
  const baseClass = cn(
    "inline-block font-mono text-[11px] px-2.5 py-1 border border-[#1a1a1a] transition-colors duration-150",
    active
      ? "bg-[#1a1a1a] text-[#f4f1ea]"
      : "bg-[#f5d742] text-[#1a1a1a] hover:bg-[#e8cc3a]",
    fullWidth && "w-full text-left",
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {label}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={baseClass}>
      {label}
    </button>
  )
}
