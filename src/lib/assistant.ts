import { menu } from "@/data/menu";
import { site } from "@/data/site";
import { gbp } from "@/lib/format";

export type AssistantItem = { name: string; price: number; slug: string };
export type AssistantReply = {
  text: string;
  items?: AssistantItem[];
  links?: { label: string; href: string }[];
};

const has = (q: string, ...words: string[]) => words.some((w) => q.includes(w));

const toItems = (list: typeof menu, n = 4): AssistantItem[] =>
  list.slice(0, n).map((m) => ({ name: m.name, price: m.price, slug: m.slug }));

// A lightweight concierge. It understands intent and answers from the live
// menu, hours and offers, so it stays accurate and never invents dishes.
export function getAssistantReply(raw: string): AssistantReply {
  const q = raw.toLowerCase().trim();

  if (!q) {
    return { text: "How can I help? You can ask about the menu, opening hours, delivery, or booking a table." };
  }

  if (has(q, "hi", "hello", "hey", "namaste", "good morning", "good evening")) {
    return {
      text: "Hello and welcome to Maaya. I can help you explore the menu, check opening times, arrange delivery or book a table. What are you in the mood for?",
      links: [
        { label: "View Menu", href: "/menu" },
        { label: "Book a Table", href: "/reservations" },
      ],
    };
  }

  if (has(q, "hour", "open", "close", "closing", "timing", "time", "when")) {
    return {
      text: `We are open 12 noon to 10:30pm every day and closed on Tuesdays. Last food orders are at 10:30pm, and the bar keeps pouring until close. Delivery runs from 4:30pm.`,
    };
  }

  if (has(q, "where", "address", "location", "find", "parking", "direction", "postcode")) {
    return {
      text: `You will find us at ${site.address.full}, right in the heart of Bath.`,
      links: [{ label: "Open in Maps", href: site.mapEmbed.replace("&output=embed", "") }],
    };
  }

  if (has(q, "book", "reserv", "table")) {
    return {
      text: "Happy to help you book. Walk ins are welcome, but the best seats go fast, so I would reserve ahead for weekends and larger groups.",
      links: [
        { label: "Book a Table", href: "/reservations" },
        { label: `Call ${site.phone}`, href: site.phoneHref },
      ],
    };
  }

  if (has(q, "offer", "discount", "deal", "loyalty", "voucher", "saving", "cheap")) {
    return {
      text: "Right now you get 20% off every collection order, and 20% off delivery orders over £15. You also earn 10% back as loyalty credits on every order.",
      links: [{ label: "Start an Order", href: "/menu" }],
    };
  }

  if (has(q, "deliver", "collection", "collect", "takeaway", "take away", "order online", "pickup")) {
    return {
      text: "You can order for collection or delivery. Collection has a £1 minimum with 20% off, delivery has a £15 minimum with 20% off over £15 and runs within 3 miles of central Bath from 4:30pm.",
      links: [{ label: "Order Now", href: "/menu" }],
    };
  }

  if (has(q, "cocktail", "drink", "wine", "beer", "bar", "tipple", "lassi", "mocktail")) {
    return {
      text: "The bar leads the room here. We pour signature and classic cocktails, exclusive wines and alcohol free creations. Cannot find your tipple? Our bartenders will blend you something special.",
      links: [{ label: "See the Drinks", href: "/drinks" }],
    };
  }

  if (has(q, "allerg", "nut", "intoleran", "coeliac", "celiac")) {
    return {
      text: "Many dishes are labelled vegetarian, vegan, gluten free or containing nuts, and you can filter the menu by diet. We cannot guarantee no cross contamination and dishes may contain nut traces, so please tell us about any allergy before ordering.",
      links: [{ label: "Filter the Menu", href: "/menu" }],
    };
  }

  if (has(q, "contact", "phone", "call", "email", "number")) {
    return {
      text: `You can call us on ${site.phone} or email ${site.email}. We would love to hear from you.`,
      links: [
        { label: `Call ${site.phone}`, href: site.phoneHref },
        { label: "Contact Page", href: "/contact" },
      ],
    };
  }

  if (has(q, "event", "private", "hire", "party", "celebration", "function")) {
    return {
      text: "We love hosting celebrations and work gatherings, from a few tables to a full venue takeover. Share your date and numbers and we will build something around you.",
      links: [{ label: "Events & Hire", href: "/events" }],
    };
  }

  if (has(q, "vegan")) {
    const list = menu.filter((m) => m.tags.includes("vegan"));
    return { text: `We have plenty for vegans. A few favourites:`, items: toItems(list), links: [{ label: "All Vegan Dishes", href: "/menu" }] };
  }

  if (has(q, "gluten", "gf", "coeliac")) {
    const list = menu.filter((m) => m.tags.includes("gf"));
    return { text: "Lots of the menu is gluten free. For example:", items: toItems(list), links: [{ label: "Filter Gluten Free", href: "/menu" }] };
  }

  if (has(q, "vegetarian", "veg ", "veggie") || q === "veg") {
    const list = menu.filter((m) => m.tags.includes("veg"));
    return { text: "We are very kind to vegetarians. A taste of what is on offer:", items: toItems(list) };
  }

  if (has(q, "spicy", "spice", "hot", "fiery")) {
    const list = menu.filter((m) => m.spice >= 3);
    return { text: "If you like it fiery, try these:", items: toItems(list) };
  }

  if (has(q, "popular", "recommend", "best", "favourite", "favorite", "signature", "must")) {
    const list = menu.filter((m) => m.tags.includes("popular") || m.tags.includes("chef"));
    return { text: "Here are some of the plates guests keep ordering:", items: toItems(list, 5), links: [{ label: "See Full Menu", href: "/menu" }] };
  }

  if (has(q, "meal deal", "deal", "set menu", "family", "sharing")) {
    const list = menu.filter((m) => m.category === "meal-deals");
    return { text: "Our meal deals are the best value for sharing:", items: toItems(list, 4) };
  }

  // Free text search across the menu by name and description.
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  if (tokens.length) {
    const matches = menu.filter((m) => {
      const hay = `${m.name} ${m.short}`.toLowerCase();
      return tokens.some((t) => hay.includes(t));
    });
    if (matches.length) {
      return {
        text: `Here is what I found for that:`,
        items: toItems(matches, 5),
        links: [{ label: "Open the Menu", href: "/menu" }],
      };
    }
  }

  return {
    text: "I can help with the menu, prices, opening hours, delivery and collection, allergies, or booking a table. Try asking something like, do you have paneer, or what time do you close?",
    links: [
      { label: "Browse Menu", href: "/menu" },
      { label: "Book a Table", href: "/reservations" },
    ],
  };
}

export const gbpFmt = gbp;
