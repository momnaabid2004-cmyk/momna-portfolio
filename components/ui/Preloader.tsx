"use client";
/**
 * Short intro: initials + counter, then the panel slides up.
 * ~1.4s, shown once per browser session, skipped with reduced motion.
 */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { markIntroDone } from "@/lib/intro";

export function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem("intro-seen") === "1"; } catch { /* ignore */ }
    if (reduced || seen) { setShow(false); markIntroDone(); return; }

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1100);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(tick);
    try { sessionStorage.setItem("intro-seen", "1"); } catch { /* ignore */ }
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => { if (!show) document.documentElement.style.overflow = ""; }, [show]);

  return (
    <AnimatePresence onExitComplete={markIntroDone}>
      {show && (
        <motion.div key="preloader" role="status" aria-label="Loading"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-navy text-bg"
          exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl font-extrabold tracking-tight sm:text-7xl">
            {portfolio.person.initials}<span className="text-accent">.</span>
          </motion.div>
          <div className="mt-6 h-px w-48 overflow-hidden bg-white/15">
            <div className="h-full bg-accent" style={{ width: `${count}%` }} />
          </div>
          <div className="mt-3 font-sans text-xs tabular-nums tracking-[0.3em] text-white/60">{String(count).padStart(3, "0")}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
