import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Motion";
import { Accordion } from "@/components/Accordion";
import { story, faqs } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Maaya, a contemporary Indian and Asian tapas bar bringing the flavours and street food of India to Bath.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Our Story"
        title="A fusion of Asian flavour, in Bath"
        intro="A whole new concept of tapas bar, developed for guests visiting the beautiful city of Bath, with a view to great food, drinks, hospitality and a truly unique ambiance."
        image="/images/ambiance/interior-header.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="bg-paper py-14 lg:py-20">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] shadow-card">
              <Image src="/images/drinks/mixing-a-cocktail.jpg" alt="Craft at the Maaya bar" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              kicker="The Concept"
              title="Not a formal restaurant, a tapas bar with soul"
              intro="As the name suggests, we are relaxed. All the activity, including ordering, runs through the bar. So enjoy a drink or two and feel the unique Asian tapas bar experience."
            />
            <p className="mt-5 text-pretty leading-relaxed text-cocoa/80">
              A glance at the menu shows our aim, a fusion of Asian flavour in our cuisine. It might
              seem an unusual union between vibrant Indian and South East Asian tapas, but it is
              surprisingly right. We use top quality local and imported produce and the freshest
              ingredients, so you always receive the best taste.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="container-x">
          <SectionHeading align="center" kicker="How It Began" title="The making of Maaya" />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {story.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="relative">
                <div className="flex h-full flex-col rounded-[22px] border border-ink/8 bg-ivory p-7 shadow-soft">
                  <span className="text-xs font-semibold uppercase tracking-widest text-spice">{s.year}</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa/75">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-14 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading kicker="Good to Know" title="Questions, answered" />
            <p className="mt-5 text-cocoa/80">
              A few things guests often ask. If there is anything else, our team is always happy to help.
            </p>
            <Link href="/contact" className="btn-dark mt-8">Ask Us Anything</Link>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
