import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Maaya of Bath handles your information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper pt-[84px]">
      <div className="container-x max-w-prose py-16 lg:py-24">
        <span className="kicker">
          <span className="h-px w-6 bg-spice" /> Privacy
        </span>
        <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Privacy Policy</h1>

        <div className="mt-8 space-y-6 text-cocoa/80">
          <p>
            Maaya of Bath respects your privacy. This policy explains what we collect when you use
            this website, why we collect it and how we look after it.
          </p>

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">What we collect</h2>
            <p className="mt-3">
              When you place an order, book a table or send a message, we collect the details you
              give us, such as your name, phone number, email and, for delivery, your address. We use
              these only to fulfil your request and to contact you about it.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">How we use it</h2>
            <p className="mt-3">
              Your information is used to process orders and reservations, to answer enquiries and to
              provide our service. We do not sell your data. We keep it only as long as needed for
              these purposes and to meet our legal duties.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Your choices</h2>
            <p className="mt-3">
              You can ask us what information we hold about you and request that it be corrected or
              removed. To do so, contact us using the details below.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Contact</h2>
            <p className="mt-3">
              Maaya, {site.address.full}. Call {site.phone} or email{" "}
              <a href={`mailto:${site.email}`} className="text-spice underline-offset-2 hover:underline">
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
