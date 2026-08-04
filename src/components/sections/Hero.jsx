import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer, scaleIn } from "@/animations/motionPresets";
import MagneticButton from "@/components/shared/MagneticButton";

export default function Hero() {
  const { hero, identity } = portfolioData;

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="inicio"
      className="relative flex items-center overflow-hidden pt-24 pb-2 sm:min-h-[100svh] sm:pt-32 sm:pb-0"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 sm:gap-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-10">
        <motion.div variants={staggerContainer(0.14)} initial="hidden" animate="show">
          <motion.span variants={fadeUp} className="eyebrow-pill mb-4 sm:mb-5">
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display text-balance text-[2.5rem] font-semibold leading-[1.08] sm:text-6xl lg:text-[3.75rem]"
            style={{ color: "var(--color-ink)" }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-xl text-balance text-base leading-relaxed text-muted sm:mt-5 sm:text-lg"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-5 flex flex-row gap-2.5 sm:mt-9 sm:gap-4">
            <MagneticButton onClick={() => scrollTo("#proyecciones")}>
              {hero.primaryCTA}
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollTo("#respaldo")}>
              {hero.secondaryCTA}
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-5 border-t pt-3 sm:mt-10 sm:pt-6"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="scrollbar-hide flex flex-nowrap items-center justify-start gap-x-5 overflow-x-auto sm:flex-wrap sm:justify-start sm:gap-x-8 sm:gap-y-3 sm:overflow-visible">
              {hero.trustBadges.map((badge) => (
                <div key={badge} className="flex shrink-0 items-center gap-1.5">
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ stroke: "var(--color-accent-dark)" }}
                    strokeWidth={2.2}
                  >
                    <path d="M12 2l3 6.5 7 1-5 5 1.5 7L12 18l-6.5 3.5L7 14.5l-5-5 7-1z" />
                  </svg>
                  <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-wide text-muted whitespace-nowrap">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-[240px] sm:max-w-sm lg:max-w-none"
        >
          <div className="portrait-frame relative aspect-[3/4] w-full overflow-hidden rounded-[20px] sm:aspect-[4/5] sm:rounded-[28px]">
            <img
              src={hero.portrait}
              alt={`${identity.name}, ${identity.role}`}
              className="h-full w-full object-cover"
              loading="eager"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--color-muted);font-size:0.75rem;text-align:center;padding:1.5rem;">${hero.portraitFallbackLine1}<br/>${hero.portraitFallbackLine2}</div>`;
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hero-badge absolute -left-2 -top-2 z-20 px-2.5 py-2 sm:-left-4 sm:top-8 sm:px-5 sm:py-4 lg:-left-8"
          >
            <p className="font-display text-sm font-semibold currency-display sm:text-2xl" style={{ color: "var(--color-accent-dark)" }}>
              {hero.floatingBadgeOne.value}
            </p>
            <p className="max-w-[5.5rem] text-[8px] uppercase tracking-wide text-muted leading-tight sm:max-w-[9rem] sm:text-[11px] sm:leading-normal">
              {hero.floatingBadgeOne.label}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hero-badge absolute -right-2 -bottom-2 z-20 px-2.5 py-2 sm:-right-4 sm:bottom-8 sm:px-5 sm:py-4 lg:-right-8"
          >
            <p className="font-display text-sm font-semibold currency-display sm:text-2xl" style={{ color: "var(--color-ink)" }}>
              {hero.floatingBadgeTwo.value}
            </p>
            <p className="max-w-[5.5rem] text-[8px] uppercase tracking-wide text-muted leading-tight sm:max-w-[9rem] sm:text-[11px] sm:leading-normal">
              {hero.floatingBadgeTwo.label}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}