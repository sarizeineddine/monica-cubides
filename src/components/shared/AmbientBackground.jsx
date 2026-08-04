export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }} aria-hidden>
      <div className="absolute inset-0" style={{ backgroundColor: "var(--color-bg)" }} />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, black 25%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, black 25%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(75% 65% at 0% 0%, var(--color-bg-tint) 0%, var(--color-bg-tint) 45%, transparent 90%),
            radial-gradient(75% 65% at 100% 0%, var(--color-bg-tint-2) 0%, var(--color-bg-tint-2) 45%, transparent 90%),
            radial-gradient(75% 65% at 0% 100%, var(--color-bg-tint-2) 0%, var(--color-bg-tint-2) 45%, transparent 90%),
            radial-gradient(75% 65% at 100% 100%, var(--color-bg-tint) 0%, var(--color-bg-tint) 45%, transparent 90%)
          `,
        }}
      />

      <div
        className="absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ backgroundColor: "rgba(var(--color-accent-glow-rgb), 0.14)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[-8%] h-[26rem] w-[26rem] rounded-full blur-[130px]"
        style={{ backgroundColor: "rgba(var(--color-accent-glow-rgb), 0.10)" }}
      />
    </div>
  );
}