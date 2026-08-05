import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, viewportOnce } from "@/animations/motionPresets";
import SectionHeader from "@/components/shared/SectionHeader";
import Accordion from "@/components/shared/Accordion";

export default function FAQ() {
  const { faq } = portfolioData;

  return (
    <section id="preguntas-frecuentes" className="section-pad relative">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={faq.eyebrow}
          title={faq.title}
          subtitle={faq.subtitle}
          align="center"
          className="mx-auto"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 sm:mt-14"
        >
          <Accordion items={faq.items} />
        </motion.div>
      </div>
    </section>
  );
}