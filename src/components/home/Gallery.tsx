"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Close, ArrowRight } from "@/components/icons";

type Shot = { src: string; alt: string; label: string; span: string };

const shots: Shot[] = [
  { src: "/images/ambiance/interior-header.jpg", alt: "The Maaya dining room", label: "The Room", span: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2" },
  { src: "/images/ambiance/indian-street-food.jpg", alt: "Indian street food", label: "Street Food", span: "col-span-1 lg:col-span-1" },
  { src: "/images/drinks/mixing-a-cocktail.jpg", alt: "Cocktails at the bar", label: "The Bar", span: "col-span-1 lg:col-span-1" },
  { src: "/images/ambiance/asian-tapas.webp", alt: "Asian tapas plates", label: "Small Plates", span: "col-span-2 lg:col-span-2" },
  { src: "/images/dishes/devilled-king-prawns.webp", alt: "Devilled king prawns", label: "Seafood", span: "col-span-1 lg:col-span-1" },
  { src: "/images/dishes/samosa-chaat.webp", alt: "Samosa chaat", label: "Chaat", span: "col-span-1 lg:col-span-1" },
  { src: "/images/drinks/drinks-glasses.jpg", alt: "Drinks and glassware", label: "Poured Fresh", span: "col-span-2 lg:col-span-2" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((a) => (a === null ? a : (a + 1) % shots.length)), []);
  const prev = useCallback(() => setActive((a) => (a === null ? a : (a - 1 + shots.length) % shots.length)), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <>
      <div className="mt-12 grid grid-flow-row-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 lg:auto-rows-[220px] lg:grid-cols-4">
        {shots.map((s, i) => (
          <motion.button
            key={s.src}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative overflow-hidden rounded-[20px] shadow-soft ${s.span}`}
          >
            <Image src={s.src} alt={s.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 translate-y-2 text-left font-display text-lg font-semibold text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {s.label}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={close} />
            <button onClick={close} aria-label="Close" className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream hover:bg-spice">
              <Close className="h-6 w-6" />
            </button>
            <button onClick={prev} aria-label="Previous" className="absolute left-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream hover:bg-spice sm:left-8">
              <ArrowRight className="h-6 w-6 rotate-180" />
            </button>
            <button onClick={next} aria-label="Next" className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream hover:bg-spice sm:right-8">
              <ArrowRight className="h-6 w-6" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-0 h-[70vh] w-full max-w-4xl overflow-hidden rounded-[20px]"
            >
              <Image src={shots[active].src} alt={shots[active].alt} fill sizes="90vw" className="object-contain" />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-lg text-cream">
              {shots[active].label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
