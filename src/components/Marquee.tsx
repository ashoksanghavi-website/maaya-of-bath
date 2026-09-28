const defaultItems = [
  "Indian Street Food",
  "Signature Cocktails",
  "Asian Tapas",
  "One Pot Curries",
  "Small Plates",
  "Fresh Biriyani",
  "Cocktail Bar Lounge",
];

export function Marquee({
  items = defaultItems,
  tone = "spice",
}: {
  items?: string[];
  tone?: "spice" | "ink";
}) {
  const bg = tone === "spice" ? "bg-spice text-cream" : "bg-ink text-cream";
  const loop = [...items, ...items];
  return (
    <div className={`relative flex overflow-hidden py-4 ${bg}`}>
      <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-8 text-sm font-semibold uppercase tracking-widest">
            {it}
            <span className="text-saffron">✦</span>
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8"
      >
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-8 text-sm font-semibold uppercase tracking-widest">
            {it}
            <span className="text-saffron">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
