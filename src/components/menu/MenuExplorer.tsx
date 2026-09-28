"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, menu, type DietTag } from "@/data/menu";
import { DishCard } from "@/components/DishCard";

type Filter = "all" | "veg" | "vegan" | "gf";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "veg", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gf", label: "Gluten Free" },
];

export function MenuExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>(categories[0].id);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .map((cat) => {
        const items = menu.filter((m) => {
          if (m.category !== cat.id) return false;
          if (filter !== "all" && !m.tags.includes(filter as DietTag)) return false;
          if (q && !`${m.name} ${m.short}`.toLowerCase().includes(q)) return false;
          return true;
        });
        return { cat, items };
      })
      .filter((g) => g.items.length > 0);
  }, [filter, query]);

  const total = grouped.reduce((s, g) => s + g.items.length, 0);

  // Scroll spy for the category rail.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveCat(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    grouped.forEach((g) => {
      const el = document.getElementById(g.cat.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [grouped]);

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-[84px] z-30 border-y border-ink/8 bg-paper/85 backdrop-blur-md">
        <div className="container-x flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  filter === f.id
                    ? "bg-spice text-cream shadow-soft"
                    : "border border-ink/15 text-ink hover:border-spice hover:text-spice"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, curries, drinks"
              className="w-full rounded-full border border-ink/15 bg-ivory px-5 py-2.5 text-sm outline-none transition-colors placeholder:text-clay focus:border-spice"
            />
          </div>
        </div>

        {/* Category rail */}
        <div className="container-x pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {grouped.map(({ cat }) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  activeCat === cat.id
                    ? "bg-ink text-cream"
                    : "border border-ink/12 bg-ivory text-cocoa/80 hover:border-spice hover:text-spice"
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter + query}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {total === 0 && (
              <p className="py-24 text-center text-lg text-cocoa/70">
                No dishes match that just yet. Try another filter.
              </p>
            )}

            {grouped.map(({ cat, items }) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-[220px] py-10 lg:py-12">
                <div className="mb-8 flex flex-col gap-3 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="kicker">{cat.kicker}</span>
                    <h2 className="mt-2 flex items-baseline gap-3 font-display text-3xl font-semibold sm:text-4xl">
                      {cat.name}
                      <span className="text-base font-normal text-clay">{items.length}</span>
                    </h2>
                  </div>
                  <p className="max-w-sm text-sm text-cocoa/70">{cat.blurb}</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <DishCard key={item.slug} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
