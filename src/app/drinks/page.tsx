import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Motion";
import { Marquee } from "@/components/Marquee";
import { drinkGroups } from "@/data/drinks";

export const metadata: Metadata = {
  title: "Drinks & Cocktail Bar",
  description:
    "Signature and classic cocktails, exclusive wines and alcohol free creations at Maaya's cocktail bar in Bath.",
};

export default function DrinksPage() {
  return (
    <>
      <PageHero
        kicker="The Cocktail Bar"
        title="Poured with craft"
        intro="A balance of signature and traditional cocktails, exclusive wines and alcohol free creations. Cannot find your tipple? Our bartenders will blend you something special."
        image="/images/drinks/mixing-drinks.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Drinks" }]}
      />

      <Marquee items={["Signature Cocktails", "Exclusive Wines", "Zero Proof", "Off Menu Creations", "Craft Serves"]} tone="ink" />

      <div className="bg-paper">
        {drinkGroups.map((group, idx) => (
          <section key={group.id} className="border-b border-ink/8 py-16 lg:py-24">
            <div className="container-x grid items-center gap-12 lg:grid-cols-2">
              <Reveal
                className={`relative aspect-[4/3] overflow-hidden rounded-[26px] shadow-card ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={group.image}
                  alt={group.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </Reveal>

              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <SectionHeading kicker={group.kicker} title={group.title} intro={group.blurb} />
                <ul className="mt-8 divide-y divide-ink/8">
                  {group.drinks.map((d) => (
                    <li key={d.name} className="flex items-start justify-between gap-6 py-4">
                      <div>
                        <p className="font-display text-lg font-semibold">{d.name}</p>
                        <p className="mt-1 text-sm text-cocoa/70">{d.note}</p>
                      </div>
                      <span className="shrink-0 font-display text-lg font-semibold text-spice">
                        {d.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-cream py-20">
        <div className="container-x text-center">
          <SectionHeading
            align="center"
            kicker="Pair It Up"
            title="Every drink has a plate to meet it"
            intro="Wet your appetite at the bar, then order a spread of Asian tapas to go with it."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/menu" className="btn-primary">Explore the Food Menu</Link>
            <Link href="/reservations" className="btn-ghost">Book a Table</Link>
          </div>
        </div>
      </section>
    </>
  );
}
