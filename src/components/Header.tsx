"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/data/site";
import { useCart } from "@/lib/cart";
import { useHeaderTone } from "@/lib/headerTheme";
import { Logo } from "./Logo";
import { Bag, Menu, Close, Phone } from "./icons";

export function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const tone = useHeaderTone();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openNow, setOpenNow] = useState<boolean | null>(null);

  // Live open status: 12:00 to 22:30 daily, closed Tuesdays. Computed after
  // mount to avoid a server and client mismatch.
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const day = now.getDay(); // 0 Sun ... 2 Tue
      const mins = now.getHours() * 60 + now.getMinutes();
      setOpenNow(day !== 2 && mins >= 720 && mins <= 1350);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // On a dark hero and not yet scrolled, render light controls over the image.
  const onDark = tone === "dark" && !scrolled;
  const solid = scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
        solid
          ? "border-b border-gold/25 bg-cream/92 shadow-[0_12px_44px_-30px_rgba(58,26,12,0.6)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Scrim for legibility over dark hero imagery */}
      {onDark && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-transparent" />
      )}

      <div className="container-x relative flex h-[84px] items-center justify-between">
        <Logo tone={onDark ? "cream" : "ink"} />

        <nav
          className={`hidden items-center gap-1 rounded-full px-1.5 py-1.5 lg:flex ${
            solid ? "" : onDark ? "bg-white/10 backdrop-blur-md" : "bg-ink/[0.04]"
          }`}
        >
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const base = onDark ? "text-cream/85" : "text-ink/75";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-[0.82rem] font-medium tracking-wide transition-colors ${
                  active
                    ? onDark
                      ? "text-cream"
                      : "text-spice"
                    : `${base} hover:${onDark ? "text-cream" : "text-ink"}`
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full ${
                      onDark ? "bg-white/15" : "bg-spice/10"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {openNow !== null && (
            <span
              className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium xl:inline-flex ${
                onDark ? "bg-white/12 text-cream" : "bg-ink/[0.05] text-cocoa"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${openNow ? "bg-leaf" : "bg-clay"}`} />
              {openNow ? "Open now" : "Closed"}
            </span>
          )}
          <a
            href={site.phoneHref}
            className={`hidden items-center gap-2 text-sm font-medium transition-colors xl:flex ${
              onDark ? "text-cream/85 hover:text-cream" : "text-ink/80 hover:text-spice"
            }`}
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>

          <Link
            href="/reservations"
            className="btn-gold hidden px-5 py-2.5 text-xs sm:inline-flex"
          >
            Book a Table
          </Link>

          <button
            onClick={openCart}
            aria-label="Open basket"
            className={`relative grid h-11 w-11 place-items-center rounded-full border transition-colors ${
              onDark
                ? "border-cream/40 text-cream hover:border-cream hover:bg-white/10"
                : "border-ink/15 text-ink hover:border-spice hover:text-spice"
            }`}
          >
            <Bag className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-spice px-1 text-[0.62rem] font-bold text-cream"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
              onDark ? "border-cream/40 text-cream" : "border-ink/15 text-ink"
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-cream p-6"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15"
                >
                  <Close className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-ink/8 py-4 font-display text-2xl text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-3 pt-8">
                <Link href="/reservations" className="btn-primary w-full">
                  Book a Table
                </Link>
                <Link href="/menu" className="btn-ghost w-full">
                  Order Online
                </Link>
                <a href={site.phoneHref} className="flex items-center justify-center gap-2 pt-2 text-sm text-cocoa">
                  <Phone className="h-4 w-4" /> {site.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
