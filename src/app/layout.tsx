import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "FairDerma® | Advanced Clinical Dermatology & Laser Center",
  description:
    "Architectural skin science and precision dermatology led by board-certified medical physicians. Picosecond lasers, exosome therapy, and facial sculpting.",
  keywords: [
    "Dermatology",
    "Medical Aesthetics",
    "Picosecond Laser",
    "Facial Sculpting",
    "Exosome Therapy",
    "FairDerma Clinic",
  ],
  authors: [{ name: "FairDerma Medical Group" }],
  openGraph: {
    title: "FairDerma® | Advanced Clinical Dermatology",
    description:
      "Physician-led architectural skin science, cellular bio-stimulators, and precision dermal restructuring.",
    url: "https://fairderma.com",
    siteName: "FairDerma Clinic",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-sans bg-[#0D0D0F] text-white selection:bg-[#C5A880] selection:text-black">
        {children}
      </body>
    </html>
  );
}