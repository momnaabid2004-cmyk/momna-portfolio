import type { Config } from "tailwindcss";

/**
 * Design tokens.
 * Colours come from CSS variables (see app/globals.css). Light theme only.
 * Palette: red #E63946 · honeydew #F1FAEE · mint #A8DADC · steel #457B9D · navy #1D3557.
 */
const withVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        bg: withVar("--c-bg"),          // page background
        surface: withVar("--c-surface"), // cards
        fg: withVar("--c-fg"),          // main text
        muted: withVar("--c-muted"),    // secondary text
        line: withVar("--c-line"),      // borders
        accent: withVar("--c-accent"),  // red
        accent2: withVar("--c-accent2"),// steel blue
        mint: withVar("--c-mint"),
        navy: withVar("--c-navy"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.25rem, 5.4vw, 4.4rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(1.85rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.8rem, 3.4vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
      },
      borderRadius: { xl2: "1.25rem", xl3: "1.75rem" },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--c-line)), 0 30px 70px -34px rgb(var(--c-navy) / 0.45)",
        card: "0 12px 34px -24px rgb(var(--c-navy) / 0.45)",
      },
      transitionTimingFunction: { smooth: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [],
};

export default config;
