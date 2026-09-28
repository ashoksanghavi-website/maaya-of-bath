"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gbp } from "@/lib/cart";
import { site } from "@/data/site";
import { Check, Clock, Pin, Phone, ArrowRight } from "@/components/icons";

type Order = {
  ref: string;
  mode: "collection" | "delivery";
  slot: string;
  name: string;
  email: string;
  address: string;
  lines: { id: string; name: string; variant?: string; qty: number; price: number }[];
  subtotal: number;
  discount: number;
  loyalty: number;
  total: number;
};

export default function ConfirmedPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("maaya-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  if (loaded && !order) {
    return (
      <div className="bg-paper pt-[84px]">
        <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
          <h1 className="font-display text-4xl font-semibold">No recent order found</h1>
          <p className="max-w-md text-cocoa/70">
            Looks like there is nothing to confirm just yet. Start a new order from the menu.
          </p>
          <Link href="/menu" className="btn-primary">
            Browse the Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper pt-[84px]">
      <div className="container-x py-14 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-leaf text-cream"
          >
            <Check className="h-10 w-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center"
          >
            <span className="kicker justify-center">
              <span className="h-px w-6 bg-spice" /> Order Confirmed
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
              Thank you{order ? `, ${order.name.split(" ")[0]}` : ""}
            </h1>
            <p className="mt-4 text-cocoa/75">
              Your order is in with the kitchen. We have sent a confirmation to{" "}
              <span className="font-medium text-ink">{order?.email}</span>.
            </p>
          </motion.div>

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="card-surface mt-10 overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 bg-ivory px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-clay">Order reference</p>
                  <p className="font-display text-2xl font-semibold text-spice">{order.ref}</p>
                </div>
                <span className="rounded-full bg-leaf/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-leaf">
                  {order.mode}
                </span>
              </div>

              <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
                <Info icon={<Clock className="h-4 w-4 text-spice" />} label="Ready for" value={order.slot} />
                <Info icon={<Pin className="h-4 w-4 text-spice" />} label={order.mode === "delivery" ? "Delivering to" : "Collect from"} value={order.address} />
              </div>

              <div className="border-t border-ink/10 px-6 py-5">
                <p className="mb-3 text-sm font-semibold">Your dishes</p>
                <ul className="space-y-2 text-sm">
                  {order.lines.map((l) => (
                    <li key={l.id} className="flex items-center justify-between text-cocoa/80">
                      <span>
                        <span className="font-medium text-ink">{l.qty} ×</span> {l.name}
                        {l.variant ? ` (${l.variant})` : ""}
                      </span>
                      <span>{gbp(l.price * l.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-1.5 border-t border-ink/10 pt-4 text-sm text-cocoa/80">
                  <div className="flex justify-between"><span>Subtotal</span><span>{gbp(order.subtotal)}</span></div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-leaf"><span>Discount 20%</span><span>- {gbp(order.discount)}</span></div>
                  )}
                  <div className="flex justify-between border-t border-ink/10 pt-2 font-display text-lg font-semibold text-ink">
                    <span>Total</span><span className="text-spice">{gbp(order.total)}</span>
                  </div>
                  {order.loyalty > 0 && (
                    <p className="pt-1 text-xs text-leaf">You earned {gbp(order.loyalty)} in loyalty credits.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-8 flex flex-col items-center gap-3">
            <a href={site.phoneHref} className="flex items-center gap-2 text-sm text-cocoa/75 hover:text-spice">
              <Phone className="h-4 w-4" /> Questions? Call us on {site.phone}
            </a>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/menu" className="btn-ghost">Order Again</Link>
              <Link href="/" className="btn-primary">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-ivory p-4">
      <span className="mt-0.5">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-widest text-clay">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}
