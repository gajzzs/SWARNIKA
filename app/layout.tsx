import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost, Mukta } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TrousseauProvider } from "@/components/Trousseau";
import "./globals.css";

const display = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--f-display", display: "swap" });
const text = Jost({ weight: ["300", "400", "500"], subsets: ["latin"], variable: "--f-text", display: "swap" });
const deva = Mukta({ weight: ["300", "400"], subsets: ["devanagari"], variable: "--f-deva", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Swarnika · Hand-set kundan & polki, Jaipur", template: "%s · Swarnika" },
  description:
    "Bridal and heirloom kundan, polki and temple jewellery from a Jaipur atelier. Every piece priced openly: gold, stones, making and GST, line by line.",
};

export const viewport: Viewport = { themeColor: "#F7F2EA" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${text.variable} ${deva.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <TrousseauProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </TrousseauProvider>
      </body>
    </html>
  );
}
