"use client";
/**
 * SHOWCASE VIDEO
 *  - GSAP ScrollTrigger: on desktop the section pins and the video frame
 *    grows from a card to near full width as you scroll.
 *  - The showreel lazy-loads (preload="none") and plays (muted) when in view,
 *    pauses when out of view. With reduced motion it waits for a click.
 *  - Tabs switch between the videos in showcase.videos.
 *  - If a video cannot play, its poster frame stays visible.
 */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

export function Showcase() {
  const { showcase } = portfolio;
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);
  const current = showcase.videos[active];

  // GSAP pinned grow (desktop only, motion allowed)
  useEffect(() => {
    if (!section.current || !frame.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(frame.current, { scale: 0.78, borderRadius: 32 }, {
        scale: 1, borderRadius: 20, ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: "+=70%", scrub: 0.6, pin: true, anticipatePin: 1 },
      });
    });
    return () => mm.revert();
  }, []);

  // play when visible
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduced) {
        v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else if (!entry.isIntersecting) {
        v.pause(); setPlaying(false);
      }
    }, { threshold: 0.45 });
    io.observe(v);
    return () => io.disconnect();
  }, [active]);

  // switching tabs: load the new source and keep playing if allowed
  const select = (i: number) => {
    if (i === active) return;
    setPlaying(false);
    setActive(i);
  };

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { v.pause(); setPlaying(false); }
  };

  return (
    <section id="showcase" ref={section} aria-labelledby="showcase-title" className="band relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24">
      <div className="container">
        <SectionHeading eyebrow="Showcase" title={showcase.heading} id="showcase-title" align="center" />
        <p className="mx-auto mt-5 max-w-xl text-center text-muted">{showcase.text}</p>

        <div role="tablist" aria-label="Choose a video" className="mx-auto mt-8 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-bg p-1.5">
          {showcase.videos.map((v, i) => (
            <button key={v.src} type="button" role="tab" aria-selected={i === active} onClick={() => select(i)}
              className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors sm:px-5 ${i === active ? "font-medium text-fg" : "text-muted hover:text-fg"}`}>
              {i === active && <motion.span layoutId="video-tab" className="absolute inset-0 rounded-full bg-accent/[0.12] ring-1 ring-accent/35" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{v.label}</span>
            </button>
          ))}
        </div>

        <div ref={frame} className="relative mx-auto mt-8 aspect-video w-full max-w-6xl overflow-hidden rounded-[20px] bg-navy shadow-[0_40px_90px_-40px_rgb(var(--c-navy)/0.7)] ring-1 ring-navy/10 will-change-transform sm:mt-12">
          {/* key remounts the element so the new source loads cleanly */}
          <video key={current.src} ref={video} className="h-full w-full object-cover" poster={current.poster} preload="none" muted loop playsInline
            aria-label={current.caption}>
            <source src={current.src} type="video/mp4" />
          </video>

          <motion.button type="button" onClick={toggle} aria-label={playing ? "Pause video" : "Play video"}
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
            className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg sm:bottom-5 sm:left-5 sm:h-12 sm:w-12">
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
            ) : (
              <Icon name="play" className="h-5 w-5 translate-x-0.5" />
            )}
          </motion.button>
        </div>
        <p className="mt-5 text-center font-mono text-xs uppercase tracking-[0.14em] text-muted">{current.caption}</p>
      </div>
    </section>
  );
}
