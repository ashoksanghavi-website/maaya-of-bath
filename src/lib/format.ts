// Shared, framework-neutral formatting helpers. Kept out of any "use client"
// module so server components can import them as real functions.
export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);
