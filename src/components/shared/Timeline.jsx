import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Compass, Handshake } from "lucide-react";
import IndexBadge from "./IndexBadge";

const iconMap = { search: Search, compass: Compass, handshake: Handshake };

export default function Timeline({ steps }) {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 35%"],
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * steps.length + 0.1), steps.length - 1);
      setActiveStep(idx);
    });
    return () => unsub();
  }, [scrollYProgress, steps.length]);

  return (
    <div ref={containerRef} className="relative">
      {/* ═ DESKTOP: horizontal rail ═ */}
      <div className="hidden md:block">
        <div className="relative mb-10 h-[3px] w-full">
          <div className="absolute inset-0 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
            <motion.div className="h-full origin-left" style={{ scaleX: progressScale, backgroundColor: "var(--color-accent)" }} />
          </div>

          <motion.div className="absolute top-1/2 z-10" style={{ left: dotPosition, translateX: "-50%", translateY: "-50%" }}>
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: "var(--color-accent)", boxShadow: "0 0 0 4px var(--color-bg), 0 3px 10px rgba(3,199,63,0.35)" }}
            />
          </motion.div>

          {steps.map((_, idx) => {
            const isActive = idx <= activeStep;
            const leftPct = ((idx + 0.5) / steps.length) * 100;
            return (
              <div key={idx} className="absolute top-1/2" style={{ left: leftPct + "%", translate: "-50% -50%" }}>
                <div
                  className="h-2.5 w-2.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: isActive ? "var(--color-accent)" : "var(--color-surface)",
                    border: "2px solid " + (isActive ? "var(--color-accent)" : "var(--color-border-strong)"),
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {steps.map((item, idx) => {
            const Icon = iconMap[item.icon];
            const isActive = idx <= activeStep;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card-panel flex flex-col p-7 transition-all duration-500"
                style={{ borderColor: isActive ? "rgba(3,199,63,0.3)" : undefined, transform: isActive ? "translateY(-3px)" : "none" }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500"
                    style={{
                      backgroundColor: isActive ? "var(--color-accent-tint-strong)" : "var(--color-accent-tint)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <Icon size={20} className="text-[color:var(--color-accent-dark)]" />
                  </div>
                  <IndexBadge number={item.step} active={isActive} />
                </div>

                <span
                  className="mt-5 inline-flex w-fit items-center rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500"
                  style={{
                    backgroundColor: isActive ? "var(--color-accent-tint)" : "var(--color-bg)",
                    color: isActive ? "var(--color-accent-text)" : "var(--color-muted)",
                    border: "1px solid " + (isActive ? "rgba(3,199,63,0.25)" : "var(--color-border)"),
                  }}
                >
                  {item.duration}
                </span>

                <h3 className="font-display mt-4 text-xl sm:text-2xl font-semibold text-[color:var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ═ MOBILE: vertical rail ═ */}
      <div className="relative pl-14 md:hidden">
        <div className="absolute left-5 top-0 bottom-0 w-[3px] rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
          <motion.div className="w-full origin-top" style={{ scaleY: progressScale, height: "100%", backgroundColor: "var(--color-accent)" }} />
        </div>

        <motion.div className="absolute left-5 z-10" style={{ top: dotPosition, translateX: "-50%", translateY: "-50%" }}>
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: "var(--color-accent)", boxShadow: "0 0 0 4px var(--color-bg), 0 3px 10px rgba(3,199,63,0.35)" }}
          />
        </motion.div>

        <div className="flex flex-col gap-8">
          {steps.map((item, idx) => {
            const Icon = iconMap[item.icon];
            const isActive = idx <= activeStep;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative"
              >
                <div
                  className="absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "2px solid " + (isActive ? "var(--color-accent)" : "var(--color-border-strong)"),
                    color: isActive ? "var(--color-accent-dark)" : "var(--color-muted)",
                  }}
                >
                  <Icon size={17} />
                </div>

                <div className="card-panel p-5" style={{ borderColor: isActive ? "rgba(3,199,63,0.3)" : undefined }}>
                  <div className="flex items-center justify-between">
                    <IndexBadge number={item.step} active={isActive} size={40} />
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.18em] rounded-full px-2.5 py-1"
                      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-muted)", border: "1px solid var(--color-border)" }}
                    >
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-lg font-semibold text-[color:var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}