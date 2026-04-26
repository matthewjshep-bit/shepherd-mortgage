import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shepherd Mortgage | Investment Property Mortgage Brokerage",
  description:
    "Shepherd Mortgage is an investment property mortgage brokerage specializing in bridge, fix-and-flip, ground-up construction, and DSCR rental financing for real estate investors nationwide. Direct access. Real answers. Fewer surprises.",
  keywords: [
    "investment property mortgage broker",
    "investment property mortgage brokerage",
    "bridge loans",
    "fix and flip loans",
    "DSCR rental loans",
    "construction loans",
    "hard money lending",
    "real estate investing",
    "mortgage broker for investors",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <script src="https://link.msgsndr.com/js/form_embed.js" defer />
      </body>
    </html>
  );
}
