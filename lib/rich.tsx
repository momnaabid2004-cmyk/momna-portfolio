import { Fragment } from "react";

/**
 * Renders text where *starred words* get the accent colour.
 * "Building software that *does the work.*" -> accent on "does the work."
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <span key={i} className="text-accent">{p.slice(1, -1)}</span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}

/** Plain version (no markup) for aria-labels and metadata. */
export const plain = (text: string) => text.replace(/\*/g, "");
