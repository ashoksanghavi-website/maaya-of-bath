import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/Marquee";
import { DishCard } from "@/components/DishCard";
import { SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { MaayaTestimonials } from "@/components/testimonials/MaayaTestimonials";
import { Gallery } from "@/components/home/Gallery";
import { menu } from "@/data/menu";
import { values } from "@/data/content";
import { site } from "@/data/site";
import { ArrowRight, Check } from "@/components/icons";

const featuredSlugs = [
  "paneer-65",
  "north-indian-butter-chicken",
  "crispy-lamb",
  "samosa-chaat",
  "chilli-paneer-dry",
  "devilled-king-prawns",
];
const featured = featuredSlugs
  .map((s) => menu.find((m) => m.slug === s))
  .filter(Boolean) as typeof menu;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* INTRO */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[26px] shadow-card">
              <Image
                src="/images/ambiance/asian-indian-tapas.jpg"
                alt="A spread of Indian and Asian tapas"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 w-40 rounded-2xl bg-spice p-5 text-cream shadow-lift sm:w-48">
              <p className="font-display text-4xl font-semibold">40+</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-cream/80">
                Plates to share
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              kicker="Welcome to Maaya"
              title="Indian cuisine, discovered in an enlightened way"
              intro="Indian food is so much more than curry, rice and naan. Across the country there is a whole world of tapas and street food, loved by everyone. Our chefs have picked a few of India's little gems for you to enjoy."
            />
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Authentic Indian curries",
                "Indian and Asian tapas",
                "Indian street food and chaat",
                "Biriyani, noodles and fried rice",
                "Signature cocktail bar",
                "Vegan and gluten free choices",
              ].map((point) => (
                <StaggerItem key={point} className="flex items-center gap-3 text-cocoa/85">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-spice/12 text-spice">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm">{point}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/about" className="btn-dark">
                Our Story
              </Link>
              <Link href="/menu" className="btn-ghost">
                See the Full Menu <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              kicker="Guest Favourites"
              title="The plates everyone keeps ordering"
              intro="A taste of what is waiting. Add them to your basket for collection or delivery, or save them for the table."
            />
            <Link
              href="/menu"
              className="hidden shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-widest text-spice hover:gap-3 sm:inline-flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <StaggerItem key={item.slug} className="h-full">
                <DishCard item={item} />
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-10 text-center sm:hidden">
            <Link href="/menu" className="btn-primary">
              View Full Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STREET FOOD BANNER */}
      <section className="relative overflow-hidden bg-maroon py-16 text-cream lg:py-20">
        <div className="grain pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              kicker="The Chaat Counter"
              title="Street food that tastes like a trip to India"
              intro="Sweet, tangy and full of crunch. From paani puri to samosa chaat, this is the noise and colour of an Indian bazaar, plated for Bath."
              tone="cream"
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu#street-food" className="btn-gold">
                Explore Street Food
              </Link>
              <Link href="/reservations" className="btn-ghost border-cream/30 text-cream hover:border-saffron hover:text-saffron">
                Book a Table
              </Link>
            </div>
          </div>
          <Reveal className="grid grid-cols-2 gap-4" y={40}>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[22px] shadow-lift">
              <Image src="/images/dishes/samosa-chaat.webp" alt="Samosa chaat" fill sizes="30vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] shadow-lift">
              <Image src="/images/ambiance/indian-street-food.jpg" alt="Indian street food" fill sizes="30vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* COCKTAILS */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <Reveal className="order-2 grid grid-cols-2 gap-4 lg:order-1">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] shadow-card">
              <Image src="/images/drinks/fancy-cocktail.jpg" alt="Signature cocktail" fill sizes="30vw" className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[22px] shadow-card">
              <Image src="/images/drinks/mint-ice-gin.webp" alt="Gin with mint and ice" fill sizes="30vw" className="object-cover" />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              kicker="The Bar Leads the Room"
              title="Signature cocktails, exclusive wines"
              intro="A balance of signature and traditional cocktails, exclusive wines, hot and cold drinks and alcohol free creations. Cannot find your tipple? Our bartenders happily go off menu and blend you something special."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { k: "Signature", v: "House creations" },
                { k: "Wines", v: "By glass or bottle" },
                { k: "Zero Proof", v: "Nothing missing" },
              ].map((c) => (
                <div key={c.k} className="rounded-2xl border border-ink/10 bg-ivory p-4">
                  <p className="font-display text-lg font-semibold text-spice">{c.k}</p>
                  <p className="mt-1 text-xs text-cocoa/70">{c.v}</p>
                </div>
              ))}
            </div>
            <Link href="/drinks" className="btn-dark mt-8">
              See the Drinks Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading
            align="center"
            kicker="Why Maaya"
            title="A wealth of choice, a fantastic atmosphere"
            intro="The perfect place to eat, drink and relax in Bath. Premium yet informal, with a warm welcome every time."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <StaggerItem key={v.title} className="h-full">
                <div className="flex h-full flex-col rounded-[22px] border border-ink/8 bg-ivory p-7 shadow-soft transition-transform duration-500 hover:-translate-y-1">
                  <span className="font-display text-3xl font-semibold text-spice/30">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa/75">{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading
            align="center"
            kicker="Kind Words"
            title="Loved by Bath, and beyond"
            intro="A few words from guests who have shared our table. Use the arrows to read more."
          />
          <div className="mx-auto mt-14 max-w-5xl">
            <MaayaTestimonials />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-paper py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading
            kicker="A Glimpse Inside"
            title="The Maaya table"
            intro="A little of the colour, warmth and craft you will find when you visit. Tap any image to take a closer look."
            align="center"
          />
          <Gallery />
        </div>
      </section>

      {/* VISIT CTA */}
      <section className="bg-cream pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[30px] bg-ink px-6 py-16 text-center text-cream sm:px-16 sm:py-20">
            <div className="grain pointer-events-none absolute inset-0 opacity-30" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-spice/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-saffron/20 blur-3xl" />
            <div className="relative">
              <span className="kicker justify-center text-saffron">
                <span className="h-px w-8 bg-saffron" /> Come and Sit With Us
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Your table in the heart of Bath is waiting
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-cream/75">
                {site.address.full}. {site.hoursShort}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/reservations" className="btn-primary">
                  Book a Table
                </Link>
                <Link href="/menu" className="btn-gold">
                  Order Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
