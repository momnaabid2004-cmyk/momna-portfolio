"use client";
/**
 * HERO
 *  - greeting + a typed line that cycles through person.roles
 *  - stats row (CountUp)
 *  - right side: an animated "agent workflow" card instead of a photo
 *  - Framer Motion fade-ups after the preloader; GSAP scroll parallax on the content
 */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { gsap } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }),
};

/** Types each role, waits, deletes it, moves to the next. */
function useTyped(lines: string[], run: boolean, reduced: boolean) {
  const [text, setText] = useState(reduced ? lines[0] : "");
  useEffect(() => {
    if (!run || reduced) { setText(lines[0]); return; }
    let line = 0, i = 0, deleting = false, id = 0;
    const tick = () => {
      const full = lines[line];
      i += deleting ? -1 : 1;
      setText(full.slice(0, i));
      let wait = deleting ? 28 : 55;
      if (!deleting && i === full.length) { deleting = true; wait = 2200; }
      else if (deleting && i === 0) { deleting = false; line = (line + 1) % lines.length; wait = 350; }
      id = window.setTimeout(tick, wait);
    };
    id = window.setTimeout(tick, 600);
    return () => window.clearTimeout(id);
  }, [lines, run, reduced]);
  return text;
}

const flow = [
  { icon: "IN", title: "Customer message", sub: "“I'd like to book a table for 4”", status: "received" },
  { icon: "AI", title: "Reservation agent", sub: "n8n · RAG · Supabase vectors", status: "running", hot: true },
  { icon: "✓", title: "Google Calendar + Sheets", sub: "Booking synced, customer verified", status: "done" },
];

function WorkflowCard({ ready }: { ready: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-mint/50 blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 30, rotate: 0 }} animate={ready ? { opacity: 1, y: 0, rotate: -1.5 } : {}}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[1.4rem] bg-navy p-5 text-[#e8f3f1] shadow-[0_40px_80px_-30px_rgb(var(--c-navy)/0.6)] sm:p-6">
        <div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="ml-auto font-mono text-[11px] text-mint/80">agent-workflow.json</span>
        </div>
        <ol className="space-y-0">
          {flow.map((n, i) => (
            <li key={n.title}>
              {i > 0 && <span aria-hidden="true" className="ml-[30px] block h-3 border-l-2 border-dashed border-mint/40" />}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={ready ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.25, duration: 0.6 }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-3 text-sm">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-xs font-extrabold ${n.hot ? "bg-accent text-white" : "bg-mint text-navy"}`}>{n.icon}</span>
                <span className="min-w-0">
                  <span className="block font-medium text-white">{n.title}</span>
                  <span className="block truncate text-xs text-mint/80">{n.sub}</span>
                </span>
                <span className="ml-auto hidden shrink-0 items-center gap-1.5 text-[11px] text-mint sm:inline-flex">
                  <span className={`h-1.5 w-1.5 rounded-full ${n.hot ? "animate-pulse bg-accent" : "bg-mint"}`} />{n.status}
                </span>
              </motion.div>
            </li>
          ))}
        </ol>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.7, duration: 0.6 }}
        className="absolute -bottom-16 left-2 rounded-2xl border border-line bg-surface px-4 py-3 text-xs text-muted shadow-card sm:-left-6">
        <span className="block font-display text-sm font-bold text-fg">59 automated tests</span>
        AI Shopping Assistant · Google ADK
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { person, about } = portfolio;
  const reduced = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const [ready, setReady] = useState(false);
  const typed = useTyped(person.roles, ready, reduced);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Wait for the preloader, then play the intro.
  useEffect(() => onIntroDone(() => setReady(true)), []);

  // GSAP: gentle scroll parallax on the content
  useEffect(() => {
    if (!ready || reduced || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -8, opacity: 0.4, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [ready, reduced]);

  return (
    <section id="top" ref={sectionRef} aria-label="Introduction" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* background layers */}
      <div aria-hidden="true" className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black_10%,transparent_65%)]" />
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-mint/60 blur-[120px]" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-40 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />

      <div ref={contentRef} className="container relative z-10 grid items-center gap-16 pb-24 pt-28 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-20">
        <div>
          <motion.p variants={fadeUp} initial="hidden" animate={ready ? "show" : "hidden"} custom={0}
            className="inline-flex flex-wrap items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent2 sm:text-xs">
            {person.available && <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>}
            {person.availabilityText}
          </motion.p>

          <motion.h1 variants={fadeUp} initial="hidden" animate={ready ? "show" : "hidden"} custom={1}
            className="mt-6 text-display-xl font-extrabold" aria-label={`Hi, I'm ${person.name}. ${person.roles[0]}`}>
            <span aria-hidden="true">Hi, I&apos;m {person.name}.</span>
            {/* fixed height so the layout does not jump while typing */}
            <span aria-hidden="true" className="block min-h-[2.2em] text-accent">
              {typed}<span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-pulse bg-accent motion-reduce:animate-none" />
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate={ready ? "show" : "hidden"} custom={2}
            className="mt-2 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {person.intro}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate={ready ? "show" : "hidden"} custom={3} className="mt-9 flex flex-wrap gap-3">
            <MagneticButton href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("#projects"); }}>
              View my work <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href={person.cvUrl} variant="ghost" download ariaLabel="Download CV (PDF)">
              <Icon name="download" className="h-4 w-4" /> Download CV
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>
              <Icon name="mail" className="h-4 w-4" /> Contact
            </MagneticButton>
          </motion.div>

          <motion.dl variants={fadeUp} initial="hidden" animate={ready ? "show" : "hidden"} custom={4}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
            {about.stats.map((s) => (
              <div key={s.label} className="min-w-[5.5rem]">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-extrabold sm:text-3xl"><CountUp value={s.value} /><span className="text-accent">{s.suffix}</span></dd>
                <p aria-hidden="true" className="mt-1 max-w-[9rem] text-xs leading-snug text-muted">{s.label}</p>
              </div>
            ))}
          </motion.dl>
        </div>

        <WorkflowCard ready={ready} />
      </div>
    </section>
  );
}
