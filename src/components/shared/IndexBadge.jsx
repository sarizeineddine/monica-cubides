import { cn } from "@/utils/cn";

export default function IndexBadge({ number, active = false, size, className }) {
  const style = size
    ? { "--index-badge-size": size + "px", "--index-badge-font": (size * 0.022).toFixed(3) + "rem" }
    : undefined;

  return (
    <span className={cn("index-badge", active && "index-badge-active", className)} style={style}>
      {number}
    </span>
  );
}