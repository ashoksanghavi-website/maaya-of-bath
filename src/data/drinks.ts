export type Drink = {
  name: string;
  price: string;
  note: string;
};

export type DrinkGroup = {
  id: string;
  title: string;
  kicker: string;
  blurb: string;
  image: string;
  drinks: Drink[];
};

// Maaya's bar leads the room. Signature and classic serves, wines and
// alcohol free creations. Bartenders happily go off menu on request.
export const drinkGroups: DrinkGroup[] = [
  {
    id: "signature",
    title: "Signature Cocktails",
    kicker: "The House Pours",
    blurb:
      "Our own creations, built around Indian spice, fresh fruit and a bartender's instinct.",
    image: "/images/drinks/fancy-cocktail.jpg",
    drinks: [
      { name: "Maaya Spice Sour", price: "£10.5", note: "Whisky, tamarind, lemon, warm spice, silky foam." },
      { name: "Bath Garden Gin", price: "£10.5", note: "Local gin, cucumber, mint, elderflower, tonic." },
      { name: "Mango Chilli Margarita", price: "£11", note: "Tequila, alphonso mango, lime, a whisper of chilli." },
      { name: "Rose & Cardamom Martini", price: "£11", note: "Vodka, rose, cardamom, a floral, aromatic finish." },
      { name: "Saffron Negroni", price: "£11.5", note: "Gin, saffron infused vermouth, bitter orange." },
      { name: "Tamarind Old Fashioned", price: "£12", note: "Bourbon, tamarind, jaggery, orange bitters." },
    ],
  },
  {
    id: "classics",
    title: "Timeless Classics",
    kicker: "Done Properly",
    blurb: "The serves everyone knows, made with care and good spirit.",
    image: "/images/drinks/mixing-a-cocktail.jpg",
    drinks: [
      { name: "Espresso Martini", price: "£10.5", note: "Vodka, coffee liqueur, fresh espresso." },
      { name: "Passion Fruit Martini", price: "£10.5", note: "Vanilla vodka, passion fruit, a prosecco side." },
      { name: "Mojito", price: "£10", note: "Rum, lime, mint, soda, lightly sweet." },
      { name: "Aperol Spritz", price: "£9.5", note: "Aperol, prosecco, soda, orange." },
      { name: "Cosmopolitan", price: "£10", note: "Vodka, triple sec, cranberry, lime." },
      { name: "Pina Colada", price: "£10", note: "Rum, coconut, pineapple, blended smooth." },
    ],
  },
  {
    id: "wine",
    title: "Wines & Bubbles",
    kicker: "The Cellar",
    blurb: "An exclusive selection to sit beside spice, by the glass or the bottle.",
    image: "/images/drinks/drinks-glasses.jpg",
    drinks: [
      { name: "House White", price: "£6 / £22", note: "Crisp and dry, a friend to every tapas plate." },
      { name: "House Red", price: "£6 / £22", note: "Soft, rounded and easy beside a curry." },
      { name: "Rose", price: "£6.5 / £24", note: "Pale, fresh and gently fruity." },
      { name: "Sauvignon Blanc", price: "£7.5 / £28", note: "Zesty and aromatic, great with seafood." },
      { name: "Malbec", price: "£8 / £30", note: "Bold and dark fruited, made for lamb." },
      { name: "Prosecco", price: "£7 / £30", note: "Lively bubbles to open the evening." },
    ],
  },
  {
    id: "zero",
    title: "Alcohol Free",
    kicker: "Nothing Missing",
    blurb: "Bright, grown up creations for those who are skipping the spirit.",
    image: "/images/drinks/mint-ice-gin.webp",
    drinks: [
      { name: "Virgin Mojito", price: "£6", note: "Lime, mint, soda, a proper refresher." },
      { name: "Mango Lassi", price: "£4.5", note: "Yoghurt, alphonso mango, a pinch of cardamom." },
      { name: "Salted Masala Soda", price: "£4.5", note: "Lime, cumin, black salt, sparkling." },
      { name: "Rose Lemonade", price: "£4.5", note: "Rose, lemon, soda, delicately floral." },
      { name: "Masala Chai", price: "£3.5", note: "Spiced tea brewed the traditional way." },
      { name: "Filter Coffee", price: "£3", note: "South Indian style, strong and smooth." },
    ],
  },
];
