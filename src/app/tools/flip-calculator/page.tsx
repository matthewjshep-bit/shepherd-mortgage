/* Server Component — wraps the client calculator with SSR content */

import FlipCalculatorClient from '@/components/flip-calculator/FlipCalculatorClient';
import ContentSections from '@/components/flip-calculator/ContentSections';
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-calc-heading tracking-tight leading-tight">
          Fix and Flip Calculator
        </h1>
        <p className="mt-3 text-base sm:text-lg text-calc-muted max-w-2xl mx-auto">
          Free real-time deal analyzer. Enter purchase price, ARV, and rehab costs to instantly see net profit, ROI, maximum allowable offer, and deal grade.
        </p>
      </div>

      {/* Interactive Calculator (client component — unchanged) */}
      <FlipCalculatorClient />

      {/* Server-rendered content for SEO/AEO */}
      <ContentSections />
    </>
  );
}
