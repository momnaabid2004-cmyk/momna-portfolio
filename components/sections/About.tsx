"use client";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

const item = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }),
};

export function About() {
  const { about, certifications } = portfolio;
  return (
    <section id="about" aria-labelledby="about-title" className="band relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="About me" title={about.heading} id="about-title" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <motion.p key={i} variants={item} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} custom={i}>{p}</motion.p>
            ))}
          </div>

          <motion.dl variants={item} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} custom={1}
            className="relative self-start overflow-hidden rounded-xl2 border border-line bg-bg p-6 sm:p-7">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent2 to-mint" />
            {about.facts.map((f) => (
              <div key={f.label} className="border-b border-line py-4 first:pt-1">
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent2">{f.label}</dt>
                <dd className="mt-1 font-medium text-fg">{f.value}</dd>
              </div>
            ))}
            <div className="pt-4">
              <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent2">Certifications</dt>
              <dd className="mt-1 font-medium text-fg">{certifications.length} completed, incl. Agentic AI &amp; Python ML</dd>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
