import type { Project } from "@/data/portfolio";

/** Drawn cover for projects without a screenshot (navy gradient + title + tags). */
export function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden bg-gradient-to-br from-navy via-navy to-accent2 p-6 text-left text-white sm:p-8">
      <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-mint/30 blur-3xl" />
      <p className="relative font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-mint">{project.client ?? "Project"}</p>
      <p className="relative mt-2 max-w-md font-display text-xl font-extrabold leading-tight sm:text-2xl">{project.title}</p>
      <div className="relative mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((t) => <span key={t} className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[11px]">{t}</span>)}
      </div>
    </div>
  );
}
