import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fairderma.vercel.app"),
  title: {
    default: "FairDerma® | Advanced Clinical Dermatology",
    template: "%s | FairDerma®",
  },
  description:
    "Physician-led dermatology and laser center specializing in picosecond lasers, exosome therapy, and architectural facial sculpting.",
  keywords: [
    "Dermatology",
    "Clinical Aesthetics",
    "Picosecond Laser",
    "Facial Sculpting",
    "Exosome Therapy",
    "FairDerma",
  ],
  authors: [{ name: "FairDerma Medical Group" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fairderma.vercel.app",
    siteName: "FairDerma Clinic",
    title: "FairDerma® | Advanced Clinical Dermatology",
    description:
      "Physician-led dermatology specializing in picosecond lasers, exosome therapy, and facial sculpting.",
    images: [
      {
        url: "https://fairderma.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "FairDerma Clinical Dermatology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FairDerma® | Advanced Clinical Dermatology",
    description:
      "Physician-led dermatology specializing in picosecond lasers, exosome therapy, and facial sculpting.",
    images: ["https://fairderma.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-sans bg-[#0D0D0F] text-white selection:bg-[#C5A880] selection:text-black pt-20">
        <Navbar />
        {children}
      </body>
    </html>
  );
}