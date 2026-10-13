# Momna Abid · Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + GSAP ScrollTrigger + Lenis. Light theme only, palette E63946 · F1FAEE · A8DADC · 457B9D · 1D3557.

All content (text, projects, skills, links, socials) lives in **`data/portfolio.ts`**.
Edit that one file; you never need to touch the components.

## Folder structure

```
momna-portfolio/
├─ app/
│  ├─ fonts/                 # Plus Jakarta Sans + Inter (Google Fonts, self-hosted)
│  ├─ globals.css            # colour tokens (light only), base styles, Lenis CSS
│  ├─ layout.tsx             # fonts, SEO metadata, Open Graph, providers
│  ├─ page.tsx               # puts all sections together
│  ├─ icon.svg               # favicon
│  ├─ not-found.tsx, robots.ts, sitemap.ts
├─ components/
│  ├─ providers/
│  │  ├─ SmoothScrollProvider.tsx   # Lenis + GSAP ScrollTrigger sync (gsap.ticker)
│  ├─ sections/              # Hero, About, Skills, Experience, Projects (+Modal), Showcase, Contact, Footer
│  └─ ui/                    # Navbar, Cursor, Preloader, ScrollProgress, MagneticButton, SectionHeading, Icon, CountUp
├─ hooks/                    # useSplitReveal (GSAP), useActiveSection, useReducedMotion, useMediaQuery
├─ lib/                      # gsap.ts (plugin registration), intro.ts, rich.tsx
├─ data/portfolio.ts         # ★ ALL CONTENT + LINKS
├─ public/
│  ├─ projects/              # project cover images
│  ├─ video/                 # showreel.mp4 + lead-generator-demo.mp4 (tabs in the Showcase section)
│  ├─ cv/                    # put Momna_Abid_CV.pdf here
│  └─ og.png                 # social share image (1200×630)
└─ tailwind.config.ts        # design tokens (colours, fonts, type scale, shadows)
```

## Motion rules used
- **GSAP + ScrollTrigger**: scroll sequences only: heading split reveals, hero parallax, timeline line draw, pinned video grow.
- **Framer Motion**: UI only: mount fade-ups, hover/tilt, magnetic buttons, cursor, modal, mobile menu, preloader.
- The same element is never animated by both libraries.
- `prefers-reduced-motion`: Lenis is off, GSAP reveals are skipped, the typed hero line stays static, the cursor and preloader are disabled.

## Install & run locally

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production check:

```bash
npm run build
npm start
```

If you start a fresh project instead of using this folder, the same dependencies are:

```bash
npm install next@15.5.27 react@19.2.6 react-dom@19.2.6 framer-motion@12.23.12 gsap@3.13.0 lenis@1.3.11
npm install -D typescript@5.9.2 @types/node@22.18.0 @types/react@19.1.12 @types/react-dom@19.1.9 tailwindcss@3.4.17 postcss@8.5.6 autoprefixer@10.4.21
```

(`package.json` also pins `motion-dom`/`motion-utils` with `overrides` so Framer Motion builds cleanly.)

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Go to vercel.com → **Add New… → Project** → import the repository.
3. Framework preset: **Next.js** (auto-detected). Build command `next build`, output default. Click **Deploy**.
4. `site.url` (Open Graph, sitemap) is filled in automatically from Vercel's production domain. For a custom domain, add it under **Project → Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` (e.g. `https://momnaabid.com`) under **Settings → Environment Variables**, then redeploy.
5. Every `git push` to `main` redeploys automatically.

CLI alternative: `npm i -g vercel` → `vercel` → `vercel --prod`.

## Placeholder checklist (all in `data/portfolio.ts` unless noted)
- [x] CV at `public/cv/Momna_Abid_CV.pdf` (CNIC and father's name removed). Replace this file when the CV changes, and remove them again.
- [ ] Final-year project: optional `image` screenshot (without one, a designed cover is drawn)
- [ ] `contact.showPhone`: set `true` only if you want your number public
- [ ] `showcase.video` / `showcase.poster`: swap `public/video/showreel.mp4` if you want a different video
- [ ] `public/og.png`: optional custom social share image
- [ ] Contact form: sends to `contact.email` via FormSubmit (`contact.formEndpoint`). After deploying, submit the form once and click the activation link FormSubmit emails to that inbox.
