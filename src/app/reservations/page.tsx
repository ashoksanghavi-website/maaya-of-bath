import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { site } from "@/data/site";
import { Clock, Pin, Phone } from "@/components/icons";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Book a table at Maaya, the Indian and Asian tapas cocktail bar in the heart of Bath.",
};

export default function ReservationsPage() {
  return (
    <>
      <PageHero
        kicker="Reservations"
        title="Reserve your table"
        intro="Walk ins are always welcome, but the best seats go fast. Tell us when you are coming and we will have everything ready."
        image="/images/ambiance/reservation.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Reservations" }]}
      />

      <section className="bg-paper py-14 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <span className="kicker">
              <span className="h-px w-6 bg-spice" /> Good to Know
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
              An easy, warm welcome every time
            </h2>
            <p className="mt-5 text-pretty text-cocoa/80">
              Please be advised that last food orders are taken at 10:30pm. We keep serving our
              cocktails and drinks until closing time, so there is no rush to leave.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: <Clock className="h-5 w-5 text-spice" />, title: "Opening hours", body: "12 noon to 10:30pm every day. Closed Tuesdays." },
                { icon: <Pin className="h-5 w-5 text-spice" />, title: "Where to find us", body: site.address.full },
                { icon: <Phone className="h-5 w-5 text-spice" />, title: "Same day tables", body: `Call us on ${site.phone} and we will squeeze you in.` },
              ].map((r) => (
                <div key={r.title} className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-ivory p-5">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-spice/10">
                    {r.icon}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold">{r.title}</p>
                    <p className="mt-1 text-sm text-cocoa/70">{r.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10">
              <iframe
                title="Maaya location"
                src={site.mapEmbed}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <ReservationForm />
        </div>
      </section>
    </>
  );
}
