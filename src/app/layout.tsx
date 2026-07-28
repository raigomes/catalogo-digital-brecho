import type { Metadata, Viewport } from "next"
import { Courier_Prime } from "next/font/google"
import { ViewTransitionsProvider } from "@/components/view-transitions-provider"
import { ServiceWorkerRegister } from "@/components/service-worker-register"
import "./globals.css"

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "BreChó da Maria",
  description:
    "Catálogo digital de moda feminina seminova. Descubra peças únicas e sustentáveis.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BreChó da Maria",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: "#f4f1ea",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${courierPrime.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ViewTransitionsProvider>{children}</ViewTransitionsProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
