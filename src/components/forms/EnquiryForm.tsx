"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "@/components/icons";

export function EnquiryForm({ variant = "contact" }: { variant?: "contact" | "event" }) {
  const isEvent = variant === "event";
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, boolean> = {};
    if (!form.name.trim()) err.name = true;
    if (!form.email.includes("@")) err.email = true;
    if (!form.message.trim()) err.message = true;
    if (isEvent && !form.date) err.date = true;
    setErrors(err);
    if (Object.keys(err).length) return;
    setDone(true);
  };

  const inputCls = (bad?: boolean) =>
    `w-full rounded-xl border bg-ivory px-4 py-3 text-sm outline-none transition-colors placeholder:text-clay focus:border-spice ${
      bad ? "border-spice" : "border-ink/15"
    }`;

  return (
    <div className="card-surface overflow-hidden">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="d" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-8 text-center sm:p-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf text-cream">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="mt-6 font-display text-3xl font-semibold">Message sent</h3>
            <p className="mx-auto mt-3 max-w-md text-cocoa/75">
              Thank you {form.name.split(" ")[0]}. We have received your {isEvent ? "enquiry" : "message"} and will be in touch very soon.
            </p>
            <button onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", date: "", guests: "", message: "" }); }} className="btn-ghost mt-8">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submit} className="p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Name</label>
                <input value={form.name} onChange={set("name")} className={inputCls(errors.name)} placeholder="Your name" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Email</label>
                <input value={form.email} onChange={set("email")} className={inputCls(errors.email)} placeholder="you@email.com" />
              </div>
              <div className={isEvent ? "" : "sm:col-span-2"}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Phone</label>
                <input value={form.phone} onChange={set("phone")} className={inputCls()} placeholder="07123 456789" />
              </div>

              {isEvent && (
                <>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Preferred date</label>
                    <input type="date" value={form.date} onChange={set("date")} className={inputCls(errors.date)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Approx guests</label>
                    <input value={form.guests} onChange={set("guests")} className={inputCls()} placeholder="e.g. 20 to 30" />
                  </div>
                </>
              )}

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cocoa/70">Message</label>
                <textarea value={form.message} onChange={set("message")} rows={5} className={inputCls(errors.message) + " resize-none"} placeholder={isEvent ? "Tell us about your event" : "How can we help?"} />
              </div>
            </div>

            {Object.keys(errors).length > 0 && (
              <p className="mt-4 text-sm text-spice">Please complete the highlighted fields.</p>
            )}

            <button type="submit" className="btn-primary mt-6 w-full">
              {isEvent ? "Send Enquiry" : "Send Message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
