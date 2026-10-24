import { IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../data/siteConfig.js";
import ScrollReveal from "./components/ScrollReveal";
import PageLoader from "./components/PageLoader";
import BlobBackground from "./components/BlobBackground";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConstructionModal from "./components/ConstructionModal";
import { ThemeProvider } from "./components/ThemeProvider";
import { BlobPresetProvider } from "./components/BlobPresetContext";
import FrostOverlay from "./components/FrostOverlay";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700"],
});

// Captions and labels on case study pages.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500"],
});

const title = `${siteConfig.name}, ${siteConfig.role}`;

// TODO(Sanja): add public/og-image.png (1200×630) and list it under
// openGraph.images and twitter.images.
export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: siteConfig.bio,
  openGraph: {
    title,
    description: siteConfig.bio,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.bio,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ThemeProvider>
          <BlobPresetProvider>
            <BlobBackground />
            <FrostOverlay />
            <ConstructionModal />
            <PageLoader />
            {children}
            <ScrollReveal />
            <Analytics />
            <SpeedInsights />
          </BlobPresetProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
