import { motion } from "framer-motion";
import { Calculator, Layers, ShieldCheck } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, slideInLeft, staggerContainer, viewportOnce } from "@/animations/motionPresets";

const highlightIcons = [Calculator, Layers, ShieldCheck];

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="sobre-mi" className="section-pad relative">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <span className="eyebrow-pill mb-4 sm:mb-5">{about.eyebrow}</span>
          <h2 className="font-display text-balance text-2xl font-semibold leading-[1.15] text-[color:var(--color-ink)] sm:text-4xl md:text-5xl">
            {about.headline}
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer(0.14)} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <motion.p variants={fadeUp} className="text-balance text-sm leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
            {about.paragraphOne}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-3 text-balance text-sm leading-relaxed text-[color:var(--color-muted)] sm:mt-5 sm:text-lg">
            {about.paragraphTwo}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 grid grid-cols-3 gap-2 sm:mt-9 sm:grid-cols-3 sm:gap-3">
            {about.highlights.map((label, i) => {
              const Icon = highlightIcons[i];
              return (
                <div key={label} className="card-panel flex flex-col items-center gap-1.5 px-2 py-3 text-center sm:flex-row sm:items-center sm:gap-3 sm:px-5 sm:py-5 sm:text-left">
                  <Icon size={16} className="shrink-0 text-[color:var(--color-accent-dark)] sm:size-[18px]" />
                  <p className="text-[10px] font-medium leading-snug text-[color:var(--color-ink)] sm:text-sm">{label}</p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}