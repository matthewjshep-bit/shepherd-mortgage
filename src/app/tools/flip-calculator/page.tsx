import FlipCalculatorClient from '@/components/flip-calculator/FlipCalculatorClient';
import {
  softwareApplicationSchema,
  faqPageSchema,
  howToSchema,
  breadcrumbSchema,
  webSiteSchema,
} from '@/lib/flip-calculator/seo-data';

export default function FlipCalculatorPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-calc-accent bg-calc-accent/8 border border-calc-accent/20 rounded-full px-3 py-1 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-calc-accent" />
          Free real-time deal analyzer
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-calc-heading tracking-tight leading-[1.05]">
          Fix &amp; flip math,{' '}
          <span className="bg-gradient-to-r from-calc-accent to-indigo-400 bg-clip-text text-transparent">
            instantly clear.
          </span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-calc-muted max-w-xl mx-auto leading-relaxed">
          Five quick questions. Get net profit, ROI, the 70%-rule max offer, and an
          A–F deal grade — live as you type.
        </p>
      </div>

      {/* Interactive Calculator (client component — unchanged) */}
      <FlipCalculatorClient />
    </>
  );
}
