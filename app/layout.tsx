import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "QuantaMend | AI Operations & Automation for High-Revenue Practices",
  description:
    "QuantaMend builds AI reactivation pipelines, voice receptionists, and multilingual concierge systems that book paying appointments for MedSpas, dental clinics, real estate, and high-revenue local businesses. Risk-free 100-lead pilot.",
  openGraph: {
    title: "QuantaMend | AI Operations & Automation for High-Revenue Practices",
    description:
      "Your past clients are worth $127,000. Our AI reactivation engine texts dormant leads, handles objections, and books paying appointments, all automatically. Free 100-lead pilot.",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
  },
  verification: {
    google: "PYNli6amcDNlCA50pP806QSWaDyulO3ZDwcmUf1a1iY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceCodePro.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
