/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH
 *  Every piece of text, every link and every image path on the site comes
 *  from this file. Edit here; you never need to touch the components.
 *
 *  Content is taken from Momna Abid's CV. Anything not in the CV is marked
 *  [PLACEHOLDER].
 * ============================================================================
 */

export type IconName =
  | "spark" | "bot" | "flow" | "code" | "database" | "layout" | "users" | "mail"
  | "linkedin" | "github" | "map" | "phone" | "download" | "arrow" | "play" | "award";

export interface Project {
  slug: string;
  title: string;
  client?: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
  image: string | null; // null = a designed cover is drawn instead
  imageAlt: string;
  gallery?: { src: string; alt: string }[]; // extra screenshots shown in the details dialog
  featured?: boolean;
}

export interface TimelineItem {
  role: string;
  org: string;
  period: string;
  description: string;
  meta?: string;
}

export const portfolio = {
  /* ------------------------------------------------------------------ meta */
  site: {
    // On Vercel this fills in automatically from the production domain.
    // To use a custom domain, set NEXT_PUBLIC_SITE_URL in Vercel → Settings → Environment Variables.
    url:
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
    title: "Momna Abid · AI Automation & Agentic AI Developer",
    description:
      "Portfolio of Momna Abid: AI agents, n8n automations, RAG pipelines and full-stack web apps.",
    ogImage: "/og.png",
    locale: "en_US",
  },

  /* ---------------------------------------------------------------- person */
  person: {
    name: "Momna Abid",
    firstName: "Momna",
    lastName: "Abid",
    initials: "MA",
    title: "Full-Stack Developer",
    focus: "AI Automation & Agentic AI",
    tagline: "I build AI agents and automations that take real business tasks from start to finish.",
    intro:
      "I'm a Full-Stack Developer focused on AI automation and agentic AI. I build multi-agent assistants with Google ADK, n8n workflows with RAG, and lead-generation and CRM tools for sales teams.",
    // typed one after another in the hero
    roles: [
      "I build AI agents that do the work.",
      "I automate workflows with n8n.",
      "I ship full-stack web apps.",
    ],
    location: "Multan, Pakistan",
    available: true,
    availabilityText: "Open to full-stack, AI automation and agentic AI roles",
    cvUrl: "/cv/Momna_Abid_CV.pdf", // public copy: keep CNIC and father's name out of it
  },

  /* ----------------------------------------------------------------- about */
  about: {
    heading: "Building software that *does the work.*",
    paragraphs: [
      "I'm a Computer Science graduate from The Women University, Multan, focused on full-stack development for AI automation and agentic AI.",
      "My recent work includes a multi-agent shopping assistant built with Google ADK, an n8n reservation assistant with RAG, and lead-generation and CRM tools for sales teams.",
      "I enjoy challenging, real-world tasks and care about delivering high-quality work with integrity, as part of a team.",
    ],
    stats: [
      { value: "3.67", suffix: "/4.0", label: "CGPA, BS Computer Science" },
      { value: "3", suffix: "", label: "Internships" },
      { value: "5", suffix: "", label: "Projects" },
      { value: "5", suffix: "", label: "Certifications" },
    ],
    facts: [
      { label: "Education", value: "BS Computer Science, The Women University, Multan" },
      { label: "Current role", value: "Software Developer Intern, Zeltrion Solutions" },
      { label: "Looking for", value: "Full-Stack, AI Automation & Agentic AI roles" },
    ],
  },

  /* ---------------------------------------------------------------- skills */
  skills: [
    { category: "AI & Automation", icon: "bot" as IconName,
      items: ["Agentic AI", "Google ADK", "n8n Automation", "RAG Pipelines", "Prompt Engineering", "API Integration"] },
    { category: "Languages & Data", icon: "database" as IconName,
      items: ["Python", "Flask", "NumPy", "Pandas", "Matplotlib", "SQL", "MongoDB"] },
    { category: "Frontend", icon: "layout" as IconName,
      items: ["React.js", "Tailwind CSS"] },
  ],

  /* ------------------------------------------------------------ experience */
  experience: [
    {
      role: "Software Developer Intern",
      org: "Zeltrion Solutions",
      period: "Aug 2026 – Oct 2026",
      description:
        "Building scalable web apps that are responsive on all devices, and integrating agentic AI features into software and systems.",
    },
    {
      role: "Lead Generation Automation Intern",
      org: "Codflux LLC",
      period: "Jun 2026 – Sep 2026",
      description:
        "Worked with lead-generation strategies and outreach techniques, and the tools used to automate and streamline the sales process.",
    },
    {
      role: "Frontend Developer Intern",
      org: "XOHOA",
      period: "Sep 2025 – Oct 2025",
      description: "Designed and built frontends for projects.",
    },
  ] as TimelineItem[],

  education: [
    {
      role: "BS Computer Science",
      org: "The Women University, Multan",
      period: "2021 – 2025",
      description: "Final year project: Sentiment-Driven Clothing Brand Recommendation System (BERT + Flask).",
      meta: "CGPA 3.67 / 4.0",
    },
    {
      role: "Intermediate",
      org: "Muslim Group of Schools and Colleges",
      period: "2019 – 2021",
      description: "Higher secondary education.",
      meta: "1030 / 1100",
    },
    {
      role: "Matriculation",
      org: "Sultan Foundation Girls High School, Multan",
      period: "2017 – 2019",
      description: "Secondary education.",
      meta: "981 / 1100",
    },
  ] as TimelineItem[],

  certifications: [
    "Python Programming (Data Mining & Machine Learning), NAVTTC",
    "AI Automation & Agentic AI Course, Tech7 Academy, Lahore",
    "Prepare Data for Exploration, Coursera",
    "TechXpo-2024 Certified",
    "GSEA Certified (Math Contest 2017)",
  ],

  /* -------------------------------------------------------------- projects */
  projects: [
    {
      slug: "royal-xpreme",
      title: "AI Shopping Assistant",
      client: "Royal XPreme",
      period: "Aug 2026 – Sep 2026",
      summary: "Multi-agent AI chatbot that takes a customer from “Hi” to a confirmed order.",
      highlights: [
        "Catalog, checkout and order-summary agents built with Agent Development Kit (ADK); prices and stock come from a live database.",
        "Names, emails, country-specific phone numbers and addresses validated in code.",
        "Database transactions prevent overselling, plus Row Level Security and 59 automated tests.",
      ],
      tags: ["Google ADK", "Agentic AI", "Multi-agent", "Live database"],
      image: "/projects/royal-xpreme-order.png",
      imageAlt: "Royal XPreme assistant confirming an order, with the ADK agent team and session state panel",
      featured: true,
    },
    {
      slug: "reservation-assistant",
      title: "AI Restaurant Reservation Assistant",
      period: "Apr 2026 – May 2026",
      summary: "n8n AI agent that handles new bookings, updates, cancellations and customer FAQs.",
      highlights: [
        "Reservations synced automatically with Google Calendar and Google Sheets.",
        "FAQs answered with RAG using a Supabase vector store and OpenAI embeddings.",
        "Customers verified before any change, with business rules for reliable operations.",
      ],
      tags: ["n8n", "RAG", "Supabase", "OpenAI", "Google Calendar", "Google Sheets"],
      image: "/projects/reservation-booking.png",
      imageAlt: "Reservation assistant booking a table for 4, with Google Calendar and Sheets updated",
      gallery: [
        { src: "/projects/reservation-cancellation.png", alt: "Reservation assistant verifying the customer and cancelling the booking" },
      ],
      featured: true,
    },
    {
      slug: "lead-generator",
      title: "Lead Generator",
      client: "NovisGrid Solutions",
      period: "May 2026 – Jun 2026",
      summary: "Lead scraping dashboard that finds, filters and exports business leads.",
      highlights: [
        "4-step scraper wizard: target niche and location, choose data fields, settings, review.",
        "Removes duplicate leads, runs scrapers on a schedule and tracks jobs live.",
        "One-click CSV export, plus team access with admin and member roles.",
      ],
      tags: ["Lead scraping", "Scheduling", "CSV export", "Team roles"],
      image: "/projects/lead-generator-scraper.png",
      imageAlt: "NovisGrid lead generator: new scraper wizard with business type, location and maximum leads",
      featured: true,
    },
    {
      slug: "sales-crm",
      title: "Sales CRM",
      client: "NovisGrid Solutions",
      period: "Jun 2026 – Aug 2026",
      summary: "CRM for managing leads, deals and multi-channel outreach.",
      highlights: [
        "Pipeline tracking with editable stages, deal values and follow-up reminders.",
        "Outreach by email, WhatsApp, Facebook, Instagram and LinkedIn using reusable templates.",
        "Weekly reports with lost-deal reasons, user roles and CSV import/export.",
      ],
      tags: ["Pipeline", "Multi-channel outreach", "Templates", "Reports"],
      image: "/projects/sales-crm-dashboard.png",
      imageAlt: "NovisGrid sales CRM dashboard with pipeline value, leads per stage and follow-ups",
      featured: true,
    },
    {
      slug: "clothing-recommender",
      title: "Sentiment-Driven Clothing Brand Recommendation System",
      client: "Final Year Project",
      period: "Aug 2026 – Sep 2026",
      summary: "Brand recommendation system driven by sentiment analysis with BERT, deployed as a Flask web app.",
      highlights: [
        "Sentiment analysis with BERT.",
        "Deployed as a Flask web app.",
      ],
      tags: ["BERT", "Flask", "Python", "NLP"],
      image: null,
      imageAlt: "Screenshot of the clothing brand recommendation web app",
    },
  ] as Project[],

  /* ------------------------------------------------------------- showcase */
  showcase: {
    heading: "See the work *in motion.*",
    text: "A short showreel of my work, plus a full walkthrough of the Lead Generator.",
    videos: [
      { label: "Showreel", src: "/video/showreel.mp4", poster: "/video/showreel-poster.jpg", caption: "Momna Abid · 2026 showreel" },
      { label: "Lead Generator demo", src: "/video/lead-generator-demo.mp4", poster: "/video/lead-generator-poster.jpg", caption: "Lead Generator for NovisGrid Solutions, built by Momna Abid" },
    ],
  },

  /* -------------------------------------------------------------- contact */
  contact: {
    heading: "Let's build something *useful.*",
    text: "Have a role, a project or an idea for an AI automation? Send a message and I'll get back to you.",
    email: "momnaabid51@gmail.com",
    phone: "03186327699",
    showPhone: false, // set to true if you want your phone number visible publicly
    // Form messages are delivered to `email` through FormSubmit (no backend needed).
    formEndpoint: "https://formsubmit.co/ajax/momnaabid51@gmail.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/momna-automation-ml", icon: "linkedin" as IconName },
    ],
  },

  /* ----------------------------------------------------------- navigation */
  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "showcase", label: "Showcase" },
    { id: "contact", label: "Contact" },
  ],
};

export type Portfolio = typeof portfolio;
