"use client";
/**
 * Tiny event bus so sections can wait for the preloader to finish
 * before playing their intro animation.
 */
declare global { interface Window { __introDone?: boolean } }

export function markIntroDone() {
  window.__introDone = true;
  window.dispatchEvent(new Event("intro:done"));
}

export function onIntroDone(cb: () => void) {
  if (window.__introDone) { cb(); return () => {}; }
  window.addEventListener("intro:done", cb, { once: true });
  return () => window.removeEventListener("intro:done", cb);
}
