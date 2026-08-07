import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";

function futureValue(monthly, monthlyRate, months) {
  if (monthlyRate === 0) return monthly * months;
  return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

const currencyCompact = new Intl.NumberFormat("es-CO", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

const DRAW_DURATION = 1.2;
const EASE = [0.16, 1, 0.3, 1];
const updateTransition = { duration: 0.6, ease: EASE };

export default function WealthChart({ monthly, monthlyRate, maxMonths = 120, maxRef }) {
  const [hasDrawn, setHasDrawn] = useState(false);

  const points = useMemo(() => {
    const steps = 40;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const month = (maxMonths / steps) * i;
      const val = futureValue(monthly, monthlyRate, month);
      const x = (i / steps) * 340 + 20;
      const y = 200 - (val / maxRef) * 175;
      pts.push({ x, y: Math.max(y, 15), val });
    }
    return pts;
  }, [monthly, monthlyRate, maxMonths, maxRef]);

  const linePath = useMemo(() => {
    return points
      .map((p, i) => {
        if (i === 0) return "M " + p.x + " " + p.y;
        const prev = points[i - 1];
        const cpx = prev.x + (p.x - prev.x) * 0.5;
        return "C " + cpx + " " + prev.y + ", " + cpx + " " + p.y + ", " + p.x + " " + p.y;
      })
      .join(" ");
  }, [points]);

  const areaPath = useMemo(() => {
    return linePath + " L " + points[points.length - 1].x + " 210 L " + points[0].x + " 210 Z";
  }, [linePath, points]);

  useEffect(() => {
    const timer = setTimeout(() => setHasDrawn(true), DRAW_DURATION * 1000);
    return () => clearTimeout(timer);
  }, []);

  const yTicks = [
    { y: 25, value: maxRef },
    { y: 112, value: maxRef / 2 },
    { y: 200, value: 0 },
  ];

  const xLabels = [
    { x: 20, label: "Hoy" },
    { x: 105, label: "3A" },
    { x: 190, label: "5A" },
    { x: 275, label: "7A" },
    { x: 360, label: "10A" },
  ];

  const finalPoint = points[points.length - 1];

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 380 240" className="w-full" style={{ height: "220px", overflow: "visible" }}>
        <defs>
          <linearGradient id="wealthFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.28" />
            <stop offset="55%" stopColor="var(--color-accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wealthLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-dark)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
          <filter id="chartGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {yTicks.map((tick) => (
          <line
            key={tick.y}
            x1="20" x2="360" y1={tick.y} y2={tick.y}
            stroke="var(--color-border)"
            strokeWidth="1"
          />
        ))}

        <line
          x1={points[0].x} x2={points[0].x} y1="15" y2="200"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.6"
        />

        {yTicks.slice(0, 2).map((tick) => (
          <text
            key={"label-" + tick.y}
            x="14" y={tick.y + 3}
            fill="var(--color-muted)"
            fontSize="8"
            textAnchor="end"
            fontFamily="var(--font-body)"
            fontWeight="600"
          >
            {currencyCompact.format(tick.value)}
          </text>
        ))}

        <motion.path
          d={areaPath}
          fill="url(#wealthFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, d: areaPath }}
          transition={hasDrawn ? updateTransition : { duration: DRAW_DURATION, delay: 0.15, ease: EASE }}
        />

        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#wealthLine)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#chartGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, d: linePath }}
          transition={hasDrawn ? updateTransition : { duration: DRAW_DURATION, ease: EASE }}
        />

        <motion.circle
          cx={finalPoint.x} cy={finalPoint.y} r="5.5"
          fill="var(--color-accent)"
          stroke="var(--color-surface)"
          strokeWidth="2.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, cx: finalPoint.x, cy: finalPoint.y }}
          transition={hasDrawn ? updateTransition : { duration: 0.5, delay: DRAW_DURATION - 0.1, ease: EASE }}
        />

        <motion.circle
          cx={finalPoint.x} cy={finalPoint.y} r="5.5"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          opacity="0.4"
          animate={{ cx: finalPoint.x, cy: finalPoint.y }}
          transition={updateTransition}
        >
          <animate attributeName="r" from="5.5" to="14" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.4" to="0" dur="2.6s" repeatCount="indefinite" />
        </motion.circle>

        {xLabels.map((label) => (
          <text
            key={label.x}
            x={label.x} y="230"
            fill="var(--color-muted)"
            fontSize="9"
            textAnchor="middle"
            fontFamily="var(--font-body)"
            fontWeight="700"
            style={{ letterSpacing: "0.1em" }}
          >
            {label.label}
          </text>
        ))}
      </svg>
    </div>
  );
}