"use client";
/** Project detail dialog (Framer Motion). Esc / backdrop click closes it. */
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/portfolio";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ProjectCover } from "./ProjectCover";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (!project) return;
    lenis?.stop();
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); lenis?.start(); prev?.focus(); };
  }, [project, onClose, lenis]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div key="backdrop" className="fixed inset-0 z-[70] flex items-end justify-center bg-navy/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="project-modal-title" data-lenis-prevent
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-xl3 border border-line bg-bg shadow-2xl sm:rounded-xl3"
            initial={{ y: 60, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video w-full overflow-hidden bg-navy">
              {project.image ? (
                <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover object-left-top" />
              ) : (
                <ProjectCover project={project} />
              )}
            </div>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project details"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            <div className="p-6 sm:p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent2">{project.client ? `${project.client} · ` : ""}{project.period}</p>
              <h3 id="project-modal-title" className="mt-2 text-2xl font-extrabold sm:text-3xl">{project.title}</h3>
              <p className="mt-3 text-muted">{project.summary}</p>
              <ul className="mt-6 space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{h}
                  </li>
                ))}
              </ul>
              {project.gallery?.map((g) => (
                <div key={g.src} className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-navy">
                  <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 100vw, 704px" className="object-cover object-left-top" />
                </div>
              ))}
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                {project.tags.map((t) => <li key={t} className="chip">{t}</li>)}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
