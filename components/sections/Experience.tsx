"use client";
/**
 * Experience + Education timeline.
 * GSAP ScrollTrigger: the vertical line draws with scroll (scrub) and each
 * entry slides in. Framer Motion is only used for the certifications grid.
 */
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { portfolio, type TimelineItem } from "@/data/portfolio";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tl-progress", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
      });
      root.current!.querySelectorAll<HTMLElement>(".tl-item").forEach((el) => {
        gsap.from(el, {
          x: -30, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="rounded-xl2 border border-line border-t-[3px] border-t-accent bg-bg p-6 sm:p-8">
      <h3 className="mb-8 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent2">{title}</h3>
      <ol className="relative ml-3 space-y-10 border-l border-line/0 pl-8">
        <span aria-hidden="true" className="absolute left-0 top-1 h-full w-px bg-line" />
        <span aria-hidden="true" className="tl-progress absolute left-0 top-1 h-full w-px origin-top bg-accent" />
        {items.map((it) => (
          <li key={it.role + it.org} className="tl-item relative">
            <span aria-hidden="true" className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{it.period}</p>
            <h4 className="mt-2 text-lg font-bold sm:text-xl">{it.role}</h4>
            <p className="text-sm font-medium text-fg/80">{it.org}{it.meta && <span className="text-muted"> · {it.meta}</span>}</p>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">{it.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Experience() {
  const { experience, education, certifications } = portfolio;
  return (
    <section id="experience" aria-labelledby="experience-title" className="band relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Experience & Education" title="Where I've *learned and built.*" id="experience-title" />
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Timeline title="Experience" items={experience} />
          <Timeline title="Education" items={education} />
        </div>

        <div className="mt-14">
          <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent2">Certifications</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c, i) => (
              <motion.li key={c} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 rounded-xl2 border border-line bg-bg p-4 text-sm">
                <Icon name="award" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{c}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
