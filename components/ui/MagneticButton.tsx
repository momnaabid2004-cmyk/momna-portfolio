"use client";
/**
 * Button/link that gently follows the pointer (Framer Motion springs).
 * Falls back to a normal button on touch devices and with reduced motion.
 */
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  variant?: "primary" | "ghost";
  className?: string;
  ariaLabel?: string;
  download?: boolean;
  external?: boolean;
  type?: "button" | "submit";
};

const styles = {
  primary: "bg-accent text-white shadow-[0_18px_40px_-14px_rgb(var(--c-accent)/0.7)] hover:brightness-110",
  ghost: "border border-line bg-surface/40 text-fg hover:border-accent/60 hover:bg-surface/70",
};

export function MagneticButton({ children, href, onClick, variant = "primary", className = "", ariaLabel, download, external, type = "button" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  const cls = `group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-[filter,background-color,border-color] duration-300 ease-smooth ${styles[variant]} ${className}`;
  const common = { ref: ref as never, onMouseMove: onMove, onMouseLeave: reset, style: { x: sx, y: sy }, className: cls, "aria-label": ariaLabel, "data-cursor": "hover" };

  if (href) {
    return (
      <motion.a {...common} href={href} onClick={onClick} download={download || undefined}
        target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {children}
      </motion.a>
    );
  }
  return <motion.button {...common} type={type} onClick={onClick}>{children}</motion.button>;
}
