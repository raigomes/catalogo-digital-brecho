import type { Metadata, Viewport } from "next"
import { Courier_Prime } from "next/font/google"
import { ViewTransitionsProvider } from "@/components/view-transitions-provider"
import { Footer } from "@/components/footer"
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
  userScalable: true,
  themeColor: "#f4f1ea",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const preconnect = (
    <>
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
    </>
  )

  return (
    <html
      lang="pt-BR"
      className={`${courierPrime.variable} h-full antialiased`}
    >
      <head>{preconnect}</head>
      <body className="min-h-full flex flex-col">
        <ViewTransitionsProvider>
          <main id="main-content">{children}</main>
        </ViewTransitionsProvider>
        <Footer />
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
