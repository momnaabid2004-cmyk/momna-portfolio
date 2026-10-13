import { portfolio } from "@/data/portfolio";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const year = new Date().getFullYear();
  const { person, nav, projects, contact } = portfolio;
  const heading = "mb-4 font-display text-sm font-bold text-white";
  const link = "text-sm text-mint/90 transition-colors hover:text-white";

  return (
    <footer className="bg-navy pb-8 pt-16 text-mint">
      <div className="container">
        <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center justify-center gap-2.5 font-display sm:justify-start text-lg font-extrabold text-white">
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white text-[13px] text-navy">
                M<span className="text-accent">A</span>
              </span>
              {person.name}
            </a>
            <p className="mx-auto mt-4 max-w-xs text-sm sm:mx-0 leading-relaxed text-mint/90">{person.title} building AI agents and automations that do the work.</p>
            <ul className="mt-6 flex justify-center gap-3 sm:justify-start" aria-label="Social links">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:bg-accent">
                    <Icon name={s.icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${contact.email}`} aria-label="Email"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:bg-accent">
                  <Icon name="mail" className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className={heading}>Navigate</h2>
            <ul className="space-y-2.5">
              {nav.map((n) => <li key={n.id}><a href={`#${n.id}`} className={link}>{n.label}</a></li>)}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Projects</h2>
            <ul className="space-y-2.5">
              {projects.slice(0, 4).map((p) => <li key={p.slug}><a href="#projects" className={link}>{p.title}</a></li>)}
            </ul>
          </div>

          <div>
            <h2 className={heading}>Connect</h2>
            <ul className="space-y-2.5 text-sm">
              <li><a href={`mailto:${contact.email}`} className={`${link} break-all`}>{contact.email}</a></li>
              <li>{person.location}</li>
              <li>{person.focus}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-mint/80 sm:flex-row">
          <p>© {year} {person.name}. All rights reserved.</p>
          <a href="#top" className="hover:text-white">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
