import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import MobileMenu from "./MobileMenu";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { nav } = portfolioData;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-4 sm:top-6 z-[100] flex justify-center px-3 sm:px-5 pointer-events-none">
      <nav
        className="flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border transition-all duration-500 pointer-events-auto sm:w-auto sm:gap-8"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: scrolled ? "var(--color-border-strong)" : "var(--color-border)",
          boxShadow: scrolled ? "var(--shadow-card)" : "none",
          padding: "0.65rem 1.1rem",
        }}
      >
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); handleNavClick("#inicio"); }}
          className="flex items-center min-w-0 pr-2"
        >
          <span className="font-display text-[15px] sm:text-lg font-bold tracking-tight text-[color:var(--color-ink)] truncate">
            {nav.brandTitle}
          </span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="nav-link text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => handleNavClick("#contacto")}
            className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--color-accent)", color: "var(--color-accent-ink)" }}
          >
            {nav.cta}
          </button>

          <button
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center p-1.5 -m-1 text-[color:var(--color-ink)]"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <MobileMenu open={open} links={nav.links} cta={nav.cta} onLinkClick={handleNavClick} />
    </header>
  );
}
