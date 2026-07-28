"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function ViewTransitionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // View transitions são automáticas com CSS quando
    // o navegador suporta document.startViewTransition
    // Este wrapper garante que o container principal exista
    // para que a transição funcione corretamente
  }, [pathname])

  return <div ref={ref}>{children}</div>
}
