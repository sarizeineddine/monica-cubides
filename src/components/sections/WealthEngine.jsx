import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import SectionHeader from "@/components/shared/SectionHeader";
import WealthChart from "@/components/charts/WealthChart";

const currency = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
const currencyCompact = new Intl.NumberFormat("es-CO", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 1 });

function futureValue(monthly, monthlyRate, months) {
  if (monthlyRate === 0) return monthly * months;
  return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

function ProjectionCard({ label, value, featured }) {
  const animated = useAnimatedNumber(value, 600);
  return (
    <motion.div variants={fadeUp} className="card-panel-bold relative overflow-hidden px-4 py-4">
      {featured && (
        <span
          className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: "var(--color-accent-tint)", color: "var(--color-accent-text)" }}
        >
          Meta
        </span>
      )}
      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)]">A {label}</p>
      <p className="mt-1.5 font-display text-lg font-semibold text-[color:var(--color-ink)] sm:text-xl currency-display">
        {currency.format(Math.round(animated))}
      </p>
    </motion.div>
  );
}

export default function WealthEngine() {
  const { wealthEngine: config } = portfolioData;
  const [daily, setDaily] = useState(config.sliderDefault);

  const monthlyRate = useMemo(() => Math.pow(1 + config.annualRate, 1 / 12) - 1, [config.annualRate]);
  const monthly = daily * 30;

  const projections = useMemo(
    () => config.periods.map((period) => ({
      months: period.months,
      label: period.label,
      value: futureValue(monthly, monthlyRate, period.months),
    })),
    [monthly, monthlyRate, config.periods]
  );

  const maxReference = useMemo(() => futureValue(config.sliderMax * 30, monthlyRate, 120), [config.sliderMax, monthlyRate]);
  const progressPercent = ((daily - config.sliderMin) / (config.sliderMax - config.sliderMin)) * 100;

  return (
    <section id="proyecciones" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeader eyebrow="Simulador" title={config.title} subtitle={config.subtitle} />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-1 items-start gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="card-panel-bold flex flex-col items-center p-4 sm:p-7">
            <div className="mb-4 flex w-full items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                Proyeccion Patrimonial
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-accent-text)]">
                {config.rateLabel}
              </p>
            </div>
            <div className="aspect-square w-full max-w-[280px] sm:max-w-[320px]">
              <WealthChart monthly={monthly} monthlyRate={monthlyRate} maxMonths={120} maxRef={maxReference} />
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            <motion.div variants={fadeUp} className="card-panel-bold p-4 sm:p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                Aporte diario
              </p>
              <p className="mt-1.5 font-display text-xl font-semibold text-[color:var(--color-accent-text)] sm:text-2xl currency-display">
                {currency.format(daily)}
              </p>
              <p className="mt-0.5 text-[10px] text-[color:var(--color-muted)] currency-display">
                {currency.format(monthly)} / mes
              </p>

              <div className="mt-4">
                <input
                  type="range"
                  className="range-accent"
                  min={config.sliderMin}
                  max={config.sliderMax}
                  step={config.sliderStep}
                  value={daily}
                  onChange={(e) => setDaily(Number(e.target.value))}
                  aria-label="Selecciona tu aporte diario"
                  style={{ "--range-progress": progressPercent + "%" }}
                />
                <div className="mt-1.5 flex justify-between text-[9px] font-bold uppercase tracking-widest text-[color:var(--color-muted)] currency-display">
                  <span>{currencyCompact.format(config.sliderMin)}</span>
                  <span>{currencyCompact.format(config.sliderMax)}</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {projections.map((p, i) => (
                <ProjectionCard key={p.label} label={p.label} value={p.value} featured={i === projections.length - 1} />
              ))}
            </div>

            <p className="text-[9px] leading-relaxed text-[color:var(--color-muted)] uppercase tracking-wider" style={{ opacity: 0.75 }}>
              {config.disclaimer}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}