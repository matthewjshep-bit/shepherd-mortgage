import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
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
  title: "Shepherd Mortgage | Nationwide Investment Property Lending",
  description:
    "Bridge, fix and flip, ground-up construction, and long-term rental financing for California real estate investors. Direct access. Real answers. Fewer surprises.",
  keywords: [
    "California investment property lending",
    "bridge loans",
    "fix and flip loans",
    "DSCR rental loans",
    "construction loans",
    "hard money lending",
    "real estate investing",
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
        <ChatWidget />
      </body>
    </html>
  );
}
