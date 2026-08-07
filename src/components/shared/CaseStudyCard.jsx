import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Compass, ArrowUpRight } from "lucide-react";
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="card-panel-bold flex h-full flex-col p-5 sm:p-7"
    >
      {/* Top row: index badge + category */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <IndexBadge number={String(index + 1).padStart(2, "0")} active size={28} />
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-text)] sm:text-[10px]">
          {item.category}
        </p>
      </div>

      {/* Title first — establishes what the case is about */}
      <h3 className="font-display mt-3 text-lg font-semibold text-[color:var(--color-ink)] sm:mt-4 sm:text-2xl">
        {item.title}
      </h3>

      {/* Metric as a highlighted box — the hook */}
      <div
        className="mt-4 rounded-2xl px-4 py-4 text-center sm:mt-5 sm:py-6"
        style={{ backgroundColor: "var(--color-accent-tint)" }}
      >
        <motion.p
          className="font-display text-3xl font-bold currency-display sm:text-5xl"
          initial={{ scale: 0.92, color: "#14150F" }}
          animate={{ scale: inView ? 1 : 0.92, color: inView ? "#029934" : "#14150F" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatedMetric metric={item.metric} active={inView} />
        </motion.p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-[11px]">
          {item.metricLabel}
        </p>
      </div>

      {/* Contexto + Estrategia — side by side even on mobile, icons instead of numbers */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-5">
        <div>
          <div className="flex items-center gap-1.5">
            <Search size={13} className="shrink-0 text-[color:var(--color-accent-dark)]" />
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-accent-text)] sm:text-[10px]">
              Contexto
            </p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-[color:var(--color-muted)] sm:text-sm">
            {item.context}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <Compass size={13} className="shrink-0 text-[color:var(--color-accent-dark)]" />
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-accent-text)] sm:text-[10px]">
              Estrategia
            </p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-[color:var(--color-muted)] sm:text-sm">
            {item.strategy}
          </p>
        </div>
      </div>

      {/* Impacto callout */}
      <div
        className="mt-4 flex items-start gap-2.5 rounded-xl border py-2.5 pl-3 pr-3 sm:mt-5 sm:gap-3 sm:py-3.5 sm:pl-4 sm:pr-4"
        style={{
          borderColor: "var(--color-border)",
          borderLeftWidth: "2px",
          borderLeftColor: "var(--color-accent)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-[color:var(--color-accent-dark)]" />
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-accent-text)] sm:text-[10px]">
            Impacto
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[color:var(--color-ink)] sm:text-sm">
            {item.impact}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
