# Maaya of Bath

A premium website for Maaya, the Indian and Asian tapas and cocktail bar in Bath.
Built with Next.js (App Router), React, TypeScript, Tailwind CSS and Framer Motion.

The site brings the ordering and product experience (previously on a third party
platform) natively into the design, with a full basket to checkout to confirmation
flow, plus reservations and event enquiries.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Pages

- `/` Home
- `/menu` Full menu with live filters and search (the products)
- `/menu/[slug]` Individual dish pages with options, quantity and add to basket
- `/drinks` Cocktail and drinks menu
- `/order` Checkout, collection or delivery, time slot and details
- `/order/confirmed` Order confirmation with reference
- `/reservations` Table booking with confirmation
- `/events` Private hire enquiry
- `/about` Story and FAQ
- `/contact` Contact details, map and form
- `/privacy` Privacy policy

## Structure

- `src/app` routes and layouts
- `src/components` shared UI, home sections, forms, cart drawer
- `src/data` menu, drinks, site details and page content
- `src/lib` cart context, formatting helpers
- `public/images` photography taken from the live Maaya site

## Notes

- The basket persists in the browser (localStorage). The checkout is a working
  demonstration flow; payment is taken in person on collection or delivery.
- All imagery lives in `public/images` so the site runs fully offline.
- Colours, type and layout are defined in `tailwind.config.ts` and
  `src/app/globals.css`.
