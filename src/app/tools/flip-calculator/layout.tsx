import { Inter, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import './calculator.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Ultimate Fix and Flip Calculator | Free Deal Analyzer & ROI Tool',
  description:
    'Free fix and flip calculator. Enter purchase price, ARV, and rehab costs to instantly see net profit, ROI, maximum allowable offer, and deal grade. Based on the 70% rule.',
  keywords: [
    'fix and flip calculator',
    'house flipping calculator',
    '70 percent rule',
    'ARV calculator',
    'flip ROI',
    'hard money deal analyzer',
    'fix and flip profit calculator',
  ],
  alternates: { canonical: 'https://shepmo.com/calculator' },
  openGraph: {
    title: 'The Ultimate Fix and Flip Calculator — Instant Deal Analysis',
    description:
      'Free real-time fix and flip deal analyzer with ROI, MAO, and deal grading.',
    url: 'https://shepmo.com/calculator',
    siteName: 'Fix and Flip Analyzer — Shepherd Mortgage',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ultimate Fix and Flip Calculator',
    description: 'Free real-time fix and flip deal analyzer.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export default function FlipCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.variable} ${geistMono.variable} calc-container min-h-screen bg-calc-bg text-calc-text`}
      style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
