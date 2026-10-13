"use client";
/**
 * Sticky navbar: blurred background after scrolling, pill-style links with an
 * animated active pill, and an accessible mobile menu (below lg).
 */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { portfolio } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const ids = portfolio.nav.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const { scrollTo, lenis } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock scroll while the mobile menu is open
  useEffect(() => {
    if (open) lenis?.stop(); else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    lenis?.start(); // the open menu paused scrolling; resume before moving
    scrollTo(`#${id}`);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-smooth ${
      scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <nav aria-label="Main" className="container flex h-[72px] items-center justify-between gap-4">
        <a href="#top" onClick={(e) => go(e, "top")} className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight" aria-label={`${portfolio.person.name}, back to top`}>
          <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-navy text-[13px] text-white">
            M<span className="text-accent">A</span>
          </span>
          {portfolio.person.firstName}<span className="-ml-2.5 text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface/80 p-1.5 shadow-card backdrop-blur lg:flex">
          {portfolio.nav.map((item) => (
            <li key={item.id} className="relative">
              {active === item.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-accent/[0.12] ring-1 ring-accent/35"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <a href={`#${item.id}`} onClick={(e) => go(e, item.id)} aria-current={active === item.id ? "true" : undefined}
                className={`relative block rounded-full px-4 py-2 text-[15px] transition-colors xl:px-5 ${active === item.id ? "font-medium text-fg" : "text-muted hover:text-fg"}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={`#contact`} onClick={(e) => go(e, "contact")}
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgb(var(--c-accent)/0.7)] transition hover:brightness-110 sm:inline-block">
            Hire me
          </a>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-fg transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-fg transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-line bg-bg/95 backdrop-blur-xl lg:hidden">
            <ul className="container flex flex-col py-4">
              {portfolio.nav.map((item, i) => (
                <motion.li key={item.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={`#${item.id}`} onClick={(e) => go(e, item.id)}
                    className={`flex items-center justify-between border-b border-line/40 py-4 font-display text-2xl font-bold ${active === item.id ? "text-accent" : "text-fg"}`}>
                    {item.label}<span className="font-mono text-sm text-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li className="pt-6 sm:hidden">
                <a href="#contact" onClick={(e) => go(e, "contact")} className="flex justify-center rounded-full bg-accent py-3.5 font-semibold text-white">Hire me</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
