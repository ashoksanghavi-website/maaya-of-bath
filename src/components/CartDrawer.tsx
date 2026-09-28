"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { gbp, useCart } from "@/lib/cart";
import { Bag, Close, Minus, Plus, ArrowRight } from "./icons";

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, setQty, remove, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/45 backdrop-blur-sm" onClick={closeCart} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <Bag className="h-5 w-5 text-spice" />
                <h3 className="font-display text-xl">Your Basket</h3>
                <span className="text-sm text-clay">({count})</span>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close basket"
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 hover:border-spice hover:text-spice"
              >
                <Close className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-sand/60">
                  <Bag className="h-8 w-8 text-clay" />
                </div>
                <div>
                  <p className="font-display text-xl">Your basket is empty</p>
                  <p className="mt-1 text-sm text-cocoa/70">
                    Add a few small plates and we will get the kitchen going.
                  </p>
                </div>
                <Link href="/menu" onClick={closeCart} className="btn-primary">
                  Browse the Menu
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                  {lines.map((line) => (
                    <motion.div
                      key={line.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4 rounded-2xl border border-ink/8 bg-ivory p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image src={line.image} alt={line.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate font-medium leading-tight">{line.name}</p>
                            {line.variant && (
                              <p className="text-xs text-clay">{line.variant}</p>
                            )}
                          </div>
                          <button
                            onClick={() => remove(line.id)}
                            className="text-xs text-clay underline-offset-2 hover:text-spice hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1">
                            <button
                              onClick={() => setQty(line.id, line.qty - 1)}
                              aria-label="Decrease"
                              className="grid h-7 w-7 place-items-center rounded-full hover:bg-sand"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">{line.qty}</span>
                            <button
                              onClick={() => setQty(line.id, line.qty + 1)}
                              aria-label="Increase"
                              className="grid h-7 w-7 place-items-center rounded-full hover:bg-sand"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-semibold text-spice">{gbp(line.price * line.qty)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-ink/10 bg-ivory px-6 py-5">
                  <div className="flex items-center justify-between text-sm text-cocoa/80">
                    <span>Subtotal</span>
                    <span className="font-semibold text-ink">{gbp(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-clay">
                    Service and any delivery are calculated at checkout.
                  </p>
                  <Link href="/order" onClick={closeCart} className="btn-primary mt-4 w-full">
                    Go to Checkout <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={closeCart}
                    className="mt-2 w-full text-center text-sm text-cocoa/70 hover:text-spice"
                  >
                    Keep browsing
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
