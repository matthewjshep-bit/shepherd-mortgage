'use client';

import { useState, useCallback } from 'react';
import {
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
  CheckCircle,
} from 'lucide-react';

/* ───────────────── Types ───────────────── */
type Step = 1 | 2 | 3;

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

/* ───────────────── Step Labels ───────────────── */
const stepLabels: Record<Step, string> = {
  1: 'Property Type',
  2: 'Loan Purpose',
  3: 'Your Info',
};

const TOTAL_STEPS = 3;

/* ═══════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════ */
export default function LoanRequestForm() {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const [propertyType, setPropertyType] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');

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

        {/* ── Step 3: GoHighLevel Form Embed ── */}
        {step === 3 && (
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
              </div>
            </div>

            {/* GoHighLevel Form */}
            <div className="bg-white rounded-xl border-2 border-border">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/UAZYCgYsBflEklfuTQPd"
                style={{ width: '100%', height: '743px', border: 'none', borderRadius: '8px' }}
                id="inline-UAZYCgYsBflEklfuTQPd"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Shepherd Mortgage"
                data-height="743"
                data-layout-iframe-id="inline-UAZYCgYsBflEklfuTQPd"
                data-form-id="UAZYCgYsBflEklfuTQPd"
                title="Shepherd Mortgage"
              />
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
