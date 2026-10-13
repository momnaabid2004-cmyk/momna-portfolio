"use client";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

// one palette colour per skill group
const tones = ["bg-accent text-white", "bg-accent2 text-white", "bg-navy text-white", "bg-mint text-navy"];

export function Skills() {
  const { skills } = portfolio;
  const all = skills.flatMap((s) => s.items);

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Skills" title="Tools I use to *ship.*" id="skills-title" />
      </div>

      {/* marquee (CSS animation, pauses on hover, static with reduced motion) */}
      <div className="group relative mt-12 border-y border-line bg-surface/60 py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-bold text-fg/80 sm:text-4xl">
              {s}<span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {skills.map((group, gi) => (
          <motion.article key={group.category}
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: gi * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="card group/card p-6 transition-shadow duration-500 hover:shadow-glow">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[gi % tones.length]}`}>
              <Icon name={group.icon} />
            </div>
            <h3 className="mt-5 text-lg font-bold">{group.category}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((s, i) => (
                <motion.li key={s} className="chip"
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: gi * 0.1 + i * 0.04 + 0.2, duration: 0.4 }}>
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
