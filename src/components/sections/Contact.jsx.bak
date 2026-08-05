import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import MagneticButton from "@/components/shared/MagneticButton";

export default function Contact() {
  const { contact, identity } = portfolioData;

  return (
    <section id="contacto" className="section-pad relative">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-10">
        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="card-panel-bold px-6 py-12 sm:rounded-[32px] sm:px-14 sm:py-16"
        >
          <motion.span variants={fadeUp} className="eyebrow-pill mb-5">
            {contact.eyebrow}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display text-balance text-2xl font-semibold leading-tight text-[color:var(--color-ink)] sm:text-5xl"
          >
            {contact.headline}
          </motion.h2>

          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-balance text-sm leading-relaxed text-[color:var(--color-muted)] sm:mt-5 sm:text-lg">
            {contact.text}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">
            <MagneticButton href={contact.whatsapp}>
              <MessageCircle size={17} />
              {contact.whatsappLabel}
            </MagneticButton>
            <MagneticButton href={"mailto:" + contact.email} variant="ghost">
              <Mail size={17} />
              {contact.emailLabel}
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t pt-5 text-xs text-[color:var(--color-muted)] sm:mt-10 sm:pt-7 sm:text-sm"
            style={{ borderColor: "var(--color-border)" }}
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              {identity.location}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}