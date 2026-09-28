"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, Pin } from "@/components/icons";
import { site } from "@/data/site";

const times = ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const sizes = ["1", "2", "3", "4", "5", "6", "7", "8+"];

export function ReservationForm() {
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState("");
  const [form, setForm] = useState({
    date: "",
    time: "19:00",
    guests: "2",
    name: "",
    phone: "",
    email: "",
    occasion: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, boolean> = {};
    if (!form.date) err.date = true;
    if (!form.name.trim()) err.name = true;
    if (!form.phone.trim()) err.phone = true;
    if (!form.email.includes("@")) err.email = true;
    setErrors(err);
    if (Object.keys(err).length) return;
    setRef("MB" + Math.floor(10000 + Math.random() * 90000));
    setDone(true);
  };

  const inputCls = (bad?: boolean) =>
    `w-full rounded-xl border bg-ivory px-4 py-3 text-sm outline-none transition-colors placeholder:text-clay focus:border-spice ${
      bad ? "border-spice" : "border-ink/15"
    }`;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="card-surface overflow-hidden">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 text-center sm:p-12"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf text-cream">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="mt-6 font-display text-3xl font-semibold">Table requested</h3>
            <p className="mx-auto mt-3 max-w-md text-cocoa/75">
              Thank you {form.name.split(" ")[0]}. We have your request for {form.guests} on {form.date} at {form.time}. Our team will call {form.phone} shortly to confirm.
            </p>
            <p className="mt-4 inline-block rounded-full bg-spice/10 px-4 py-2 text-sm font-semibold text-spice">
              Reference {ref}
            </p>
            <div className="mt-6 flex flex-col items-center gap-1 text-sm text-cocoa/70">
              <span className="flex items-center gap-2"><Pin className="h-4 w-4 text-spice" /> {site.address.full}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-spice" /> Last food orders 10:30pm</span>
            </div>
            <button onClick={() => setDone(false)} className="btn-ghost mt-8">
              Make another booking
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={submit}
            className="p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Date</label>
                <input type="date" min={today} value={form.date} onChange={set("date")} className={inputCls(errors.date)} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Time</label>
                <select value={form.time} onChange={set("time")} className={inputCls()}>
                  {times.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Guests</label>
                <select value={form.guests} onChange={set("guests")} className={inputCls()}>
                  {sizes.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Full name</label>
                <input value={form.name} onChange={set("name")} className={inputCls(errors.name)} placeholder="Jane Smith" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Phone</label>
                <input value={form.phone} onChange={set("phone")} className={inputCls(errors.phone)} placeholder="07123 456789" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Email</label>
                <input value={form.email} onChange={set("email")} className={inputCls(errors.email)} placeholder="you@email.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Occasion (optional)</label>
                <input value={form.occasion} onChange={set("occasion")} className={inputCls()} placeholder="Birthday, anniversary, catch up" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Notes (optional)</label>
                <textarea value={form.notes} onChange={set("notes")} rows={3} className={inputCls() + " resize-none"} placeholder="Dietary needs, seating preference, anything else" />
              </div>
            </div>

            {Object.keys(errors).length > 0 && (
              <p className="mt-4 text-sm text-spice">Please complete the highlighted fields.</p>
            )}

            <button type="submit" className="btn-primary mt-6 w-full">
              Request Table
            </button>
            <p className="mt-3 text-center text-xs text-clay">
              A booking request is confirmed by our team by phone. For same day tables, please call {site.phone}.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
