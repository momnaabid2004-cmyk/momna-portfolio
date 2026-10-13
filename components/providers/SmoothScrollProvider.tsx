"use client";
/**
 * Lenis smooth scrolling, synced with GSAP ScrollTrigger.
 *
 *  - Lenis drives the scroll; every Lenis scroll event updates ScrollTrigger.
 *  - Lenis is ticked by gsap.ticker, so GSAP animations and scrolling share
 *    one requestAnimationFrame loop (no jitter between them).
 *  - Disabled entirely when the user prefers reduced motion.
 */
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollTo = (target: string | number | HTMLElement, opts?: { offset?: number }) => void;
const ScrollCtx = createContext<{ lenis: Lenis | null; scrollTo: ScrollTo }>({ lenis: null, scrollTo: () => {} });

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafCb = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const instance = new Lenis({
      lerp: 0.1,           // smoothness (lower = smoother/slower)
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    // 1) Lenis -> ScrollTrigger
    instance.on("scroll", ScrollTrigger.update);

    // 2) GSAP ticker -> Lenis (gsap time is in seconds, Lenis wants ms)
    rafCb.current = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(rafCb.current);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);
    ScrollTrigger.refresh();

    return () => {
      if (rafCb.current) gsap.ticker.remove(rafCb.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const scrollTo: ScrollTo = (target, opts = {}) => {
    const offset = opts.offset ?? -72; // leave room for the sticky navbar
    if (lenis) {
      // force: still scroll if Lenis was paused (e.g. the mobile menu was open)
      lenis.scrollTo(target, { offset, duration: 1.2, force: true });
      return;
    }
    // Fallback (reduced motion): native jump
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (typeof el === "number") window.scrollTo({ top: el });
    else if (el instanceof HTMLElement) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
  };

  return <ScrollCtx.Provider value={{ lenis, scrollTo }}>{children}</ScrollCtx.Provider>;
}

export const useSmoothScroll = () => useContext(ScrollCtx);
