import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, TrendingUp, ShieldCheck, Landmark } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import IndexBadge from "./IndexBadge";

const iconMap = {
  "graduation-cap": GraduationCap,
  "trending-up": TrendingUp,
  "shield-check": ShieldCheck,
  landmark: Landmark,
};

export default function ServiceCarousel({ services }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const touchStartX = useRef(null);
  const intervalRef = useRef(null);
  const total = services.length;

  const goNext = useCallback(() => setActiveIndex((prev) => (prev + 1) % total), [total]);
  const goPrev = useCallback(() => setActiveIndex((prev) => (prev - 1 + total) % total), [total]);
  const goTo = useCallback((idx) => setActiveIndex(idx), []);

  const restartAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 5500);
  }, [goNext]);

  useEffect(() => {
    restartAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [restartAutoplay]);

  const handleManual = useCallback((action) => {
    action();
    restartAutoplay();
  }, [restartAutoplay]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handleManual(goPrev);
      if (e.key === "ArrowRight") handleManual(goNext);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, handleManual]);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) { handleManual(diff > 0 ? goPrev : goNext); }
    touchStartX.current = null;
  };

  const getCardStyle = (idx) => {
    const offset = idx - activeIndex;
    let normalizedOffset = offset;
    if (offset > total / 2) normalizedOffset = offset - total;
    if (offset < -total / 2) normalizedOffset = offset + total;

    const isActive = normalizedOffset === 0;
    const abs = Math.abs(normalizedOffset);

    const spread = isMobile ? 78 : 62;
    const depth = isMobile ? -160 : -190;
    const tilt = isMobile ? -30 : -24;
    const scaleInactive = isMobile ? 0.78 : 0.85;

    return {
      transform: "translateX(" + (normalizedOffset * spread) + "%) translateZ(" + (isActive ? 0 : depth) + "px) rotateY(" + (normalizedOffset * tilt) + "deg) scale(" + (isActive ? 1 : scaleInactive) + ")",
      opacity: abs > 1 ? 0 : isActive ? 1 : 0.55,
      zIndex: isActive ? 10 : 5 - abs,
      pointerEvents: isActive ? "auto" : "none",
      filter: "none",
      transformStyle: "preserve-3d",
      willChange: "transform",
    };
  };

  return (
    <div className="relative">
      <div
        className="carousel-perspective relative mx-auto flex h-[380px] items-center justify-center sm:h-[500px]"
        style={{ perspective: isMobile ? "900px" : "1400px", transformStyle: "preserve-3d" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {services.map((service, idx) => {
          const Icon = iconMap[service.icon];
          const isActive = idx === activeIndex;
          return (
            <div
              key={service.marker}
              className="carousel-card absolute w-[250px] sm:w-[380px] md:w-[420px]"
              style={getCardStyle(idx)}
            >
              <div
                className={isActive ? "card-panel-bold flex flex-col p-4 sm:p-8" : "card-panel flex flex-col p-4 sm:p-8"}
                style={{ minHeight: isMobile ? "360px" : "400px" }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: isActive ? "var(--color-accent-tint-strong)" : "var(--color-accent-tint)",
                      border: "1px solid var(--color-border)",
                      width: isMobile ? "44px" : "52px", height: isMobile ? "44px" : "52px",
                    }}
                  >
                    <Icon size={24} className="text-[color:var(--color-accent-dark)]" />
                  </div>
                  <IndexBadge number={service.marker} active={isActive} />
                </div>

                <h3 className="font-display mt-4 text-lg font-semibold text-[color:var(--color-ink)] sm:mt-6 sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-text)]">
                  {service.subtitle}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-muted)] sm:mt-4 sm:text-base">
                  {service.description}
                </p>

                <div
                  className="mt-4 rounded-2xl px-3 py-3 sm:mt-5 sm:px-5 sm:py-4"
                  style={{ backgroundColor: "var(--color-accent-tint)", border: "1px solid var(--color-border)" }}
                >
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-[color:var(--color-accent-text)]">
                    Beneficio Clave
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-semibold text-[color:var(--color-ink)]">
                    {service.result}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 sm:mt-8 sm:gap-6">
        <button onClick={() => handleManual(goPrev)} aria-label="Servicio anterior" className="carousel-arrow">
          <ChevronLeft size={17} />
        </button>

        <div className="flex items-center gap-2">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManual(() => goTo(idx))}
              aria-label={"Ir al servicio " + (idx + 1)}
              className={"carousel-dot" + (idx === activeIndex ? " carousel-dot-active" : "")}
            />
          ))}
        </div>

        <button onClick={() => handleManual(goNext)} aria-label="Siguiente servicio" className="carousel-arrow">
          <ChevronRight size={17} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-[color:var(--color-muted)] sm:mt-6"
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
