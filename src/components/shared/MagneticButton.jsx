import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/utils/cn";

export default function MagneticButton({ children, href, onClick, variant = "solid", className, ariaLabel }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.25);
    y.set(relY * 0.35);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const base = "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none";

  const styles = variant === "solid"
    ? "text-[color:var(--color-accent-ink)]"
    : "border text-[color:var(--color-ink)] hover:border-[color:var(--color-accent-dark)] hover:text-[color:var(--color-accent-dark)]";

  const solidStyle = variant === "solid"
    ? { backgroundColor: "var(--color-accent)" }
    : { borderColor: "var(--color-border-strong)" };

  const content = (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <motion.span
        style={solidStyle}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(base, styles, className)}
      >
        {children}
      </motion.span>
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        aria-label={ariaLabel}
        onClick={onClick}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" aria-label={ariaLabel} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
