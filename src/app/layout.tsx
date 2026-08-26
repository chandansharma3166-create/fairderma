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
  title: "FairDerma® | Advanced Clinical Dermatology & Laser Center",
  description:
    "Architectural skin science and precision dermatology led by board-certified medical physicians. Picosecond lasers, exosome therapy, and facial sculpting.",
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