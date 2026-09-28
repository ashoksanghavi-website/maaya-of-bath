"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "@/components/icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-saffron">The Maaya List</p>
      <p className="mt-2 text-sm text-cream/70">Offers, events and new dishes, now and then. No spam.</p>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-sm text-cream"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-leaf text-cream">
              <Check className="h-3.5 w-3.5" />
            </span>
            Thank you, you are on the list.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
            className="mt-4 flex items-center gap-2 rounded-full border border-cream/25 bg-cream/5 p-1.5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-cream outline-none placeholder:text-cream/50"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-saffron text-ink transition-colors hover:bg-saffron-light"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
