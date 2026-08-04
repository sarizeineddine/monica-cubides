import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export default function TiltCertificate() {
  const ref = useRef(null);
  const { certificate, skandiaLogo } = portfolioData.credentials;
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    setCanTilt(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springRX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 18 });

  const glareBackground = useTransform([glareX, glareY], (latest) =>
    `radial-gradient(circle at ${latest[0]}% ${latest[1]}%, rgba(var(--color-accent-glow-rgb),0.22), transparent 55%)`
  );

  const handleMove = (e) => {
    if (!canTilt) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 6);
    rotateX.set((0.5 - py) * 6);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: springRX, rotateY: springRY, transformStyle: "preserve-3d" }}
        className="card-panel-bold relative overflow-hidden px-5 py-7 sm:px-10 sm:py-14"
      >
        {canTilt ? (
          <motion.div aria-hidden style={{ background: glareBackground }} className="pointer-events-none absolute inset-0" />
        ) : (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 30%, rgba(var(--color-accent-glow-rgb),0.16), transparent 60%)" }}
          />
        )}

        <div
          className="absolute inset-x-8 top-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(var(--color-accent-glow-rgb),0.5), transparent)" }}
        />
        <div
          className="absolute inset-x-8 bottom-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(var(--color-accent-glow-rgb),0.5), transparent)" }}
        />

        <div className="relative flex flex-col items-center text-center">
          <div
            className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border p-1.5 sm:mb-5 sm:h-20 sm:w-20 sm:p-2"
            style={{ borderColor: "rgba(var(--color-accent-glow-rgb),0.35)", backgroundColor: "rgba(var(--color-accent-glow-rgb),0.08)" }}
          >
            <img
              src={skandiaLogo}
              alt="Skandia Colombia"
              className="h-full w-full object-contain"
              onError={(e) => {
                e.target.outerHTML = '<div style="font-size:0.55rem;color:var(--color-accent-text);text-align:center;font-weight:700;letter-spacing:0.1em;line-height:1.2;">SKANDIA<br/>COLOMBIA</div>';
              }}
            />
          </div>

          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-accent-text)]">
            Certificado de Reconocimiento
          </p>
          <h3 className="font-display mt-2.5 max-w-md text-balance text-base font-semibold text-[color:var(--color-ink)] sm:mt-4 sm:text-2xl md:text-3xl">
            {certificate.awardTitle}
          </h3>

          <p className="mt-4 text-[11px] uppercase tracking-wide text-[color:var(--color-muted)] sm:mt-6 sm:text-xs">Otorgado a</p>
          <p className="font-display mt-1 text-lg sm:text-xl font-semibold text-[color:var(--color-accent-text)]">
            {certificate.issuedTo}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-1.5 border-t pt-4 sm:mt-8 sm:gap-2 sm:pt-6 sm:grid-cols-2" style={{ borderColor: "var(--color-border)" }}>
            {certificate.issuedBy.map((person) => (
              <p key={person} className="text-[11px] sm:text-xs leading-relaxed text-[color:var(--color-muted)]">
                {person}
              </p>
            ))}
          </div>

          <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-muted)] sm:mt-6 sm:text-[11px]">
            {certificate.date}
          </p>
        </div>
      </motion.div>
    </div>
  );
}