'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

const faqSections: FaqSection[] = [
  {
    title: 'Loan Types & Eligibility',
    items: [
      {
        q: 'What types of loans does Shepherd Mortgage offer?',
        a: 'We specialize in investment property financing including private and bridge loans, fix-and-flip financing, ground-up construction loans, 30-year investor loans, and DSCR rental loans. All our products are designed specifically for real estate investors.',
      },
      {
        q: 'Do you lend on owner-occupied properties?',
        a: 'No. Shepherd Mortgage focuses exclusively on investment properties — non-owner-occupied residential and small commercial assets.',
      },
      {
        q: 'What states do you lend in?',
        a: 'We provide investment property financing nationwide. Specific program availability may vary by state, so please reach out with your scenario and we will confirm eligibility.',
      },
      {
        q: 'Do I need perfect credit to qualify?',
        a: 'Not necessarily. Our lending decisions are primarily asset-based, meaning we focus on the property and the deal rather than just your credit score. That said, credit is one factor we review alongside experience, equity, and exit strategy.',
      },
      {
        q: 'Can I get a loan through an LLC or corporation?',
        a: 'Yes. Most of our borrowers are entities (LLCs, corporations, trusts). We regularly fund loans to business entities with a personal guarantee.',
      },
    ],
  },
  {
    title: 'Application Process & Timeline',
    items: [
      {
        q: 'How do I apply for a loan?',
        a: 'Start by submitting a loan request on our website. Provide your property type, loan purpose, and basic deal details. Daniel will personally review your scenario and respond — typically within 24 hours.',
      },
      {
        q: 'How fast can you close?',
        a: 'Bridge and fix-and-flip loans can close in as few as 7–14 days. Construction and long-term loans typically take 2–4 weeks depending on complexity and third-party reports.',
      },
      {
        q: 'What documents will I need?',
        a: 'Requirements vary by loan type, but common documents include: purchase contract or property details, scope of work (for rehab), proof of funds for down payment, entity documents (operating agreement, articles), and photo identification. We will provide a detailed checklist after initial review.',
      },
      {
        q: 'Is there an application fee?',
        a: 'There is no fee to submit a loan request or receive initial feedback. Fees for appraisals, inspections, and other third-party costs are disclosed upfront before you commit.',
      },
    ],
  },
  {
    title: 'Rates & Fees',
    items: [
      {
        q: 'What are your interest rates?',
        a: 'Rates vary based on loan type, property type, borrower experience, leverage, and market conditions. We provide custom quotes for each deal — submit your scenario and we will give you a specific rate quote.',
      },
      {
        q: 'Are there origination fees?',
        a: 'Yes, origination fees are standard in private lending. The specific amount depends on the loan type and deal structure. All fees are disclosed in your term sheet before you commit to moving forward.',
      },
      {
        q: 'Are there prepayment penalties?',
        a: 'This depends on the loan product. Bridge and fix-and-flip loans typically have no prepayment penalty or a short minimum interest period. Long-term loans may include standard prepayment provisions. All terms are detailed in your term sheet.',
      },
    ],
  },
  {
    title: 'Communication & SMS',
    items: [
      {
        q: 'How will you communicate with me?',
        a: 'Daniel works directly with every borrower via phone, email, and text. You will have a direct line — no call centers or intake reps.',
      },
      {
        q: 'Will I receive text messages?',
        a: 'Only if you opt in. Our contact form includes an explicit checkbox for SMS consent. You can opt out at any time by replying STOP to any message.',
      },
      {
        q: 'How do I opt out of text messages?',
        a: 'Reply STOP to any text message from Shepherd Mortgage and you will be immediately unsubscribed. You can also contact us at dan@shepmo.com to update your communication preferences.',
      },
    ],
  },
  {
    title: 'Company & Legal',
    items: [
      {
        q: 'Who is behind Shepherd Mortgage?',
        a: 'Shepherd Mortgage is led by Daniel Shepherd, who has over 15 years of experience in investment property lending and has personally closed more than $500 million in transactions. Learn more on our About page.',
      },
      {
        q: 'Where is Shepherd Mortgage located?',
        a: 'Our office is located at 20491 Forrest Hills Dr., Saratoga, CA 95070. We serve investors nationwide.',
      },
      {
        q: 'Where can I find your Privacy Policy and Terms of Service?',
        a: 'Our Privacy Policy and Terms of Service are available on our website. You can access them from the footer of any page or directly at shepmo.com/privacy and shepmo.com/terms.',
      },
    ],
  },
];

function Accordion({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-surface-secondary/50 transition-colors cursor-pointer"
      >
        <span className="font-medium text-text-primary">{item.q}</span>
        <ChevronDown
          className={`w-5 h-5 text-text-tertiary shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 animate-fade-in">
          <p className="text-text-secondary leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-br from-navy via-navy-light to-charcoal py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Common questions about our lending products, process, and how we
            work with investors.
          </p>
        </div>
      </section>

      <main className="flex-1 bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <Accordion key={item.q} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-surface-secondary rounded-2xl p-8 lg:p-10 border border-border text-center">
            <h2 className="text-2xl font-bold text-navy mb-3">
              Still have questions?
            </h2>
            <p className="text-text-secondary mb-6">
              Reach out directly — Daniel responds within one business day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-light transition-all text-lg"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+14088218245"
                className="inline-flex items-center gap-2 text-navy font-semibold px-8 py-4 rounded-xl border border-border hover:bg-surface-tertiary transition-all text-lg"
              >
                Call 408.821.8245
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
