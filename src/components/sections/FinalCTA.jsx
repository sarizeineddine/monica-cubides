import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import MagneticButton from "@/components/shared/MagneticButton";

export default function FinalCTA() {
  const { finalCta } = portfolioData;

  return (
    <section
      id="ultimo-llamado"
      className="section-pad relative w-full overflow-hidden"
      style={{ backgroundColor: "var(--color-accent-dark)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        variants={staggerContainer(0.14)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mx-auto max-w-2xl px-5 text-center sm:px-8"
      >
        <motion.span
          variants={fadeUp}
          className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]"
          style={{
            borderColor: "rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "#ffffff",
          }}
        >
          {finalCta.eyebrow}
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="font-display text-balance text-2xl font-semibold leading-[1.15] text-white sm:text-4xl md:text-5xl"
        >
          {finalCta.headline}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-lg text-balance text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-lg"
        >
          {finalCta.subheadline}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex justify-center sm:mt-10">
          <MagneticButton href={finalCta.ctaHref || "#contacto"} variant="light" magnetic={false}>
            {finalCta.ctaLabel}
            <ArrowRight size={16} />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}