import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  variant: "home" | "produto";
  /** Título para categoria (nome da categoria) */
  titulo?: string;
  /** Link de volta (padrão "/") */
  hrefVoltar?: string;
  /** Se true, mostra skeleton (loading) */
  skeleton?: boolean;
};

export function Header({
  variant,
  titulo,
  hrefVoltar = "/",
  skeleton,
}: HeaderProps) {
  // ==============================
  // VARIANT: produto
  // ==============================
  if (variant === "produto") {
    if (skeleton) {
      return (
        <header className="bg-[#1a1a1a] px-4 py-4">
          <div className="lg:hidden h-4 w-24 bg-[#f4f1ea]/20 animate-pulse" />
          <div className="hidden lg:block h-6 w-56 bg-[#f4f1ea]/20 animate-pulse" />
        </header>
      );
    }

    return (
      <header className="bg-[#1a1a1a] px-4 py-4">
        {/* Mobile: ← Voltar + categoria */}
        <div className="lg:hidden flex items-center gap-4">
          <Link
            href={hrefVoltar}
            className="text-[#f4f1ea] text-xs uppercase tracking-widest hover:text-[#ff3b7f] transition-colors"
          >
            ← Voltar
          </Link>
          {titulo && (
            <span className="text-[#f4f1ea]/60 text-xs uppercase tracking-wider">
              {titulo}
            </span>
          )}
        </div>
        {/* Desktop: logo + BREChÓ DA MARIA */}
        <div className="hidden lg:flex items-center gap-3">
          <Image src="/sacola.png" alt="" width={24} height={24} priority />
          <p className="font-mono text-xl text-[#f4f1ea] uppercase tracking-[0.15em]">
            BREChÓ DA MARIA
          </p>
        </div>
      </header>
    );
  }

  // ==============================
  // VARIANT: home
  // ==============================

  if (skeleton) {
    return (
      <header className="bg-[#1a1a1a] px-4 py-4">
        <div className="h-5 w-32 bg-[#f4f1ea]/20 animate-pulse" />
      </header>
    );
  }

  return (
    <header className="bg-[#1a1a1a] px-4 py-4">
      <div className="flex items-center gap-3">
        <Image src="/sacola.png" alt="" width={24} height={24} priority />
        <h1 className="font-mono text-xl text-[#f4f1ea] uppercase tracking-[0.15em]">
          BREChÓ DA MARIA
        </h1>
      </div>
    </header>
  );
}
