import { portfolioData } from "@/data/portfolioData";

export default function Footer() {
  const { identity, footer, contact } = portfolioData;
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative border-t"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-display text-lg font-semibold text-[color:var(--color-ink)]">{identity.name}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-text)]">{identity.role}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
              {identity.secondaryRole} \u2013 {identity.alliance}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[color:var(--color-muted)]">{footer.text}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="text-sm text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-accent-dark)]">
              WhatsApp
            </a>
            <a href={"mailto:" + contact.email} className="text-sm text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-accent-dark)]">
              Correo
            </a>
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Volver arriba"
              className="group flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-accent-dark)]"
              style={{ borderColor: "var(--color-border)" }}
            >
              Arriba
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs text-[color:var(--color-muted)] sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--color-border)" }}>
          <p>{"\u00A9"} {year} {identity.name}. {footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}