import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/data/menu";
import { gbp } from "@/lib/format";
import { QuickAdd } from "./AddToCart";
import { SpiceMeter, Tag } from "./ui";

export function DishCard({ item }: { item: MenuItem }) {
  const priceLabel = item.variants?.length ? `from ${gbp(item.price)}` : gbp(item.price);
  const topTag = item.tags.find((t) => t === "popular" || t === "new" || t === "chef");
  const dietTags = item.tags.filter((t) => t === "veg" || t === "vegan" || t === "gf" || t === "df").slice(0, 3);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-ink/8 bg-ivory shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-spice/30 hover:shadow-lift">
      <Link href={`/menu/${item.slug}`} className="relative block aspect-[16/11] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {topTag && (
          <span className="absolute left-3 top-3">
            <Tag tag={topTag} />
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 min-h-[2.6rem] font-display text-lg font-semibold leading-snug text-ink">
            <Link href={`/menu/${item.slug}`} className="transition-colors hover:text-spice">
              {item.name}
            </Link>
          </h3>
          <span className="mt-1 shrink-0">
            <SpiceMeter level={item.spice} />
          </span>
        </div>

        <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-cocoa/70">
          {item.short}
        </p>

        <div className="mt-3 flex min-h-[1.75rem] flex-wrap items-center gap-1.5">
          {dietTags.map((t) => (
            <Tag key={t} tag={t} />
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-ink/8 pt-4">
          <span className="font-display text-xl font-semibold text-spice">{priceLabel}</span>
          <QuickAdd item={item} />
        </div>
      </div>
    </article>
  );
}
