import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, viewportOnce } from "@/animations/motionPresets";
import SectionHeader from "@/components/shared/SectionHeader";
import TiltCertificate from "@/components/shared/TiltCertificate";

export default function Credentials() {
  const { credentials } = portfolioData;

  return (
    <section id="respaldo" className="section-pad relative">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow={credentials.eyebrow}
          title={credentials.title}
          subtitle={credentials.subtitle}
          align="center"
          className="mx-auto"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-10 max-w-2xl sm:mt-14"
        >
          <TiltCertificate />
        </motion.div>

        {credentials.trustLine && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-8 flex justify-center sm:mt-12"
          >
            <div
              className="inline-flex items-center gap-2.5 rounded-full border px-5 py-3 text-center"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-accent-tint)" }}
            >
              <Handshake size={18} style={{ color: "var(--color-accent-dark)" }} className="shrink-0" />
              <p className="text-sm font-semibold text-[color:var(--color-ink)] sm:text-base">
                {credentials.trustLine}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
