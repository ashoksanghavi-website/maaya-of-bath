import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="bg-paper pt-[84px]">
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center gap-6 py-24 text-center">
        <span className="kicker">
          <span className="h-px w-6 bg-spice" /> Page Not Found
        </span>
        <h1 className="font-display text-6xl font-semibold sm:text-7xl">404</h1>
        <p className="max-w-md text-cocoa/70">
          This page has slipped off the menu. Let us take you back to somewhere tasty.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/menu" className="btn-ghost">
            See the Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
