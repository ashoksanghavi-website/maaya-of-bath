import Link from "next/link";
import { nav, site } from "@/data/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "./forms/NewsletterForm";
import { Pin, Phone, Mail, Clock, Instagram, Facebook, ArrowUpRight } from "./icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon text-cream">
      <div className="grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-spice/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-40 h-72 w-72 rounded-full bg-saffron/15 blur-3xl" />

      {/* CTA band */}
      <div className="container-x relative border-b border-cream/12 py-14 lg:py-16">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <span className="kicker text-saffron">
              <span className="h-px w-8 bg-saffron" /> Come and Sit With Us
            </span>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
              A table in the heart of Bath is waiting
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/reservations" className="btn-gold">
              Book a Table <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/menu" className="btn border border-cream/30 text-cream hover:border-saffron hover:text-saffron">
              Order Online
            </Link>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="container-x relative py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div>
            <Logo tone="cream" />
            <p className="mt-6 max-w-xs text-pretty text-sm leading-relaxed text-cream/70">
              An upmarket Indian and Asian tapas dining experience in the heart of Bath. Small plates,
              one pot mains and a bar built for lingering.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition-colors hover:border-saffron hover:text-saffron">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={site.social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition-colors hover:border-saffron hover:text-saffron">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <NewsletterForm />
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-saffron">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/75">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline transition-colors hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-saffron">Opening</h4>
            <ul className="mt-5 space-y-2 text-sm text-cream/75">
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <span>12 noon to 10:30pm<br /> every day</span>
              </li>
              <li className="pl-6 text-cream/60">Closed Tuesdays</li>
              <li className="pl-6 text-cream/60">Last food orders 10:30pm</li>
              <li className="pl-6 text-cream/60">Delivery from 4:30pm</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-saffron">Find Us</h4>
            <ul className="mt-5 space-y-4 text-sm text-cream/75">
              <li className="flex items-start gap-3">
                <Pin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <span>{site.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-saffron" />
                <a href={site.phoneHref} className="hover:text-cream">{site.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-saffron" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-cream">{site.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="container-x relative">
        <div className="select-none border-t border-cream/12 pt-8 text-center">
          <span className="block font-display text-[22vw] font-semibold leading-none text-cream/[0.06] lg:text-[16rem]">
            Maaya
          </span>
        </div>
      </div>

      <div className="container-x relative flex flex-col items-center justify-between gap-4 pb-10 text-xs text-cream/55 sm:flex-row">
        <p>© {new Date().getFullYear()} Maaya of Bath. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-cream">Privacy Policy</Link>
          <span>Crafted with care in Bath</span>
        </div>
      </div>
    </footer>
  );
}
