import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Newsreader, Caveat } from "next/font/google";
import "./globals.css";
import { SvgDefs } from "@/components/ui/SvgDefs";
import { SiteProvider } from "@/components/site/SiteProvider";
import { Header } from "@/components/site/Header";
import { CommandPalette } from "@/components/site/CommandPalette";
import { Intro } from "@/components/site/Intro";
import { ScrollProgress, CursorTag, Footer } from "@/components/site/Chrome";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz", "wdth"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: { default: "Mustapha, CTO, engineer and teacher", template: "%s | Mustapha" },
  description: "Mustapha is CTO of Port66, a full-stack and smart contract engineer, and a tech educator.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#151416",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${newsreader.variable} ${caveat.variable}`}>
      {/* Browser extensions (Grammarly, ColorZilla...) add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>
        <SvgDefs />
        <SiteProvider>
          <Intro />
          <ScrollProgress />
          <CursorTag />
          <CommandPalette />
          <div className="w">
            <Header />
            <main id="main" tabIndex={-1}>{children}</main>
            <Footer />
          </div>
        </SiteProvider>
      </body>
    </html>
  );
}
