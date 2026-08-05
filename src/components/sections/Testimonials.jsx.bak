import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import SectionHeader from "@/components/shared/SectionHeader";

export default function Testimonials() {
  const { testimonials } = portfolioData;

  return (
    <section id="testimonios" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader eyebrow={testimonials.eyebrow} title={testimonials.title} align="center" className="mx-auto" />

        <motion.div
          variants={staggerContainer(0.16)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2"
        >
          {testimonials.items.map((t) => (
            <motion.figure key={t.name} variants={fadeUp} className="testimonial-card flex flex-col p-5 sm:p-8">
              <Quote size={24} className="text-[color:var(--color-accent-dark)] sm:size-[26px]" style={{ opacity: 0.5 }} />
              <blockquote className="mt-4 flex-1 text-balance text-sm leading-relaxed text-[color:var(--color-ink)] sm:mt-5 sm:text-lg">
                {'\u201C'}{t.quote}{'\u201D'}
              </blockquote>
              <figcaption className="mt-5 border-t pt-4 sm:mt-6" style={{ borderColor: "var(--color-border)" }}>
                <p className="text-sm font-semibold text-[color:var(--color-ink)]">{t.name}</p>
                <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}