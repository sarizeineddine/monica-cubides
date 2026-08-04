import { useEffect, useRef } from "react";

const ICONS_DESKTOP = [
  { type: "dollar", size: 32 }, { type: "dollar", size: 28 }, { type: "dollar", size: 26 },
  { type: "coin", size: 30 }, { type: "coin", size: 26 }, { type: "coin", size: 24 },
  { type: "chart", size: 34 }, { type: "chart", size: 28 }, { type: "chart", size: 30 },
  { type: "piggy", size: 32 }, { type: "piggy", size: 26 },
  { type: "wallet", size: 30 }, { type: "wallet", size: 26 },
  { type: "stack", size: 32 }, { type: "stack", size: 28 },
  { type: "bill", size: 30 }, { type: "bill", size: 26 },
  { type: "trending", size: 32 }, { type: "trending", size: 28 },
  { type: "safe", size: 30 },
  { type: "pie", size: 30 }, { type: "pie", size: 26 },
];

const ICONS_MOBILE = [
  { type: "dollar", size: 26 }, { type: "dollar", size: 22 },
  { type: "coin", size: 24 }, { type: "coin", size: 22 },
  { type: "chart", size: 26 }, { type: "chart", size: 22 },
  { type: "piggy", size: 24 }, { type: "wallet", size: 24 },
  { type: "stack", size: 26 }, { type: "trending", size: 24 },
  { type: "pie", size: 24 }, { type: "bill", size: 24 },
];

function drawIcon(ctx, type, x, y, size, color, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.translate(x, y);
  const s = size / 24;
  ctx.scale(s, s);
  ctx.beginPath();

  switch (type) {
    case "dollar":
      ctx.font = "bold 26px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("$", 0, 0); break;
    case "coin":
      ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.stroke();
      ctx.font = "bold 13px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("$", 0, 1); break;
    case "chart":
      ctx.moveTo(-10, 10); ctx.lineTo(-10, 4);
      ctx.moveTo(-4, 10); ctx.lineTo(-4, 0);
      ctx.moveTo(2, 10); ctx.lineTo(2, -4);
      ctx.moveTo(8, 10); ctx.lineTo(8, -8);
      ctx.stroke(); break;
    case "piggy":
      ctx.arc(0, 2, 9, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-3, -8); ctx.lineTo(3, -8); ctx.stroke();
      ctx.beginPath(); ctx.arc(3, 0, 1, 0, Math.PI * 2); ctx.fill(); break;
    case "wallet":
      ctx.roundRect(-11, -7, 22, 14, 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(6, 0, 1.5, 0, Math.PI * 2); ctx.fill(); break;
    case "stack":
      ctx.ellipse(0, -6, 10, 3, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 0, 10, 3, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, 6, 10, 3, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-10, -6); ctx.lineTo(-10, 6);
      ctx.moveTo(10, -6); ctx.lineTo(10, 6); ctx.stroke(); break;
    case "bill":
      ctx.roundRect(-12, -6, 24, 12, 1.5); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.stroke(); break;
    case "trending":
      ctx.moveTo(-11, 6); ctx.lineTo(-5, 0);
      ctx.lineTo(0, 3); ctx.lineTo(6, -4); ctx.lineTo(11, -8);
      ctx.stroke();
      ctx.beginPath(); ctx.moveTo(7, -8); ctx.lineTo(11, -8); ctx.lineTo(11, -4); ctx.stroke(); break;
    case "safe":
      ctx.roundRect(-11, -10, 22, 20, 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(-1, 0, 5, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-1, 0); ctx.lineTo(2, -3); ctx.stroke(); break;
    case "pie":
      ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(8, 6); ctx.stroke(); break;
    default: break;
  }
  ctx.restore();
}

export default function BackgroundIcons() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d");
    let animId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = () => window.innerWidth < 768;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const iconSet = isMobile() ? ICONS_MOBILE : ICONS_DESKTOP;
    const particles = iconSet.map((cfg) => ({
      ...cfg,
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(0.15 + Math.random() * 0.25),
      vx: (Math.random() - 0.5) * 0.1,
      opacity: 0.5 + Math.random() * 0.5,
    }));

    const getTheme = () => document.documentElement.getAttribute("data-theme") || "light";

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      const theme = getTheme();
      const color = theme === "light" ? "#03c73f" : "#8ee002";
      const baseOp = theme === "light" ? 0.12 : 0.18;

      particles.forEach((p) => {
        p.y += p.vy; p.x += p.vx;
        if (p.y < -50) { p.y = height + 50; p.x = Math.random() * width; }
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        drawIcon(ctx, p.type, p.x, p.y, p.size, color, baseOp * p.opacity);
      });

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    />
  );
}