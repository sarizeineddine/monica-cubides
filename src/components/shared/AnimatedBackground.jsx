import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(142,224,2,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(142,224,2,0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <motion.div
        className="absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(45, 209, 156, 0.2)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[20%] h-[30rem] w-[30rem] rounded-full blur-[160px]"
        style={{ backgroundColor: "rgba(142, 224, 2, 0.1)" }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[20%] h-[28rem] w-[28rem] rounded-full blur-[150px]"
        style={{ backgroundColor: "rgba(3, 199, 63, 0.15)" }}
        animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}