"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Pin } from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-[84px]">
      {/* soft warm glows */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-saffron/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-spice/10 blur-3xl" />
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />

      <div className="container-x relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        {/* Copy */}
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="kicker"
          >
            <span className="h-px w-8 bg-spice" />
            Indian & Asian Tapas · Cocktail Bar
          </motion.span>

          <h1 className="mt-6 font-display text-[3.2rem] font-semibold leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-[5.1rem]">
            {["The Little", "India, in the", "heart of Bath"].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.12 }}
                className="block"
              >
                {i === 2 ? (
                  <span className="italic text-spice">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-cocoa/80"
          >
            A contemporary spread of small plates, street food and one pot mains,
            served beside a bar of signature cocktails. Sit back, share, and let the
            evening unfold.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.62 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link href="/menu" className="btn-primary">
              Explore the Menu <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/reservations" className="btn-ghost">
              Book a Table
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-cocoa/80"
          >
            <div className="flex items-center gap-2">
              <span className="flex text-saffron">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4" />
                ))}
              </span>
              <span className="font-medium">Loved on Google & TripAdvisor</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-spice" />
              Open 12pm to 10:30pm
            </div>
            <div className="flex items-center gap-2">
              <Pin className="h-4 w-4 text-spice" />
              St James Parade
            </div>
          </motion.div>
        </div>

        {/* Image collage */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.25 }}
            className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] shadow-lift"
          >
            <Image
              src="/images/ambiance/hero-bar.webp"
              alt="Maaya cocktail bar in the centre of Bath"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/30 to-transparent" />
          </motion.div>

          {/* Floating dish card */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className="absolute -left-2 top-10 hidden w-44 overflow-hidden rounded-2xl bg-cream p-2 shadow-card sm:block"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src="/images/dishes/paneer-65.webp"
                alt="Paneer 65"
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
            <p className="px-1 pb-1 pt-2 font-display text-sm font-semibold">Paneer 65</p>
            <p className="px-1 pb-1 text-xs text-clay">Most loved small plate</p>
          </motion.div>

          {/* Floating cocktail card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.75 }}
            className="absolute -bottom-6 right-2 hidden items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-cream shadow-card sm:flex"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image src="/images/drinks/fancy-cocktail.jpg" alt="Signature cocktail" fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <p className="font-display text-sm">Signature Bar</p>
              <p className="text-xs text-cream/60">Cocktails poured with craft</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
