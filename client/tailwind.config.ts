import type { Config } from "tailwindcss";

// Palette is locked to exactly five hex values. Every shade used in the UI
// (hovers, borders, shadows) is one of these five at some opacity — no new
// hues are introduced anywhere in the project.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#252323", // primary text, dark surfaces, the press bar
        tan: "#A99985", // accent / call to action
        cream: "#F5F1ED", // page background
        sand: "#DAD2BC", // card + ticket surfaces
        slate: "#70798C", // secondary text, borders, muted state
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        press: {
          "0%": { transform: "scaleY(1)" },
          "45%": { transform: "scaleY(0.34)" },
          "100%": { transform: "scaleY(1)" },
        },
        "ticket-in": {
          "0%": { transform: "translateY(-14px) scale(0.96)", opacity: "0" },
          "60%": { transform: "translateY(4px) scale(1.01)", opacity: "1" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        shrinkwidth: {
          "0%": { width: "100%" },
          "100%": { width: "var(--shrink-to, 18%)" },
        },
      },
      animation: {
        press: "press 520ms cubic-bezier(.65,0,.35,1)",
        "ticket-in": "ticket-in 480ms cubic-bezier(.2,.8,.2,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
