import type { DietTag } from "@/data/menu";
import { Flame, Leaf } from "./icons";

const tagStyle: Record<DietTag, string> = {
  veg: "bg-leaf/12 text-leaf",
  vegan: "bg-leaf/12 text-leaf",
  gf: "bg-clay/12 text-cocoa",
  df: "bg-clay/12 text-cocoa",
  nuts: "bg-clay/12 text-cocoa",
  popular: "bg-spice/12 text-spice",
  new: "bg-saffron/18 text-saffron",
  chef: "bg-gold/18 text-[#8a6410]",
};

const shortLabel: Record<DietTag, string> = {
  veg: "Veg",
  vegan: "Vegan",
  gf: "GF",
  df: "DF",
  nuts: "Nuts",
  popular: "Popular",
  new: "New",
  chef: "Chef",
};

export function Tag({ tag }: { tag: DietTag }) {
  const isLeaf = tag === "veg" || tag === "vegan";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wide ${tagStyle[tag]}`}
    >
      {isLeaf && <Leaf className="h-3 w-3" />}
      {shortLabel[tag]}
    </span>
  );
}

export function SpiceMeter({ level }: { level: number }) {
  if (!level) return null;
  return (
    <span className="inline-flex items-center gap-0.5" title={`Spice level ${level} of 3`}>
      {[1, 2, 3].map((i) => (
        <Flame
          key={i}
          className={`h-3.5 w-3.5 ${i <= level ? "text-spice" : "text-ink/15"}`}
        />
      ))}
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  tone = "ink",
}: {
  kicker?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "ink" | "cream";
}) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {kicker && (
        <span className={`kicker ${isCenter ? "justify-center" : ""}`}>
          <span className="h-px w-6 bg-spice" />
          {kicker}
        </span>
      )}
      <h2
        className={`mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl ${
          tone === "cream" ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${
            tone === "cream" ? "text-cream/75" : "text-cocoa/80"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
