import Link from "next/link";

export function Logo({
  tone = "ink",
  compact = false,
}: {
  tone?: "ink" | "cream";
  compact?: boolean;
}) {
  const color = tone === "cream" ? "text-cream" : "text-ink";
  const sub = tone === "cream" ? "text-cream/60" : "text-clay";
  return (
    <Link href="/" aria-label="Maaya home" className={`group flex items-center gap-3 ${color}`}>
      <span aria-hidden className="relative grid h-10 w-10 place-items-center">
        <svg viewBox="0 0 44 44" className="h-10 w-10">
          <circle
            cx="22"
            cy="22"
            r="20.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-40"
          />
          <path
            d="M22 8c4 6 4 10 0 14-4-4-4-8 0-14Z"
            fill="currentColor"
            className="text-spice"
          />
          <path
            d="M22 36c-4-6-4-10 0-14 4 4 4 8 0 14Z"
            fill="currentColor"
            className="text-saffron opacity-90"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-semibold tracking-tight">Maaya</span>
        {!compact && (
          <span className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-widest ${sub}`}>
            The Little India
          </span>
        )}
      </span>
    </Link>
  );
}
