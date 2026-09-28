"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getAssistantReply, type AssistantReply } from "@/lib/assistant";
import { gbp } from "@/lib/format";
import { Close, ArrowRight } from "@/components/icons";

type Msg = {
  role: "user" | "bot";
  reply?: AssistantReply;
  text?: string;
};

const quickReplies = [
  "Most popular dishes",
  "Opening hours",
  "Delivery & offers",
  "Book a table",
  "Vegan options",
];

const greeting: AssistantReply = {
  text: "Hi, I am the Maaya Assistant. Ask me about the menu, prices, opening hours, delivery or booking a table.",
};

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", reply: greeting }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setInput("");
    setTyping(true);
    const reply = getAssistantReply(clean);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "bot", reply }]);
    }, 550 + Math.random() * 400);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat assistant"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        className="fixed bottom-5 right-5 z-[65] grid h-14 w-14 place-items-center rounded-full bg-spice text-cream shadow-lift transition-colors hover:bg-spice-dark sm:bottom-6 sm:right-6"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <Close className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <ChatGlyph />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-saffron" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="fixed bottom-24 right-4 z-[65] flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-[24px] border border-ink/10 bg-cream shadow-lift sm:right-6"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 bg-maroon px-5 py-4 text-cream">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-cream/15">
                <ChatGlyph className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold leading-none">Maaya Assistant</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-cream/70">
                  <span className="inline-block h-2 w-2 rounded-full bg-leaf" /> Online now
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="ml-auto grid h-8 w-8 place-items-center rounded-full hover:bg-cream/10">
                <Close className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-paper px-4 py-5">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={`max-w-[85%] ${m.role === "user" ? "" : "w-full"}`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-spice text-cream"
                          : "border border-ink/8 bg-ivory text-cocoa"
                      }`}
                    >
                      {m.role === "user" ? m.text : m.reply?.text}
                    </div>

                    {m.reply?.items && m.reply.items.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {m.reply.items.map((it) => (
                          <Link
                            key={it.slug}
                            href={`/menu/${it.slug}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between gap-2 rounded-xl border border-ink/8 bg-ivory px-3 py-2 text-sm transition-colors hover:border-spice"
                          >
                            <span className="truncate text-ink">{it.name}</span>
                            <span className="shrink-0 font-semibold text-spice">{gbp(it.price)}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {m.reply?.links && m.reply.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.reply.links.map((l) =>
                          l.href.startsWith("/") ? (
                            <Link
                              key={l.label}
                              href={l.href}
                              onClick={() => setOpen(false)}
                              className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-cream transition-colors hover:bg-maroon"
                            >
                              {l.label} <ArrowRight className="h-3 w-3" />
                            </Link>
                          ) : (
                            <a
                              key={l.label}
                              href={l.href}
                              className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-cream transition-colors hover:bg-maroon"
                            >
                              {l.label}
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl border border-ink/8 bg-ivory px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-clay"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 border-t border-ink/8 bg-paper px-4 pb-2 pt-3">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-ink/15 bg-ivory px-3 py-1.5 text-xs text-cocoa transition-colors hover:border-spice hover:text-spice"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-ink/10 bg-cream px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the menu, hours, delivery..."
                className="flex-1 rounded-full border border-ink/15 bg-ivory px-4 py-2.5 text-sm outline-none placeholder:text-clay focus:border-spice"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-spice text-cream transition-colors hover:bg-spice-dark"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatGlyph({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 5h16v11H8l-4 3V5Z" />
      <path d="M9 10h.01M12 10h.01M15 10h.01" />
    </svg>
  );
}
