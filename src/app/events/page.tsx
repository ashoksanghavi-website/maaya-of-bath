import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Private Events & Hire",
  description: "Host your celebration or private event at Maaya in Bath. Tapas feasts, a signature bar and a warm, characterful room.",
};

const occasions = [
  { title: "Birthdays & Celebrations", body: "Gather your favourite people around a table of small plates and let us handle the rest." },
  { title: "Work & Team Dinners", body: "Relaxed, generous and easy to share, ideal for bringing a team together." },
  { title: "Full Venue Hire", body: "Take the whole room for a party, complete with our bar and a tailored tapas spread." },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        kicker="Private Hire"
        title="Celebrate with us"
        intro="From intimate gatherings to a full venue takeover, we build every event around you. Tell us your date and numbers and we will do the rest."
        image="/images/ambiance/events.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading align="center" kicker="Occasions" title="A room made for gathering" />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {occasions.map((o, i) => (
              <StaggerItem key={o.title} className="h-full">
                <div className="flex h-full flex-col rounded-[22px] border border-ink/8 bg-ivory p-7 shadow-soft">
                  <span className="font-display text-3xl font-semibold text-spice/30">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa/75">{o.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[26px] shadow-card">
            <Image src="/images/ambiance/tapas-bath.webp" alt="Tapas spread for events" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          </Reveal>
          <div>
            <SectionHeading
              kicker="Enquire"
              title="Tell us about your event"
              intro="Share a few details and our team will come back with ideas, menus and availability."
            />
            <div className="mt-8">
              <EnquiryForm variant="event" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
