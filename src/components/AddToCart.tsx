"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menu";
import { gbp, useCart } from "@/lib/cart";
import { Plus, Minus, Check, ArrowRight } from "./icons";

export function QuickAdd({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  // Items with choices open the detail page so the guest can pick.
  if (item.variants && item.variants.length > 0) {
    return (
      <Link
        href={`/menu/${item.slug}`}
        className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-spice hover:text-cream"
      >
        Choose <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    );
  }

  return (
    <button
      onClick={() => {
        add({
          id: item.slug,
          slug: item.slug,
          name: item.name,
          price: item.price,
          image: item.image,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
      }}
      className="inline-flex items-center gap-1.5 rounded-full bg-spice px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-spice-dark"
    >
      {added ? (
        <>
          <Check className="h-3.5 w-3.5" /> Added
        </>
      ) : (
        <>
          <Plus className="h-3.5 w-3.5" /> Add
        </>
      )}
    </button>
  );
}

export function AddToCartPanel({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const hasVariants = !!item.variants?.length;
  const [variant, setVariant] = useState(item.variants?.[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const price = variant?.price ?? item.price;

  const handleAdd = () => {
    add(
      {
        id: hasVariants ? `${item.slug}-${variant?.label}` : item.slug,
        slug: item.slug,
        name: item.name,
        variant: variant?.label,
        price,
        image: item.image,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="card-surface p-6 sm:p-7">
      <div className="flex items-baseline justify-between">
        <span className="text-sm uppercase tracking-widest text-clay">Price</span>
        <span className="font-display text-3xl font-semibold text-spice">{gbp(price)}</span>
      </div>

      {hasVariants && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-cocoa">Choose your option</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.variants!.map((v) => {
              const active = v.label === variant?.label;
              return (
                <button
                  key={v.label}
                  onClick={() => setVariant(v)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    active
                      ? "border-spice bg-spice text-cream"
                      : "border-ink/15 text-ink hover:border-spice"
                  }`}
                >
                  {v.label}
                  <span className={`ml-2 text-xs ${active ? "text-cream/80" : "text-clay"}`}>
                    {gbp(v.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1.5">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-sand"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-sand"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.97 }}
          className="btn-primary flex-1"
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added to Basket
            </>
          ) : (
            <>Add {gbp(price * qty)}</>
          )}
        </motion.button>
      </div>

      <p className="mt-4 text-center text-xs text-clay">
        Collection and delivery options are chosen at checkout.
      </p>
    </div>
  );
}
