"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Close, ArrowRight, Check } from "@/components/icons";

const KEY = "maaya-promo-seen-v1";

export function PromoPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;
    const t = setTimeout(() => setShow(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setShow(false);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative grid w-full max-w-3xl overflow-hidden rounded-[26px] bg-cream shadow-lift sm:grid-cols-2"
          >
            <button
              onClick={close}
              aria-label="Close offer"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-ink shadow-soft transition-colors hover:bg-spice hover:text-cream sm:bg-ink/30 sm:text-cream sm:hover:bg-spice"
            >
              <Close className="h-5 w-5" />
            </button>

            {/* Image */}
            <div className="relative hidden min-h-[320px] sm:block">
              <Image src="/images/dishes/paneer-65.webp" alt="Maaya small plates" fill sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative flex flex-col justify-center p-7 sm:p-9">
              <div className="grain pointer-events-none absolute inset-0 opacity-40" />
              <div className="relative">
                <span className="kicker">
                  <span className="h-px w-6 bg-spice" /> A Warm Welcome
                </span>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-ink">
                  Enjoy <span className="text-spice">20% off</span> your first order
                </h2>
                <p className="mt-3 text-sm text-cocoa/75">
                  Order online for collection or delivery and save on the whole spread.
                </p>

                <ul className="mt-5 space-y-2.5 text-sm text-cocoa">
                  {[
                    "20% off every collection order",
                    "20% off delivery orders over £15",
                    "10% back as loyalty credits",
                  ].map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-spice/12 text-spice">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/menu" onClick={close} className="btn-primary">
                    Order Now <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button onClick={close} className="btn-ghost">
                    Maybe later
                  </button>
                </div>
                <p className="mt-4 text-xs text-clay">Offer applied automatically at checkout.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
