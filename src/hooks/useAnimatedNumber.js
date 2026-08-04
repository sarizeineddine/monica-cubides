import { useEffect, useRef, useState } from "react";

// Cubic-bezier evaluator matching --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1)
function cubicBezier(x1, y1, x2, y2) {
  const A = (a1, a2) => 1.0 - 3.0 * a2 + 3.0 * a1;
  const B = (a1, a2) => 3.0 * a2 - 6.0 * a1;
  const C = (a1) => 3.0 * a1;

  const sampleCurveX = (t) => ((A(x1, x2) * t + B(x1, x2)) * t + C(x1)) * t;
  const sampleCurveY = (t) => ((A(y1, y2) * t + B(y1, y2)) * t + C(y1)) * t;
  const sampleCurveDerivativeX = (t) => (3.0 * A(x1, x2) * t + 2.0 * B(x1, x2)) * t + C(x1);

  const solveCurveX = (x) => {
    let t2 = x;
    for (let i = 0; i < 8; i++) {
      const x2Val = sampleCurveX(t2) - x;
      if (Math.abs(x2Val) < 1e-6) return t2;
      const d2 = sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < 1e-6) break;
      t2 -= x2Val / d2;
    }
    let lo = 0, hi = 1;
    t2 = x;
    while (lo < hi) {
      const x2Val = sampleCurveX(t2);
      if (Math.abs(x2Val - x) < 1e-6) return t2;
      if (x > x2Val) lo = t2; else hi = t2;
      t2 = (hi - lo) * 0.5 + lo;
    }
    return t2;
  };

  return (t) => sampleCurveY(solveCurveX(t));
}

const easeCinematic = cubicBezier(0.16, 1, 0.3, 1);

export function useAnimatedNumber(target, duration = 900) {
  const [value, setValue] = useState(target);
  const frame = useRef(null);
  const start = useRef(target);
  const startTime = useRef(null);

  useEffect(() => {
    start.current = value;
    startTime.current = null;

    const step = (timestamp) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeCinematic(progress);
      const next = start.current + (target - start.current) * eased;
      setValue(next);
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [target, duration]);

  return value;
}
