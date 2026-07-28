import type { Produto } from "@/lib/types"
import { formatPreco } from "@/lib/utils"

interface BotaoWhatsAppProps {
  produto: Produto
}

const WHATSAPP_NUMBER = "5511999999999" // placeholder — Maria configura depois

export function BotaoWhatsApp({ produto }: BotaoWhatsAppProps) {
  const mensagem = encodeURIComponent(
    `Olá! Tenho interesse nessa peça do Brechó da Maria:\n\n` +
      `*${produto.nome}* - ${formatPreco(produto.preco)}\n` +
      `Tamanhos: ${produto.tamanhos.join(", ")}\n\n` +
      `https://brechodamaria.com.br/produto/${produto.id}`
  )

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagem}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full font-mono text-sm font-bold text-white
                 bg-[#ff3b7f] border border-[#1a1a1a] px-5 py-3
                 text-center uppercase tracking-wider
                 transition-all duration-200
                 hover:bg-[#e63572] active:bg-[#cc2f65]
                 shadow-[2px_2px_0px_rgba(0,0,0,0.15)]
                 hover:shadow-[3px_3px_0px_rgba(0,0,0,0.2)]
                 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
    >
      QUERO ESSE!
    </a>
  )
}
