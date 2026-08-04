import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/animations/motionPresets";
import { cn } from "@/utils/cn";

export default function SectionHeader({ eyebrow, title, subtitle, align = "left", className }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow && <span className="eyebrow-pill mb-4">{eyebrow}</span>}
      <h2 className="font-display text-balance text-3xl font-semibold leading-[1.15] text-[color:var(--color-ink)] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-balance text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}