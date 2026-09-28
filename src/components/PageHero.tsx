import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Motion";
import { SetHeaderTone } from "@/lib/headerTheme";

export function PageHero({
  kicker,
  title,
  intro,
  image,
  crumbs,
}: {
  kicker: string;
  title: string;
  intro?: string;
  image: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden pt-[84px] lg:min-h-[64vh]">
      <SetHeaderTone tone="dark" />
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark via-maroon/85 to-maroon/50" />
      <div className="absolute inset-0 bg-ink/25" />
      <div className="grain pointer-events-none absolute inset-0 opacity-30" />

      <div className="container-x relative z-10 pb-14 text-cream lg:pb-20">
        {crumbs && (
          <nav className="mb-5 flex items-center gap-2 text-xs text-cream/70">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="hover:text-cream">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-cream/90">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-cream/40">/</span>}
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          <span className="kicker text-saffron">
            <span className="h-px w-8 bg-saffron" />
            {kicker}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-cream/80">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
