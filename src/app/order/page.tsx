"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { gbp, useCart } from "@/lib/cart";
import { site } from "@/data/site";
import { Bag, Minus, Plus, Check, ArrowRight, Clock, Pin } from "@/components/icons";

const timeSlots = [
  "As soon as possible",
  "12:30",
  "13:00",
  "13:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const DELIVERY_MIN = 15;
const round2 = (n: number) => Math.round(n * 100) / 100;

export default function OrderPage() {
  const router = useRouter();
  const { lines, subtotal, setQty, remove, clear } = useCart();

  const [mode, setMode] = useState<"collection" | "delivery">("collection");
  const [slot, setSlot] = useState(timeSlots[0]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    postcode: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [placing, setPlacing] = useState(false);

  // Maaya's real offers: 20% off collection, 20% off delivery over £15.
  const discountEligible = mode === "collection" || subtotal >= DELIVERY_MIN;
  const discount = discountEligible ? round2(subtotal * 0.2) : 0;
  const total = round2(subtotal - discount);
  const loyalty = round2(total * 0.1);
  const belowDeliveryMin = mode === "delivery" && subtotal < DELIVERY_MIN;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!form.name.trim()) e.name = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.email.trim() || !form.email.includes("@")) e.email = true;
    if (mode === "delivery") {
      if (!form.address.trim()) e.address = true;
      if (!form.postcode.trim()) e.postcode = true;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (belowDeliveryMin) return;
    if (!validate()) return;
    setPlacing(true);
    const order = {
      ref: "MY" + Math.floor(100000 + Math.random() * 900000),
      mode,
      slot,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: mode === "delivery" ? `${form.address}, ${form.postcode}` : site.address.full,
      lines,
      subtotal,
      discount,
      loyalty,
      total,
      placedAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem("maaya-last-order", JSON.stringify(order));
    } catch {
      /* ignore */
    }
    setTimeout(() => {
      clear();
      router.push("/order/confirmed");
    }, 900);
  };

  if (lines.length === 0 && !placing) {
    return (
      <div className="bg-paper pt-[84px]">
        <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-sand/60">
            <Bag className="h-10 w-10 text-clay" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-semibold">Your basket is empty</h1>
            <p className="mx-auto mt-3 max-w-md text-cocoa/70">
              Add a spread of small plates from the menu and come back to check out for collection or delivery.
            </p>
          </div>
          <Link href="/menu" className="btn-primary">
            Browse the Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const inputCls = (bad?: boolean) =>
    `w-full rounded-xl border bg-ivory px-4 py-3 text-sm outline-none transition-colors placeholder:text-clay focus:border-spice ${
      bad ? "border-spice" : "border-ink/15"
    }`;

  return (
    <div className="bg-paper pt-[84px]">
      <div className="container-x py-10 lg:py-14">
        <div className="mb-8">
          <span className="kicker">
            <span className="h-px w-6 bg-spice" /> Checkout
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Complete your order
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* LEFT: details */}
          <div className="space-y-6">
            {/* Order type */}
            <section className="card-surface p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold">How would you like it?</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {(["collection", "delivery"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-colors ${
                      mode === m
                        ? "border-spice bg-spice/6"
                        : "border-ink/12 hover:border-spice/50"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold capitalize">
                      {mode === m && <Check className="h-4 w-4 text-spice" />}
                      {m}
                    </span>
                    <span className="text-xs text-cocoa/70">
                      {m === "collection"
                        ? "20% off, ready at St James Parade"
                        : "20% off over £15, from 4:30pm"}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Time */}
            <section className="card-surface p-6 sm:p-7">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                <Clock className="h-5 w-5 text-spice" /> Choose a time
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      slot === t
                        ? "border-spice bg-spice text-cream"
                        : "border-ink/15 hover:border-spice"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            {/* Details */}
            <section className="card-surface p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold">Your details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">
                    Full name
                  </label>
                  <input value={form.name} onChange={set("name")} className={inputCls(errors.name)} placeholder="Jane Smith" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">
                    Phone
                  </label>
                  <input value={form.phone} onChange={set("phone")} className={inputCls(errors.phone)} placeholder="07123 456789" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">
                    Email
                  </label>
                  <input value={form.email} onChange={set("email")} className={inputCls(errors.email)} placeholder="you@email.com" />
                </div>

                {mode === "delivery" && (
                  <>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">
                        Delivery address
                      </label>
                      <input value={form.address} onChange={set("address")} className={inputCls(errors.address)} placeholder="12 Milsom Street" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">
                        Postcode
                      </label>
                      <input value={form.postcode} onChange={set("postcode")} className={inputCls(errors.postcode)} placeholder="BA1 1AA" />
                    </div>
                  </>
                )}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">
                    Notes for the kitchen
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={set("notes")}
                    rows={3}
                    className={inputCls() + " resize-none"}
                    placeholder="Allergies, spice preference, anything we should know"
                  />
                </div>
              </div>
              {Object.keys(errors).length > 0 && (
                <p className="mt-3 text-sm text-spice">Please fill in the highlighted fields.</p>
              )}
            </section>
          </div>

          {/* RIGHT: summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-surface overflow-hidden">
              <div className="border-b border-ink/10 px-6 py-5">
                <h2 className="font-display text-xl font-semibold">Order summary</h2>
              </div>

              <div className="max-h-[340px] space-y-4 overflow-y-auto px-6 py-5">
                {lines.map((line) => (
                  <div key={line.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image src={line.image} alt={line.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="truncate text-sm font-medium">{line.name}</p>
                      {line.variant && <p className="text-xs text-clay">{line.variant}</p>}
                      <div className="mt-auto flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1 rounded-full border border-ink/12">
                          <button onClick={() => setQty(line.id, line.qty - 1)} aria-label="Decrease" className="grid h-6 w-6 place-items-center">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-semibold">{line.qty}</span>
                          <button onClick={() => setQty(line.id, line.qty + 1)} aria-label="Increase" className="grid h-6 w-6 place-items-center">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-spice">{gbp(line.price * line.qty)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-ink/10 px-6 py-5 text-sm">
                <Row label="Subtotal" value={gbp(subtotal)} />
                {discount > 0 && (
                  <div className="flex items-center justify-between text-leaf">
                    <span>{mode === "collection" ? "Collection discount 20%" : "Delivery discount 20%"}</span>
                    <span className="font-medium">- {gbp(discount)}</span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between border-t border-ink/10 pt-3">
                  <span className="font-display text-lg font-semibold">Total</span>
                  <span className="font-display text-2xl font-semibold text-spice">{gbp(total)}</span>
                </div>
                <p className="pt-1 text-xs text-leaf">You will earn {gbp(loyalty)} in loyalty credits.</p>
              </div>

              <div className="px-6 pb-6">
                {belowDeliveryMin && (
                  <p className="mb-3 rounded-xl bg-spice/8 px-4 py-3 text-center text-xs text-spice">
                    Delivery orders have a £15 minimum. Add {gbp(DELIVERY_MIN - subtotal)} more, or switch to collection.
                  </p>
                )}
                <motion.button
                  onClick={placeOrder}
                  disabled={placing || belowDeliveryMin}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {placing ? "Placing order..." : (
                    <>
                      Place Order · {gbp(total)}
                    </>
                  )}
                </motion.button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-clay">
                  <Pin className="h-3.5 w-3.5" />
                  {mode === "collection" ? site.address.full : "Delivered to your door"}
                </p>
                <p className="mt-2 text-center text-[0.7rem] leading-relaxed text-clay">
                  This is a demonstration checkout. You pay in person on collection or delivery.
                </p>
              </div>
            </div>

            <Link href="/menu" className="mt-4 block text-center text-sm text-cocoa/70 hover:text-spice">
              Add more dishes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-cocoa/80">
      <span>{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
