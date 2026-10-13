"use client";
import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * GSAP scroll reveal for headings.
 * Splits the element's text into words (keeping accent <span>s), then slides
 * each word up from a mask when the element scrolls into view.
 * Only GSAP touches this element (no Framer Motion on the same node).
 */
export function useSplitReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { start = "top 85%", delay = 0, immediate = false }: { start?: string; delay?: number; immediate?: boolean } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Split text nodes into word spans, preserving inline elements (accent spans).
    const original = el.innerHTML;
    const wrapWords = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          (child.textContent || "").split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const outer = document.createElement("span");
            outer.className = "split-line";
            outer.style.display = "inline-block";
            const inner = document.createElement("span");
            inner.className = "split-word";
            inner.textContent = part;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrapWords(child);
        }
      });
    };
    wrapWords(el);
    const words = el.querySelectorAll<HTMLElement>(".split-word");

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 110 });
      const tween = {
        yPercent: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.045,
        delay,
      };
      if (immediate) gsap.to(words, tween);
      else gsap.to(words, { ...tween, scrollTrigger: { trigger: el, start, once: true } });
    }, el);

    return () => {
      ctx.revert();
      el.innerHTML = original;
      ScrollTrigger.refresh();
    };
  }, [ref, start, delay, immediate]);
}
