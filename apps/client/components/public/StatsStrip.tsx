"use client";
import { cn } from "@kwasu-portal/utils-others";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 25000, display: "25,000+", label: "Students Enrolled" },
  { value: 14, display: "14", label: "Faculties" },
  { value: 120, display: "120+", label: "Programmes" },
  { value: 800, display: "800+", label: "Academic Staff" },
  { value: 16, display: "16", label: "Years of Excellence" },
];

// count‑up hook (unchanged)
function useCountUp(target: number, active: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatItem({
  value,
  display,
  label,
  active,
}: (typeof STATS)[0] & { active: boolean }) {
  const count = useCountUp(value, active);
  const formatted = active
    ? display.includes("+")
      ? count.toLocaleString() + "+"
      : count.toLocaleString()
    : "0";

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 py-9 px-6",
        "border-r border-[rgba(13,40,24,0.15)] last:border-r-0",
        "hover:bg-green-900/6 transition-colors duration-200 cursor-default",
        "max-md:snap-start max-md:shrink-0 max-md:min-w-35",
      )}
    >
      <span className="font-serif text-[clamp(26px,3vw,40px)] font-bold text-green-900 leading-none tabular-nums">
        {formatted}
      </span>
      <span className="font-sans text-[11px] font-bold text-green-800 tracking-[0.12em] uppercase">
        {label}
      </span>
    </div>
  );
}

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e?.isIntersecting && setActive(true),
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "bg-gold-500 flex",
        "overflow-x-auto md:overflow-visible snap-x snap-mandatory",
        "md:justify-center",
        "items-stretch",
      )}
    >
      {STATS.map((s, i) => (
        <StatItem key={s.label + i} {...s} active={active} />
      ))}
    </div>
  );
}
