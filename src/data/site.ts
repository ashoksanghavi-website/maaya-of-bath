export const site = {
  name: "Maaya",
  tagline: "The Little India",
  subtitle: "Indian & Asian Tapas · Cocktail Bar · Bath",
  description:
    "An upmarket Indian and Asian tapas dining experience in the heart of Bath. Small plates, one pot mains, street food and a bar of signature cocktails.",
  address: {
    line1: "43 St James Parade",
    city: "Bath",
    postcode: "BA1 1UQ",
    full: "43 St James Parade, Bath, BA1 1UQ",
  },
  phone: "01225 481414",
  phoneHref: "tel:+441225481414",
  email: "maayaofbath@gmail.com",
  hours: [
    { day: "Monday", time: "12:00 to 22:30" },
    { day: "Tuesday", time: "Closed" },
    { day: "Wednesday", time: "12:00 to 22:30" },
    { day: "Thursday", time: "12:00 to 22:30" },
    { day: "Friday", time: "12:00 to 22:30" },
    { day: "Saturday", time: "12:00 to 22:30" },
    { day: "Sunday", time: "12:00 to 22:30" },
  ],
  hoursShort: "Open 12 noon to 10:30pm every day. Closed Tuesdays.",
  lastOrders: "Last food orders are taken at 10:30pm. The bar keeps pouring until close.",
  serviceCharge: "An optional service charge of 12.5% is added to your bill. Every penny goes to our team.",
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tripadvisor: "https://www.tripadvisor.co.uk/",
    google: "https://g.page/r/CdgWuG9vs-GnEAg/review",
  },
  mapEmbed:
    "https://www.google.com/maps?q=43+St+James+Parade,+Bath+BA1+1UQ&output=embed",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Drinks", href: "/drinks" },
  { label: "Reservations", href: "/reservations" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
