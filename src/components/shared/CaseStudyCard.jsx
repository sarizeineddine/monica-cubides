import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import IndexBadge from "./IndexBadge";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

function parseMetric(metric) {
  const match = String(metric).match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { prefix: "", value: 0, suffix: String(metric), decimals: 0 };
  const [, prefix, numStr, suffix] = match;
  const normalized = numStr.replace(",", ".");
  const decimals = normalized.includes(".") ? normalized.split(".")[1].length : 0;
  return { prefix, value: parseFloat(normalized), suffix, decimals };
}

function AnimatedMetric({ metric, active }) {
  const { prefix, value, suffix, decimals } = parseMetric(metric);
  const animated = useAnimatedNumber(active ? value : 0, 1400);
  const display = decimals > 0
    ? animated.toFixed(decimals)
    : Math.round(animated).toLocaleString("es-CO");
  return <>{prefix}{display}{suffix}</>;
}

export default function CaseStudyCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="card-panel-bold overflow-hidden p-4 sm:p-8">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-10">
        <div
          className="card-panel relative flex flex-col items-center justify-center gap-1.5 px-4 pt-9 pb-5 text-center sm:gap-2 sm:px-6 sm:py-9"
          style={{ backgroundColor: "var(--color-accent-tint)" }}
        >
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
            <span className="sm:hidden">
              <IndexBadge number={String(index + 1).padStart(2, "0")} active size={24} />
            </span>
            <span className="hidden sm:inline-block">
              <IndexBadge number={String(index + 1).padStart(2, "0")} active size={38} />
            </span>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-accent-text)] sm:mt-3">
            {item.category}
          </p>
          <motion.p
            className="font-display text-3xl font-bold currency-display sm:text-5xl md:text-6xl"
            initial={{ scale: 0.92, color: "#14150F" }}
            animate={{ scale: inView ? 1 : 0.92, color: inView ? "#029934" : "#14150F" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatedMetric metric={item.metric} active={inView} />
          </motion.p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
            {item.metricLabel}
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="font-display text-xl font-semibold text-[color:var(--color-ink)] sm:text-2xl">
            {item.title}
          </h3>

          <div
            className="grid overflow-hidden transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ gridTemplateRows: inView ? "1fr" : "0fr" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="min-h-0 overflow-hidden"
            >
              <div className="mt-5 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-accent-text)]">
                    Contexto
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-muted)]">{item.context}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-accent-text)]">
                    Estrategia
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-muted)]">{item.strategy}</p>
                </div>
              </div>

              <div
                className="mt-5 flex items-start gap-3 rounded-2xl border-l-2 pl-3 pr-3 py-3 sm:pl-4 sm:pr-4 sm:py-3.5"
                style={{ borderColor: "var(--color-accent)", backgroundColor: "var(--color-accent-tint)" }}
              >
                <ArrowUpRight size={17} className="mt-0.5 shrink-0 text-[color:var(--color-accent-dark)]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-accent-text)]">
                    Impacto
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-ink)] sm:text-base">{item.impact}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
