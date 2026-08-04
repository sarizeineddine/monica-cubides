import { useEffect, useRef, useState } from "react";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function useAnimatedNumber(target, duration = 650) {
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
      const eased = easeOutExpo(progress);
      const next = start.current + (target - start.current) * eased;
      setValue(next);
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [target, duration]);

  return value;
}