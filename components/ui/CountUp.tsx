"use client";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `value` when scrolled into view (keeps decimals). */
export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const target = parseFloat(value);
  const decimals = (value.split(".")[1] || "").length;
  const [display, setDisplay] = useState(isNaN(target) ? value : (0).toFixed(decimals));

  useEffect(() => {
    if (!inView || isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDisplay(target.toFixed(decimals)); return; }
    const controls = animate(0, target, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setDisplay(v.toFixed(decimals)) });
    return () => controls.stop();
  }, [inView, target, decimals, duration]);

  return <span ref={ref} className="tabular-nums">{display}</span>;
}
