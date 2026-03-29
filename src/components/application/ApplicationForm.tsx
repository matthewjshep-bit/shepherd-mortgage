'use client';

import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import DocumentUploader from '@/components/application/DocumentUploader';
import { submitApplication } from '@/app/apply/actions';
import { parseCurrencyInput, formatNumberWithCommas, formatCurrency, formatPercent } from '@/lib/format';
import { calculateDealEconomics, DEFAULT_RATE_CONFIG, RTL_PRICING_TABLE } from '@/lib/calculations';
import type { CalculatorInputs, ApplicationFormData } from '@/types';
import { ArrowLeft, ArrowRight, Loader2, FileText, CheckCircle, Shield } from 'lucide-react';

interface UploadedFile { file: File; preview?: string; }

const CurrencyInput = ({ 
  field, 
  label, 
  placeholder, 
  form, 
  updateField, 
  formatCurrencyField, 
  unformatCurrencyField 
}: { 
  field: keyof ApplicationFormData; 
  label: string; 
  placeholder: string;
  form: ApplicationFormData;
  updateField: (f: keyof ApplicationFormData, v: string) => void;
  formatCurrencyField: (f: keyof ApplicationFormData) => void;
  unformatCurrencyField: (f: keyof ApplicationFormData) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-text-secondary mb-1.5">{label} *</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary font-medium">$</span>
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        className="w-full border border-border rounded-lg pl-7 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
        value={form[field as keyof typeof form]}
        onChange={(e) => updateField(field, e.target.value.replace(/[^0-9]/g, ''))}
        onBlur={() => formatCurrencyField(field)}
        onFocus={() => unformatCurrencyField(field)}
      />
    </div>
  </div>
);

export default function ApplicationForm() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  // Form state
  const [form, setForm] = useState({
    propertyAddress: searchParams.get('address') || '',
    propertyCity: '',
    propertyState: '',
    propertyZip: '',
    propertyType: searchParams.get('type') || 'sfr',
    purchasePrice: searchParams.get('price') || '',
    rehabBudget: searchParams.get('rehab') || '',
    arv: searchParams.get('arv') || '',
    loanAmountRequested: searchParams.get('loan') || '',
    loanTermMonths: searchParams.get('term') || '12',
    exitStrategy: searchParams.get('exit') || 'sell',
    borrowerName: '',
    borrowerEmail: '',
    borrowerPhone: '',
    entityName: '',
    entityState: '',
    borrowerAddress: '',
    borrowerExperience: searchParams.get('exp') || '4-6',
    rehabPlanDescription: '',
  });

  // Document state
  const [docs, setDocs] = useState<Record<string, UploadedFile[]>>({
    purchase_contract: [],
    sow: [],
    proof_of_funds: [],
    entity_docs: [],
    photo_id: [],
    other: [],
  });

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrencyField = (field: string) => {
    const num = parseCurrencyInput(form[field as keyof typeof form] as string);
    if (num > 0) updateField(field, formatNumberWithCommas(num));
  };

  const unformatCurrencyField = (field: string) => {
    const num = parseCurrencyInput(form[field as keyof typeof form] as string);
    if (num > 0) updateField(field, num.toString());
  };

  const handleSubmit = () => {
    setError(null);
    const fd = new FormData();

    // Add all form fields
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'purchasePrice' || key === 'rehabBudget' || key === 'arv' || key === 'loanAmountRequested') {
        fd.append(key, parseCurrencyInput(value).toString());
      } else {
        fd.append(key, value);
      }
    });

    // Add documents
    Object.entries(docs).forEach(([docType, files]) => {
      files.forEach(f => fd.append(`documents_${docType}`, f.file));
    });

    startTransition(async () => {
      const result = await submitApplication(fd);
      if (result.success) {
        setSubmitted(true);
        setRefNumber(result.refNumber || '');
      } else {
        setError(result.error || 'Submission failed');
      }
    });
  };

  // Calculate outputs for review
  const getOutputs = () => {
    const inputs: CalculatorInputs = {
      propertyAddress: form.propertyAddress,
      purchasePrice: parseCurrencyInput(form.purchasePrice),
      rehabBudget: parseCurrencyInput(form.rehabBudget),
      arv: parseCurrencyInput(form.arv),
      loanAmountRequested: parseCurrencyInput(form.loanAmountRequested),
      loanTermMonths: parseInt(form.loanTermMonths),
      ficoScore: 0,
      propertyType: form.propertyType as CalculatorInputs['propertyType'],
      exitStrategy: form.exitStrategy as CalculatorInputs['exitStrategy'],
      borrowerExperience: form.borrowerExperience as CalculatorInputs['borrowerExperience'],
    };
    return calculateDealEconomics(inputs, DEFAULT_RATE_CONFIG);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 px-4">
        <div className="w-20 h-20 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-accent-green" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-navy mb-3">Application Submitted!</h1>
        <p className="text-lg text-text-secondary mb-2">Your reference number is:</p>
        <p className="text-2xl font-bold text-navy bg-surface-secondary rounded-xl py-3 px-6 inline-block mb-6">{refNumber}</p>
        <p className="text-text-secondary mb-8">
          We&apos;ll review your application and get back to you within 24 hours. A confirmation has been sent to your email.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 text-navy font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              s <= step ? 'bg-navy text-white' : 'bg-border text-text-tertiary'
            }`}>{s}</div>
            <span className={`text-xs font-medium hidden sm:block ${s <= step ? 'text-navy' : 'text-text-tertiary'}`}>
              {['Property', 'Borrower', 'Documents', 'Review'][s - 1]}
            </span>
            {s < 4 && <div className={`flex-1 h-0.5 ${s < step ? 'bg-navy' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Property Info */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-5 animate-fade-in">
          <h2 className="font-heading text-xl font-semibold text-navy">Property & Loan Details</h2>
          <input
            type="text"
            placeholder="Property Address"
            className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            value={form.propertyAddress}
            onChange={(e) => updateField('propertyAddress', e.target.value)}
          />
          <div className="grid grid-cols-3 gap-3">
            <input placeholder="City" className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.propertyCity} onChange={e => updateField('propertyCity', e.target.value)} />
            <input placeholder="State" className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.propertyState} onChange={e => updateField('propertyState', e.target.value)} />
            <input placeholder="Zip" className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.propertyZip} onChange={e => updateField('propertyZip', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <CurrencyInput field="purchasePrice" label="Purchase Price" placeholder="350,000" form={form} updateField={updateField} formatCurrencyField={formatCurrencyField} unformatCurrencyField={unformatCurrencyField} />
            <CurrencyInput field="rehabBudget" label="Rehab Budget" placeholder="75,000" form={form} updateField={updateField} formatCurrencyField={formatCurrencyField} unformatCurrencyField={unformatCurrencyField} />
            <CurrencyInput field="arv" label="After Repair Value" placeholder="525,000" form={form} updateField={updateField} formatCurrencyField={formatCurrencyField} unformatCurrencyField={unformatCurrencyField} />
            <CurrencyInput field="loanAmountRequested" label="Loan Amount Requested" placeholder="262,500" form={form} updateField={updateField} formatCurrencyField={formatCurrencyField} unformatCurrencyField={unformatCurrencyField} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Loan Term</label>
              <select className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.loanTermMonths} onChange={e => updateField('loanTermMonths', e.target.value)}>
                <option value="6">6 Months</option><option value="9">9 Months</option><option value="12">12 Months</option><option value="18">18 Months</option><option value="24">24 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Property Type</label>
              <select className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.propertyType} onChange={e => updateField('propertyType', e.target.value)}>
                <option value="sfr">SFR</option><option value="2-4_unit">2-4 Unit</option><option value="condo">Condo</option><option value="townhome">Townhome</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Exit Strategy</label>
              <select className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.exitStrategy} onChange={e => updateField('exitStrategy', e.target.value)}>
                <option value="sell">Sell (Flip)</option><option value="refinance">Refinance</option><option value="hold_rent">Hold / Rent</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-light transition-colors">
              Next: Borrower Info <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Borrower Info */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-5 animate-fade-in">
          <h2 className="font-heading text-xl font-semibold text-navy">Borrower Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Full Legal Name *</label>
              <input type="text" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.borrowerName} onChange={e => updateField('borrowerName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email *</label>
              <input type="email" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.borrowerEmail} onChange={e => updateField('borrowerEmail', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Phone Number *</label>
              <input type="tel" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.borrowerPhone} onChange={e => updateField('borrowerPhone', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Entity Name (if applicable)</label>
              <input type="text" placeholder="LLC, Corp, Trust" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.entityName} onChange={e => updateField('entityName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Entity State of Formation</label>
              <input type="text" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.entityState} onChange={e => updateField('entityState', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Completed Flips</label>
              <select className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.borrowerExperience} onChange={e => updateField('borrowerExperience', e.target.value)}>
                {RTL_PRICING_TABLE.map(tier => (
                  <option key={tier.experience} value={tier.experience}>{tier.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Mailing Address</label>
            <input type="text" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={form.borrowerAddress} onChange={e => updateField('borrowerAddress', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Rehab Plan Description</label>
            <textarea maxLength={500} rows={3} className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none" placeholder="Briefly describe the scope of renovations..." value={form.rehabPlanDescription} onChange={e => updateField('rehabPlanDescription', e.target.value)} />
            <p className="text-xs text-text-tertiary mt-1">{form.rehabPlanDescription.length}/500 characters</p>
          </div>
          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-text-secondary px-6 py-3 rounded-lg font-medium hover:bg-surface-secondary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => setStep(3)} className="flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-light transition-colors">
              Next: Documents <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Documents */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h2 className="font-heading text-xl font-semibold text-navy mb-1">Document Upload</h2>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-green" />
              <p className="text-sm text-text-tertiary">Your documents are encrypted and securely stored.</p>
            </div>
          </div>
          <DocumentUploader label="Purchase Contract / LOI" files={docs.purchase_contract} onChange={f => setDocs(prev => ({ ...prev, purchase_contract: f }))} />
          <DocumentUploader label="Scope of Work / Rehab Budget" accept=".pdf,.xlsx,.jpg,.jpeg,.png" files={docs.sow} onChange={f => setDocs(prev => ({ ...prev, sow: f }))} />
          <DocumentUploader label="Proof of Funds / Bank Statements" files={docs.proof_of_funds} onChange={f => setDocs(prev => ({ ...prev, proof_of_funds: f }))} />
          <DocumentUploader label="Entity Docs (Operating Agreement, Articles)" files={docs.entity_docs} onChange={f => setDocs(prev => ({ ...prev, entity_docs: f }))} />
          <DocumentUploader label="Photo ID" accept=".jpg,.jpeg,.png" files={docs.photo_id} onChange={f => setDocs(prev => ({ ...prev, photo_id: f }))} />
          <DocumentUploader label="Additional Documents" multiple files={docs.other} onChange={f => setDocs(prev => ({ ...prev, other: f }))} />
          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(2)} className="flex items-center gap-2 text-text-secondary px-6 py-3 rounded-lg font-medium hover:bg-surface-secondary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => setStep(4)} className="flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-light transition-colors">
              Review & Submit <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {step === 4 && (() => {
        const outputs = getOutputs();
        const totalDocs = Object.values(docs).flat().length;
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
              <h2 className="font-heading text-xl font-semibold text-navy mb-6">Review Your Application</h2>

              {/* Property Summary */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Property & Loan</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-text-tertiary">Address:</span> <span className="font-medium">{form.propertyAddress || '—'}</span></div>
                  <div><span className="text-text-tertiary">Type:</span> <span className="font-medium capitalize">{form.propertyType.replace('_', ' ')}</span></div>
                  <div><span className="text-text-tertiary">Purchase:</span> <span className="font-medium">{formatCurrency(parseCurrencyInput(form.purchasePrice))}</span></div>
                  <div><span className="text-text-tertiary">Rehab:</span> <span className="font-medium">{formatCurrency(parseCurrencyInput(form.rehabBudget))}</span></div>
                  <div><span className="text-text-tertiary">ARV:</span> <span className="font-medium">{formatCurrency(parseCurrencyInput(form.arv))}</span></div>
                  <div><span className="text-text-tertiary">Loan Amount:</span> <span className="font-medium">{formatCurrency(parseCurrencyInput(form.loanAmountRequested))}</span></div>
                  <div><span className="text-text-tertiary">Term:</span> <span className="font-medium">{form.loanTermMonths} months</span></div>
                  <div><span className="text-text-tertiary">Rate:</span> <span className="font-medium">{formatPercent(outputs.estimatedRate, 2)}</span></div>
                  <div><span className="text-text-tertiary">LTARV:</span> <span className="font-medium">{formatPercent(outputs.ltarv)}</span></div>
                  <div><span className="text-text-tertiary">Exit:</span> <span className="font-medium capitalize">{form.exitStrategy.replace('_', ' ')}</span></div>
                </div>
              </div>

              {/* Borrower Summary */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Borrower</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-text-tertiary">Name:</span> <span className="font-medium">{form.borrowerName}</span></div>
                  <div><span className="text-text-tertiary">Email:</span> <span className="font-medium">{form.borrowerEmail}</span></div>
                  <div><span className="text-text-tertiary">Phone:</span> <span className="font-medium">{form.borrowerPhone}</span></div>
                  <div><span className="text-text-tertiary">Experience:</span> <span className="font-medium">{form.borrowerExperience} flips</span></div>
                  {form.entityName && <div className="col-span-2"><span className="text-text-tertiary">Entity:</span> <span className="font-medium">{form.entityName} ({form.entityState})</span></div>}
                </div>
              </div>

              {/* Documents Summary */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Documents ({totalDocs} uploaded)</h3>
                <div className="space-y-1">
                  {Object.entries(docs).map(([type, files]) =>
                    files.map((f, i) => (
                      <div key={`${type}-${i}`} className="flex items-center gap-2 text-sm">
                        <FileText className="w-3.5 h-3.5 text-text-tertiary" />
                        <span className="text-text-primary">{f.file.name}</span>
                      </div>
                    ))
                  )}
                  {totalDocs === 0 && <p className="text-sm text-text-tertiary">No documents uploaded</p>}
                </div>
              </div>

              {/* Certification */}
              <label className="flex items-start gap-3 bg-surface-secondary rounded-xl p-4 border border-border cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-border text-navy focus:ring-navy" />
                <span className="text-sm text-text-secondary">
                  I certify that the information provided above is accurate and complete to the best of my knowledge. I authorize Shepherd Mortgage to verify the information and documents submitted.
                </span>
              </label>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(3)} className="flex items-center gap-2 text-text-secondary px-6 py-3 rounded-lg font-medium hover:bg-surface-secondary transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!agreed || isPending}
                className="flex items-center gap-2 bg-accent-green text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {isPending ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  <>Submit Application <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
