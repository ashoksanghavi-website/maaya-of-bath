import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { HeaderToneProvider } from "@/lib/headerTheme";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ChatAssistant } from "@/components/assistant/ChatAssistant";
import { PromoPopup } from "@/components/PromoPopup";
import { site } from "@/data/site";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maayaofbath.co.uk"),
  title: {
    default: "Maaya | Indian & Asian Tapas and Cocktail Bar in Bath",
    template: "%s | Maaya of Bath",
  },
  description: site.description,
  keywords: [
    "Indian restaurant Bath",
    "Asian tapas Bath",
    "cocktail bar Bath",
    "Indian street food",
    "Maaya Bath",
  ],
  openGraph: {
    title: "Maaya | Indian & Asian Tapas and Cocktail Bar in Bath",
    description: site.description,
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <HeaderToneProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
            <ChatAssistant />
            <PromoPopup />
          </HeaderToneProvider>
        </CartProvider>
      </body>
    </html>
  );
}
