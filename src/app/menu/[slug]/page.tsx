import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getItem, menu, tagLabels } from "@/data/menu";
import { AddToCartPanel } from "@/components/AddToCart";
import { DishCard } from "@/components/DishCard";
import { SpiceMeter } from "@/components/ui";
import { Reveal } from "@/components/Motion";
import { ArrowRight, Leaf } from "@/components/icons";

export function generateStaticParams() {
  return menu.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getItem(params.slug);
  if (!item) return { title: "Dish not found" };
  return {
    title: item.name,
    description: item.short,
  };
}

export default function DishPage({ params }: { params: { slug: string } }) {
  const item = getItem(params.slug);
  if (!item) notFound();

  const related = menu
    .filter((m) => m.category === item.category && m.slug !== item.slug)
    .slice(0, 4);

  return (
    <>
      <div className="bg-paper pt-[84px]">
        <div className="container-x py-6">
          <nav className="flex items-center gap-2 text-xs text-cocoa/60">
            <Link href="/" className="hover:text-spice">Home</Link>
            <span>/</span>
            <Link href="/menu" className="hover:text-spice">Menu</Link>
            <span>/</span>
            <span className="text-cocoa/90">{item.name}</span>
          </nav>
        </div>

        <div className="container-x grid gap-10 pb-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-[28px] shadow-card lg:sticky lg:top-24">
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              {item.tags.includes("popular") && (
                <span className="absolute left-5 top-5 rounded-full bg-spice px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cream">
                  Most Popular
                </span>
              )}
            </div>
          </Reveal>

          <div className="flex flex-col">
            <span className="kicker">
              <span className="h-px w-6 bg-spice" />
              {menu.find((m) => m.slug === item.slug)?.category.replace("-", " ")}
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {item.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <SpiceMeter level={item.spice} />
              <div className="flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-cocoa"
                  >
                    {(t === "veg" || t === "vegan") && <Leaf className="h-3 w-3 text-leaf" />}
                    {tagLabels[t]}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-cocoa/80">
              {item.description}
            </p>

            {item.pairing && (
              <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8a6410]">
                  Perfect With
                </p>
                <p className="mt-1 text-cocoa">{item.pairing}</p>
              </div>
            )}

            <div className="mt-8">
              <AddToCartPanel item={item} />
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-cream py-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="kicker">
                  <span className="h-px w-6 bg-spice" /> You Might Also Like
                </span>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  More from this course
                </h2>
              </div>
              <Link
                href="/menu"
                className="hidden items-center gap-2 text-sm font-semibold uppercase tracking-widest text-spice hover:gap-3 sm:inline-flex"
              >
                Full menu <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <DishCard key={r.slug} item={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
