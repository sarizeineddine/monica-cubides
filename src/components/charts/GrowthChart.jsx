import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
} from "recharts";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});
const currencyCompact = new Intl.NumberFormat("es-CO", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

export function futureValue(monthly, monthlyRate, months) {
  if (monthlyRate === 0) return monthly * months;
  return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

export function niceCeil(value) {
  if (value <= 0) return 0;
  const exponent = Math.floor(Math.log10(value));
  const magnitude = Math.pow(10, exponent);
  const fraction = value / magnitude;
  let niceFraction;
  if (fraction <= 1) niceFraction = 1;
  else if (fraction <= 2) niceFraction = 2;
  else if (fraction <= 5) niceFraction = 5;
  else niceFraction = 10;
  return niceFraction * magnitude;
}

const POINT_COUNT = 12;

function CustomTooltip({ active, payload, withPlanLabel, noPlanLabel }) {
  if (!active || !payload || !payload.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;

  return (
    <div
      className="pointer-events-none rounded-xl border px-4 py-3 text-xs shadow-lg"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[color:var(--color-accent-text)]">
        {point.tickLabel}
      </p>
      <p className="font-display font-semibold currency-display" style={{ color: "var(--color-accent-dark)" }}>
        {withPlanLabel}: {currency.format(Math.round(point.withPlan))}
      </p>
      <p className="mt-0.5 font-display font-medium currency-display" style={{ color: "var(--color-muted)" }}>
        {noPlanLabel}: {currency.format(Math.round(point.noPlan))}
      </p>
    </div>
  );
}

export default function GrowthChart({
  monthly,
  monthlyRate,
  noPlanMonthlyRate,
  maxMonths = 120,
  domainMax,
  withPlanLabel,
  noPlanLabel,
  markers = [],
}) {
  const markerMonths = useMemo(() => markers.map((m) => m.months), [markers]);

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= POINT_COUNT; i++) {
      const months = Math.round((maxMonths / POINT_COUNT) * i);
      const marker = markers.find((m) => m.months === months);
      pts.push({
        months,
        tickLabel: months === 0 ? "Hoy" : marker ? marker.label : `Año ${Math.round(months / 12)}`,
        withPlan: futureValue(monthly, monthlyRate, months),
        noPlan: futureValue(monthly, noPlanMonthlyRate ?? 0, months),
      });
    }
    markers.forEach((m) => {
      if (!pts.find((p) => p.months === m.months)) {
        pts.push({
          months: m.months,
          tickLabel: m.label,
          withPlan: futureValue(monthly, monthlyRate, m.months),
          noPlan: monthly * m.months,
        });
      }
    });
    return pts.sort((a, b) => a.months - b.months);
  }, [monthly, monthlyRate, maxMonths, markers, noPlanMonthlyRate]);

  const xTicks = useMemo(() => [0, ...markerMonths], [markerMonths]);

  const xTickFormatter = (months) => {
    if (months === 0) return "Hoy";
    const marker = markers.find((m) => m.months === months);
    return marker ? marker.label : `${months}m`;
  };

  const niceMax = useMemo(() => niceCeil(domainMax), [domainMax]);
  const yTicks = useMemo(() => {
    const stepCount = 4;
    const step = niceMax / stepCount;
    return Array.from({ length: stepCount + 1 }, (_, i) => Math.round(step * i));
  }, [niceMax]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="chart-no-outline mx-auto aspect-[4/3] w-full max-w-md sm:max-w-lg select-none"
      style={{ touchAction: "pan-y" }}
    >
      <style>{`
        .chart-no-outline *,
        .chart-no-outline svg,
        .chart-no-outline path,
        .recharts-wrapper,
        .recharts-surface,
        .recharts-active-dot {
          outline: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        .chart-no-outline *:focus,
        .chart-no-outline *:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={points}
          margin={{ top: 24, right: 8, left: 0, bottom: 0 }}
          tabIndex={-1}
          style={{ outline: "none" }}
        >
          <defs>
            <linearGradient id="withPlanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.32} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="noPlanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-muted)" stopOpacity={0.18} />
              <stop offset="100%" stopColor="var(--color-muted)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />

          <XAxis
            dataKey="months"
            type="number"
            domain={[0, maxMonths]}
            ticks={xTicks}
            tickFormatter={xTickFormatter}
            tick={{ fill: "var(--color-muted)", fontSize: 11, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, niceMax]}
            ticks={yTicks}
            tick={{ fill: "var(--color-muted)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => currencyCompact.format(v)}
            width={42}
          />

          <Tooltip
            cursor={{ stroke: "var(--color-accent-dark)", strokeWidth: 1.5, strokeDasharray: "4 4" }}
            content={<CustomTooltip withPlanLabel={withPlanLabel} noPlanLabel={noPlanLabel} />}
          />

          <Area
            type="monotone"
            dataKey="noPlan"
            stroke="var(--color-muted)"
            strokeWidth={2}
            strokeDasharray="4 3"
            fill="url(#noPlanGradient)"
            isAnimationActive={false}
            activeDot={{ r: 5, fill: "#6b7280", stroke: "var(--color-surface)", strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="withPlan"
            stroke="var(--color-accent-dark)"
            strokeWidth={3}
            fill="url(#withPlanGradient)"
            isAnimationActive={false}
            activeDot={{ r: 6, fill: "var(--color-accent-dark)", stroke: "var(--color-surface)", strokeWidth: 2 }}
          />

          {markers.map((m) => {
            const pt = points.find((p) => p.months === m.months);
            if (!pt) return null;
            return (
              <ReferenceDot
                key={m.months}
                x={m.months}
                y={pt.withPlan}
                r={4.5}
                fill="var(--color-accent)"
                stroke="var(--color-surface)"
                strokeWidth={2}
                isFront
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
