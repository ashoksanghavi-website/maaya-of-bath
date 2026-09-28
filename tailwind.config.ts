import type { Config } from "tailwindcss";

// Allow any integer opacity modifier (e.g. border-ink/8, bg-spice/12).
const fullOpacity = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])
);

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      opacity: fullOpacity,
      colors: {
        // Warm, appetite-forward palette drawn from Maaya's Indian tapas identity.
        paper: "#F7EFE1",
        cream: "#FBF6EC",
        ivory: "#FDFBF6",
        ink: "#221913",
        cocoa: "#3A2A20",
        clay: "#8A6F58",
        sand: "#E7D8C2",
        spice: {
          DEFAULT: "#B23A1E",
          dark: "#8C2A14",
          light: "#D2653F",
        },
        saffron: {
          DEFAULT: "#E0902B",
          light: "#F0B45C",
        },
        maroon: {
          DEFAULT: "#4E1712",
          dark: "#3A0F0C",
        },
        gold: {
          DEFAULT: "#C0912F",
          light: "#DDB861",
        },
        leaf: "#5B7A45",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.28em",
      },
      maxWidth: {
        content: "1240px",
        prose: "68ch",
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(58, 26, 12, 0.35)",
        card: "0 24px 60px -30px rgba(58, 26, 12, 0.45)",
        lift: "0 30px 80px -40px rgba(58, 26, 12, 0.55)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
