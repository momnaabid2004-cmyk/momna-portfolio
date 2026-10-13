"use client";
/**
 * CONTACT: form + email + socials.
 * The form posts to FormSubmit (contact.formEndpoint), which emails each
 * message to contact.email. No backend or API key needed.
 * The very first submission makes FormSubmit send an activation email to
 * that inbox; click the link in it once and later messages arrive directly.
 */
import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Icon } from "@/components/ui/Icon";

export function Contact() {
  const { contact } = portfolio;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // bot filled the hidden field
    setStatus("sending");
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: `Portfolio message from ${data.get("name")}`,
          _replyto: data.get("email"),
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message || "Request failed");
      form.reset();
      setNote("Thanks! Your message has been sent. I'll reply soon.");
      setStatus("sent");
    } catch {
      setNote("Couldn't send right now. Please email me directly.");
      setStatus("error");
    }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(contact.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };

  const field = "w-full rounded-xl border border-line bg-bg/60 px-4 py-3.5 text-fg placeholder:text-muted/70 outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <div className="container relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow="Contact" title={contact.heading} id="contact-title" />
          <p className="mt-6 max-w-md text-lg text-muted">{contact.text}</p>

          <div className="mt-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 break-all font-display text-lg font-bold hover:text-accent sm:text-2xl">
                <Icon name="mail" className="h-6 w-6 text-accent" />{contact.email}
              </a>
              <button type="button" onClick={copy} className="chip hover:border-accent/60" aria-live="polite">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            {contact.showPhone && (
              <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-3 text-lg text-fg/85 hover:text-accent">
                <Icon name="phone" className="h-5 w-5 text-accent" />{contact.phone}
              </a>
            )}
            <p className="inline-flex items-center gap-3 text-fg/85"><Icon name="map" className="h-5 w-5 text-accent" />{portfolio.person.location}</p>
          </div>

          <ul className="mt-10 flex gap-3" aria-label="Social links">
            {contact.socials.map((s) => (
              <li key={s.label}>
                <motion.a whileHover={{ y: -4 }} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface shadow-card hover:border-accent/60 hover:text-accent">
                  <Icon name={s.icon} />
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="card p-6 sm:p-8" aria-label="Contact form">
          {/* honeypot: hidden from people, bots fill it */}
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium">Name
              <input name="name" required autoComplete="name" placeholder="Your name" className={`${field} mt-2`} />
            </label>
            <label className="block text-sm font-medium">Email
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={`${field} mt-2`} />
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium">Message
            <textarea name="message" required rows={6} placeholder="Tell me about the role or project…" className={`${field} mt-2 resize-none`} />
          </label>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <MagneticButton type="submit" className={status === "sending" ? "pointer-events-none opacity-70" : ""}>
              {status === "sending" ? "Sending…" : <>Send message <Icon name="arrow" className="h-4 w-4" /></>}
            </MagneticButton>
            <AnimatePresence mode="wait">
              {(status === "sent" || status === "error") && (
                <motion.p key={status} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} role="status"
                  className={`text-sm ${status === "sent" ? "text-emerald-700" : "text-accent"}`}>
                  {note}{" "}
                  {status === "error" && <a href={`mailto:${contact.email}`} className="font-semibold underline">{contact.email}</a>}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
