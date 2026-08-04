import { AnimatePresence, motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/animations/motionPresets";

export default function MobileMenu({ open, links, cta, onLinkClick }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-16 left-3 right-3 rounded-3xl border p-6 md:hidden pointer-events-auto"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-elevated)",
          }}
        >
          <motion.ul
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-1"
          >
            {links.map((link) => (
              <motion.li key={link.href} variants={fadeUp}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); onLinkClick(link.href); }}
                  className="block py-2.5 text-lg font-semibold text-[color:var(--color-ink)]"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
            <motion.button
              variants={fadeUp}
              onClick={() => onLinkClick("#contacto")}
              className="mt-3 w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest"
              style={{ backgroundColor: "var(--color-accent)", color: "var(--color-accent-ink)" }}
            >
              {cta}
            </motion.button>
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}