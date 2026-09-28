import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "A La Carte Menu",
  description:
    "Explore Maaya's full menu of Indian and Asian tapas, street food, signature curries, biriyani, breads and desserts. Order for collection or delivery in Bath.",
};

const perks = [
  { big: "20%", label: "Off every collection order" },
  { big: "20%", label: "Off delivery orders over £15" },
  { big: "10%", label: "Back as loyalty credits" },
  { big: "3mi", label: "Delivery across central Bath" },
];

export default function MenuPage() {
  return (
    <>
      <PageHero
        kicker="A La Carte"
        title="The Maaya Menu"
        intro="Small plates of Asian comfort food and street food, elevated by technique but primal in appeal. Build a spread to share, then order for collection or delivery."
        image="/images/ambiance/asian-tapas.webp"
        crumbs={[{ label: "Home", href: "/" }, { label: "Menu" }]}
      />

      {/* Perks strip */}
      <section className="border-b border-ink/8 bg-ink text-cream">
        <div className="container-x grid grid-cols-2 divide-x divide-cream/10 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-1 px-4 py-6 text-center">
              <span className="font-display text-3xl font-semibold text-saffron sm:text-4xl">{p.big}</span>
              <span className="text-xs text-cream/70 sm:text-sm">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-paper pb-24">
        <MenuExplorer />

        <div className="container-x mt-10">
          <div className="rounded-[22px] border border-ink/10 bg-ivory p-6 text-sm text-cocoa/70 sm:p-8">
            <p className="font-semibold text-ink">Allergies and dietary needs</p>
            <p className="mt-2 max-w-3xl leading-relaxed">
              We cannot guarantee non cross contamination of dishes and 100 percent gluten free
              cannot be guaranteed. Dishes may contain nut traces. If you have an allergy that could
              affect your health, please contact us before ordering. {site.serviceCharge}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
