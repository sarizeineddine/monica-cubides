import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, slideInLeft, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import SectionHeader from "@/components/shared/SectionHeader";
import TiltCertificate from "@/components/shared/TiltCertificate";

export default function Credentials() {
  const { credentials } = portfolioData;

  return (
    <section id="respaldo" className="section-pad relative">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <SectionHeader eyebrow={credentials.eyebrow} title={credentials.title} subtitle={credentials.subtitle} />

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3"
          >
            {credentials.stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="card-panel px-2 py-4 text-center sm:px-4 sm:py-6">
                <p className="font-display text-base font-semibold text-[color:var(--color-accent-text)] sm:text-2xl md:text-3xl currency-display">
                  {stat.value}
                  {stat.suffix && <span className="ml-0.5 text-[10px] sm:text-sm font-medium text-[color:var(--color-muted)]">{stat.suffix}</span>}
                </p>
                <p className="mt-2 text-[9px] sm:text-[11px] leading-snug text-[color:var(--color-muted)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <TiltCertificate />
        </motion.div>
      </div>
    </section>
  );
}