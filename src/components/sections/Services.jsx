import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, viewportOnce } from "@/animations/motionPresets";
import SectionHeader from "@/components/shared/SectionHeader";
import ServiceCarousel from "@/components/shared/ServiceCarousel";

export default function Services() {
  const { services } = portfolioData;

  return (
    <section id="servicios" className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
          align="center"
          className="mx-auto"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14"
        >
          <ServiceCarousel services={services.items} />
        </motion.div>
      </div>
    </section>
  );
}