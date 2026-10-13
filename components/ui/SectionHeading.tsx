"use client";
import { useRef } from "react";
import { useSplitReveal } from "@/hooks/useSplitReveal";
import { Rich } from "@/lib/rich";

/** Eyebrow + big heading with a GSAP split-word reveal on scroll. */
export function SectionHeading({ eyebrow, title, id, align = "left" }: { eyebrow: string; title: string; id?: string; align?: "left" | "center" }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useSplitReveal(ref);
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 id={id} ref={ref} className="mt-5 text-display-lg font-extrabold">
        <Rich text={title} />
      </h2>
    </div>
  );
}
