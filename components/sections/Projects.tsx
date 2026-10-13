"use client";
/**
 * PROJECTS: cards with a subtle 3D tilt on hover (Framer Motion),
 * and a detail modal.
 */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useCallback, useState, type MouseEvent } from "react";
import { portfolio, type Project } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ProjectModal } from "./ProjectModal";
import { ProjectCover } from "./ProjectCover";

function ProjectCard({ project, index, onOpen, wide }: { project: Project; index: number; onOpen: (p: Project) => void; wide: boolean }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 150, damping: 18 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: (index % 2) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onMouseMove={onMove} onMouseLeave={reset}
      className={`card corner group flex flex-col overflow-hidden transition-shadow duration-500 hover:shadow-glow ${wide ? "md:col-span-2 lg:flex-row" : ""}`}
      aria-labelledby={`project-${project.slug}`}>
      <button type="button" onClick={() => onOpen(project)} data-cursor="hover" aria-label={`Open details for ${project.title}`}
        className={`relative block overflow-hidden bg-navy ${wide ? "aspect-video lg:aspect-auto lg:w-[58%]" : "aspect-video"}`}>
        {project.image ? (
          <Image src={project.image} alt={project.imageAlt} fill loading="lazy"
            sizes={wide ? "(max-width: 1024px) 100vw, 700px" : "(max-width: 1024px) 100vw, 600px"}
            className="object-cover object-left-top transition-transform duration-700 ease-smooth group-hover:scale-[1.04]" />
        ) : (
          <ProjectCover project={project} />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-navy/70 px-3 py-1 font-mono text-xs font-medium text-white backdrop-blur">0{index + 1}</span>
      </button>

      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${wide ? "lg:p-10" : ""}`}>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent2">{project.client ? `${project.client} · ` : ""}{project.period}</p>
        <h3 id={`project-${project.slug}`} className={`mt-2 font-extrabold ${wide ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          <button type="button" onClick={() => onOpen(project)} className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-125">
            Read more →
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const projects = portfolio.projects;

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Selected work" title="Projects that *solve real problems.*" id="projects-title" />
          <p className="max-w-sm text-muted">AI agents, automations and business tools, from first message to shipped workflow.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} onOpen={setOpen} wide={i === 0} />)}
        </div>
      </div>
      <ProjectModal project={open} onClose={close} />
    </section>
  );
}
