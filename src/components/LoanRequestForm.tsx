'use client';

import { useState, useCallback } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Home,
  Building2,
  Landmark,
  Store,
  TreePine,
  MoreHorizontal,
  ShoppingCart,
  RefreshCw,
  Banknote,
  HardHat,
  Wrench,
  Zap,
  Clock,
  Calendar,
  CalendarDays,
  Search,
  CheckCircle,
} from 'lucide-react';

/* ───────────────── Types ───────────────── */
type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface CardOption {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
}

/* ───────────────── Option Data ───────────────── */
const propertyTypes: CardOption[] = [
  { label: 'Single Family', icon: Home, value: 'sfr' },
  { label: 'Multi-Family', icon: Building2, value: 'multi-family' },
  { label: 'Mixed-Use', icon: Store, value: 'mixed-use' },
  { label: 'Commercial', icon: Landmark, value: 'commercial' },
  { label: 'Land', icon: TreePine, value: 'land' },
  { label: 'Other', icon: MoreHorizontal, value: 'other' },
];

const loanPurposes: CardOption[] = [
  { label: 'Purchase', icon: ShoppingCart, value: 'purchase' },
  { label: 'Refinance', icon: RefreshCw, value: 'refinance' },
  { label: 'Cash-Out Refi', icon: Banknote, value: 'cash-out' },
  { label: 'Construction', icon: HardHat, value: 'construction' },
  { label: 'Rehab / Renovation', icon: Wrench, value: 'rehab' },
];

const timelineOptions: CardOption[] = [
  { label: 'ASAP / 7 Days', icon: Zap, value: '7-days' },
  { label: '14 Days', icon: Clock, value: '14-days' },
  { label: '30 Days', icon: Calendar, value: '30-days' },
  { label: '60+ Days', icon: CalendarDays, value: '60-plus' },
  { label: 'Just Exploring', icon: Search, value: 'exploring' },
];

const loanAmountPresets = [
  '$100K – $250K',
  '$250K – $500K',
  '$500K – $1M',
  '$1M – $2M',
  '$2M – $5M',
  '$5M+',
];

/* ───────────────── Step Labels ───────────────── */
const stepLabels: Record<Step, string> = {
  1: 'Property Type',
  2: 'Loan Purpose',
  3: 'Loan Amount',
  4: 'Timeline',
  5: 'Deal Details',
  6: 'Your Info',
};

const TOTAL_STEPS = 6;

/* ═══════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════ */
export default function LoanRequestForm() {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const [propertyType, setPropertyType] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [timeline, setTimeline] = useState('');
  const [scenario, setScenario] = useState('');

  const goNext = useCallback(() => {
    setDirection('forward');
    setStep((s) => Math.min(s + 1, TOTAL_STEPS) as Step);
  }, []);

  const goBack = useCallback(() => {
    setDirection('back');
    setStep((s) => Math.max(s - 1, 1) as Step);
  }, []);

  const handleCardSelect = (
    setter: (v: string) => void,
    value: string,
  ) => {
    setter(value);
    // Auto-advance after short delay so user sees selection
    setTimeout(() => goNext(), 250);
  };

  /* ── Progress Bar ── */
  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const animClass =
    direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left';

  /* ── Build GHL query params from collected data ── */
  const ghlParams = new URLSearchParams({
    ...(propertyType && { property_type: propertyType }),
    ...(loanPurpose && { loan_purpose: loanPurpose }),
    ...(loanAmount && { loan_amount: loanAmount }),
    ...(timeline && { timeline }),
    ...(scenario && { scenario: scenario.slice(0, 500) }),
  }).toString();

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-secondary">
            Step {step} of {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium text-navy">
            {stepLabels[step]}
          </span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-navy rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[360px] flex flex-col" key={step}>
        {/* ── Step 1: Property Type ── */}
        {step === 1 && (
          <div className={animClass}>
            <h3 className="text-2xl font-bold text-navy mb-2">
              What are we financing?
            </h3>
            <p className="text-text-secondary mb-8">
              Pick the closest match. We&apos;ll get into specifics next.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {propertyTypes.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleCardSelect(setPropertyType, opt.value)}
                  className={`group flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    propertyType === opt.value
                      ? 'border-navy bg-navy/5 shadow-md'
                      : 'border-border hover:border-navy/30 hover:shadow-sm bg-white'
                  }`}
                >
                  <opt.icon
                    className={`w-7 h-7 transition-colors ${
                      propertyType === opt.value
                        ? 'text-navy'
                        : 'text-text-tertiary group-hover:text-navy'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium transition-colors ${
                      propertyType === opt.value
                        ? 'text-navy'
                        : 'text-text-secondary'
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Loan Purpose ── */}
        {step === 2 && (
          <div className={animClass}>
            <h3 className="text-2xl font-bold text-navy mb-2">
              What&apos;s the loan purpose?
            </h3>
            <p className="text-text-secondary mb-8">
              Tell us what you&apos;re looking to do.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {loanPurposes.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleCardSelect(setLoanPurpose, opt.value)}
                  className={`group flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    loanPurpose === opt.value
                      ? 'border-navy bg-navy/5 shadow-md'
                      : 'border-border hover:border-navy/30 hover:shadow-sm bg-white'
                  }`}
                >
                  <opt.icon
                    className={`w-7 h-7 transition-colors ${
                      loanPurpose === opt.value
                        ? 'text-navy'
                        : 'text-text-tertiary group-hover:text-navy'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium transition-colors ${
                      loanPurpose === opt.value
                        ? 'text-navy'
                        : 'text-text-secondary'
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Loan Amount ── */}
        {step === 3 && (
          <div className={animClass}>
            <h3 className="text-2xl font-bold text-navy mb-2">
              Estimated loan amount?
            </h3>
            <p className="text-text-secondary mb-8">
              Select the range that best fits your deal.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {loanAmountPresets.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleCardSelect(setLoanAmount, amt)}
                  className={`group flex items-center justify-center p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    loanAmount === amt
                      ? 'border-navy bg-navy/5 shadow-md'
                      : 'border-border hover:border-navy/30 hover:shadow-sm bg-white'
                  }`}
                >
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      loanAmount === amt ? 'text-navy' : 'text-text-secondary'
                    }`}
                  >
                    {amt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 4: Timeline ── */}
        {step === 4 && (
          <div className={animClass}>
            <h3 className="text-2xl font-bold text-navy mb-2">
              How soon do you need to close?
            </h3>
            <p className="text-text-secondary mb-8">
              We&apos;ll prioritize accordingly.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timelineOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleCardSelect(setTimeline, opt.value)}
                  className={`group flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    timeline === opt.value
                      ? 'border-navy bg-navy/5 shadow-md'
                      : 'border-border hover:border-navy/30 hover:shadow-sm bg-white'
                  }`}
                >
                  <opt.icon
                    className={`w-7 h-7 transition-colors ${
                      timeline === opt.value
                        ? 'text-navy'
                        : 'text-text-tertiary group-hover:text-navy'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium transition-colors ${
                      timeline === opt.value
                        ? 'text-navy'
                        : 'text-text-secondary'
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 5: Scenario Details ── */}
        {step === 5 && (
          <div className={animClass}>
            <h3 className="text-2xl font-bold text-navy mb-2">
              Tell me about the deal
            </h3>
            <p className="text-text-secondary mb-8">
              Property address, purchase price, rehab budget, ARV, exit
              plan&nbsp;— anything that helps me evaluate the scenario.
            </p>
            <textarea
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="e.g. 3-unit multifamily in San Jose, $1.2M purchase, $200K rehab, $1.8M ARV, 12-month flip timeline..."
              rows={6}
              className="w-full rounded-xl border-2 border-border bg-white p-4 text-text-primary placeholder:text-text-tertiary focus:border-navy focus:outline-none transition-colors resize-none"
            />
            <button
              onClick={goNext}
              disabled={!scenario.trim()}
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-navy-light disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Step 6: GoHighLevel Form Embed ── */}
        {step === 6 && (
          <div className={animClass}>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-accent-green" />
              <h3 className="text-2xl font-bold text-navy">
                Almost done — your details
              </h3>
            </div>
            <p className="text-text-secondary mb-6">
              Enter your contact information below so I can review your scenario
              and get back to you personally.
            </p>

            {/* Summary of answers */}
            <div className="bg-surface-secondary rounded-xl border border-border p-4 mb-6">
              <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
                Your Scenario Summary
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {propertyType && (
                  <div>
                    <span className="text-text-tertiary">Property:&nbsp;</span>
                    <span className="font-medium text-text-primary capitalize">
                      {propertyType.replace('-', ' ')}
                    </span>
                  </div>
                )}
                {loanPurpose && (
                  <div>
                    <span className="text-text-tertiary">Purpose:&nbsp;</span>
                    <span className="font-medium text-text-primary capitalize">
                      {loanPurpose.replace('-', ' ')}
                    </span>
                  </div>
                )}
                {loanAmount && (
                  <div>
                    <span className="text-text-tertiary">Amount:&nbsp;</span>
                    <span className="font-medium text-text-primary">
                      {loanAmount}
                    </span>
                  </div>
                )}
                {timeline && (
                  <div>
                    <span className="text-text-tertiary">Timeline:&nbsp;</span>
                    <span className="font-medium text-text-primary capitalize">
                      {timeline.replace('-', ' ')}
                    </span>
                  </div>
                )}
              </div>
              {scenario && (
                <p className="mt-3 text-sm text-text-secondary border-t border-border pt-3 line-clamp-3">
                  {scenario}
                </p>
              )}
            </div>

            {/* GoHighLevel iframe placeholder */}
            <div className="bg-white rounded-xl border-2 border-border p-6">
              <iframe
                src={`https://api.leadconnectorhq.com/widget/form/YOUR_GHL_FORM_ID?${ghlParams}`}
                style={{ width: '100%', height: '400px', border: 'none' }}
                title="Loan Request Contact Form"
                loading="lazy"
              />
              <p className="text-xs text-text-tertiary text-center mt-3">
                Your information is secure and will never be shared.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      {step > 1 && (
        <button
          onClick={goBack}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-navy transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}
    </div>
  );
}
