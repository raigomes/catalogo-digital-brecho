const socialLinks = [
  { label: 'IG: @brechodamaria', href: 'https://instagram.com/brechodamaria' },
  { label: 'FB: /brechodamaria', href: 'https://facebook.com/brechodamaria' },
  { label: 'WA: (11) 99999-9999', href: 'https://wa.me/5511999999999' },
] as const;

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-[10px] lg:text-[11px] text-[#f4f1ea] hover:text-[#ff3b7f] transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b7f] focus-visible:outline-offset-2"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] px-5 py-4 lg:px-6 lg:py-5 flex flex-col gap-3 lg:gap-[10px]">
      {/* Desktop: fita crepe no topo (primeiro elemento) */}
      <div className="hidden lg:block h-[3px] w-full bg-[#f5d742]" />

      {/* Logo + Desktop social (lado a lado no desktop) */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/sacola.png" alt="" width={24} height={24} />
          <p className="font-mono text-base text-[#f4f1ea] uppercase tracking-[0.15em] lg:text-lg">
            BREChÓ DA MARIA
          </p>
        </div>

        {/* Social — desktop only (na mesma linha do logo) */}
        <ul className="hidden lg:flex lg:flex-row lg:gap-[20px] list-none">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <SocialLink href={link.href}>{link.label}</SocialLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Divisor — retângulo sólido 1px */}
      <div className="h-[1px] w-full bg-[#f4f1ea]/30 lg:bg-[#f4f1ea]/20" />

      {/* Copyright — mobile only (depois do divisor) */}
      <p className="font-mono text-[10px] text-[#f4f1ea] lg:hidden">
        © 2026 Brechó da Maria
      </p>

      {/* Social — mobile only (horizontal, depois do divisor) */}
      <ul className="flex flex-row gap-4 lg:hidden">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <SocialLink href={link.href}>{link.label}</SocialLink>
          </li>
        ))}
      </ul>

      {/* Copyright + Disclaimer row (lado a lado no desktop) */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
        {/* Copyright — desktop only (depois do divisor) */}
        <p className="hidden lg:block font-mono text-[10px] text-[#f4f1ea] whitespace-nowrap">
          © 2026 Brechó da Maria
        </p>

        {/* Disclaimer — sem max-w limit */}
        <p className="font-mono text-[9px] text-[#f4f1ea]/70 leading-relaxed flex-1 min-w-0">
          Aviso: Este é um site experimental/pessoal, não uma entidade comercial.
          Todo o conteúdo é fictício ou destinado apenas a fins de demonstração de
          design e desenvolvimento. Para saber mais sobre meu trabalho, visite{' '}
          <a
            href="https://raigomes.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#ff3b7f] transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b7f] focus-visible:outline-offset-2"
          >
            raigomes.dev
          </a>
        </p>
      </div>

      {/* Mobile: fita crepe no final (último elemento) */}
      <div className="lg:hidden h-[3px] w-full bg-[#f5d742]" />
    </footer>
  );
}
