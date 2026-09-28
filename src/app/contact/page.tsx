import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/data/site";
import { Pin, Phone, Mail, Clock } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Maaya in Bath. Find us at 43 St James Parade, call 01225 481414 or send us a message.",
};

export default function ContactPage() {
  const details = [
    { icon: <Pin className="h-5 w-5 text-spice" />, title: "Address", lines: [site.address.line1, `${site.address.city}, ${site.address.postcode}`] },
    { icon: <Phone className="h-5 w-5 text-spice" />, title: "Phone", lines: [site.phone], href: site.phoneHref },
    { icon: <Mail className="h-5 w-5 text-spice" />, title: "Email", lines: [site.email], href: `mailto:${site.email}` },
    { icon: <Clock className="h-5 w-5 text-spice" />, title: "Hours", lines: ["12 noon to 10:30pm daily", "Closed Tuesdays"] },
  ];

  return (
    <>
      <PageHero
        kicker="Contact"
        title="We would love to hear from you"
        intro="Questions about the menu, a booking or an event? Drop us a line and we will get right back to you."
        image="/images/ambiance/contact.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-paper py-14 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.title} className="rounded-2xl border border-ink/8 bg-ivory p-6 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-spice/10">{d.icon}</span>
                  <p className="mt-4 font-display text-lg font-semibold">{d.title}</p>
                  <div className="mt-1 space-y-0.5 text-sm text-cocoa/75">
                    {d.lines.map((l) => (
                      <p key={l}>
                        {d.href ? (
                          <a href={d.href} className="hover:text-spice">{l}</a>
                        ) : (
                          l
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10">
              <iframe
                title="Maaya location"
                src={site.mapEmbed}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <span className="kicker">
              <span className="h-px w-6 bg-spice" /> Send a Message
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight">
              Get in contact
            </h2>
            <p className="mt-4 text-cocoa/80">
              Fill in the form and a member of our team will reply as soon as we can.
            </p>
            <div className="mt-8">
              <EnquiryForm variant="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
