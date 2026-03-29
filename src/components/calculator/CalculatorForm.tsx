'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { calculateDealEconomics, suggestLoanAmount, calculateMaxLoanAmount, DEFAULT_RATE_CONFIG, RTL_PRICING_TABLE } from '@/lib/calculations';
import { formatCurrency, formatCurrencyWithCents, formatPercent, formatNumberWithCommas, parseCurrencyInput, getLTVColor } from '@/lib/format';
import type { CalculatorInputs, RateConfig } from '@/types';
import { ArrowRight, TrendingUp, DollarSign, PiggyBank, AlertTriangle, CheckCircle, Info, ShieldCheck } from 'lucide-react';

const INITIAL_INPUTS: CalculatorInputs = {
  propertyAddress: '',
  purchasePrice: 0,
  rehabBudget: 0,
  arv: 0,
  loanAmountRequested: 0,
  loanTermMonths: 12,
  ficoScore: 0,
  propertyType: 'sfr',
  exitStrategy: 'sell',
  borrowerExperience: '4-6',
};

interface Props {
  rateConfig?: RateConfig;
}

export default function CalculatorForm({ rateConfig }: Props) {
  const config = rateConfig || DEFAULT_RATE_CONFIG;
  const [inputs, setInputs] = useState<CalculatorInputs>(INITIAL_INPUTS);
  const [currencyDisplays, setCurrencyDisplays] = useState({
    purchasePrice: '',
    rehabBudget: '',
    arv: '',
    loanAmountRequested: '',
  });

  const outputs = useMemo(() => {
    if (inputs.purchasePrice > 0) {
      return calculateDealEconomics(inputs, config);
    }
    return null;
  }, [inputs, config]);

  const handleCurrencyChange = (field: keyof typeof currencyDisplays, rawValue: string) => {
    const numericValue = parseCurrencyInput(rawValue);

    setCurrencyDisplays(prev => ({ ...prev, [field]: rawValue.replace(/[^0-9]/g, '') }));
    const newInputs = { ...inputs, [field]: numericValue };

    // Auto-suggest loan amount when purchase price changes (uses Initial LTC for experience tier)
    if (field === 'purchasePrice' && numericValue > 0 && inputs.loanAmountRequested === 0) {
      const suggested = suggestLoanAmount(numericValue, inputs.borrowerExperience);
      newInputs.loanAmountRequested = suggested;
      setCurrencyDisplays(prev => ({ ...prev, loanAmountRequested: suggested.toString() }));
    }

    setInputs(newInputs);
  };

  const handleCurrencyBlur = (field: keyof typeof currencyDisplays) => {
    const value = inputs[field] as number;
    setCurrencyDisplays(prev => ({
      ...prev,
      [field]: value > 0 ? formatNumberWithCommas(value) : '',
    }));
  };

  const handleCurrencyFocus = (field: keyof typeof currencyDisplays) => {
    const value = inputs[field] as number;
    setCurrencyDisplays(prev => ({
      ...prev,
      [field]: value > 0 ? value.toString() : '',
    }));
  };

  const ltvColor = outputs ? getLTVColor(outputs.ltarv) : 'green';
  const ltvColorClasses = {
    green: 'text-accent-green bg-emerald-50 border-emerald-200',
    yellow: 'text-accent-amber bg-amber-50 border-amber-200',
    red: 'text-accent-red bg-red-50 border-red-200',
  };

  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (inputs.propertyAddress) params.set('address', inputs.propertyAddress);
    if (inputs.purchasePrice) params.set('price', inputs.purchasePrice.toString());
    if (inputs.rehabBudget) params.set('rehab', inputs.rehabBudget.toString());
    if (inputs.arv) params.set('arv', inputs.arv.toString());
    if (inputs.loanAmountRequested) params.set('loan', inputs.loanAmountRequested.toString());
    params.set('term', inputs.loanTermMonths.toString());
    params.set('type', inputs.propertyType);
    params.set('exit', inputs.exitStrategy);
    params.set('exp', inputs.borrowerExperience);
    if (inputs.ficoScore > 0) params.set('fico', inputs.ficoScore.toString());
    return params.toString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT: Inputs */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-5">
          <h3 className="font-heading text-lg font-semibold text-navy flex items-center gap-2">
            <Info className="w-5 h-5 text-accent-blue" />
            Property & Deal Info
          </h3>

          {/* Property Address */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Property Address</label>
            <input
              type="text"
              placeholder="123 Main St, City, State, Zip"
              className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
              value={inputs.propertyAddress}
              onChange={(e) => setInputs(prev => ({ ...prev, propertyAddress: e.target.value }))}
            />
          </div>

          {/* Currency Inputs */}
          {([
            { field: 'purchasePrice' as const, label: 'Purchase Price', placeholder: '350,000' },
            { field: 'rehabBudget' as const, label: 'Rehab Budget', placeholder: '75,000' },
            { field: 'arv' as const, label: 'After Repair Value (ARV)', placeholder: '525,000' },
            { field: 'loanAmountRequested' as const, label: 'Loan Amount Requested', placeholder: '262,500' },
          ]).map(({ field, label, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">{label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary font-medium">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={placeholder}
                  className="w-full border border-border rounded-lg pl-7 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
                  value={currencyDisplays[field]}
                  onChange={(e) => handleCurrencyChange(field, e.target.value)}
                  onBlur={() => handleCurrencyBlur(field)}
                  onFocus={() => handleCurrencyFocus(field)}
                />
              </div>
              {field === 'loanAmountRequested' && inputs.purchasePrice > 0 && inputs.loanAmountRequested === 0 && (
                <p className="text-xs text-text-tertiary mt-1">Will auto-suggest at 75% of purchase price</p>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-5">
          <h3 className="font-heading text-lg font-semibold text-navy">Loan Details</h3>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Loan Term</label>
            <select
              className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors bg-white"
              value={inputs.loanTermMonths}
              onChange={(e) => setInputs(prev => ({ ...prev, loanTermMonths: parseInt(e.target.value) }))}
            >
              <option value={6}>6 Months</option>
              <option value={9}>9 Months</option>
              <option value={12}>12 Months</option>
              <option value={18}>18 Months</option>
              <option value={24}>24 Months</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Property Type</label>
            <select
              className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors bg-white"
              value={inputs.propertyType}
              onChange={(e) => setInputs(prev => ({ ...prev, propertyType: e.target.value as CalculatorInputs['propertyType'] }))}
            >
              <option value="sfr">Single Family Residence</option>
              <option value="2-4_unit">2-4 Unit</option>
              <option value="condo">Condo</option>
              <option value="townhome">Townhome</option>
            </select>
          </div>

          {/* Exit Strategy */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Exit Strategy</label>
            <select
              className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors bg-white"
              value={inputs.exitStrategy}
              onChange={(e) => setInputs(prev => ({ ...prev, exitStrategy: e.target.value as CalculatorInputs['exitStrategy'] }))}
            >
              <option value="sell">Sell (Flip)</option>
              <option value="refinance">Refinance</option>
              <option value="hold_rent">Hold / Rent</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Borrower Experience</label>
            <select
              className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors bg-white"
              value={inputs.borrowerExperience}
              onChange={(e) => setInputs(prev => ({ ...prev, borrowerExperience: e.target.value as CalculatorInputs['borrowerExperience'] }))}
            >
              {RTL_PRICING_TABLE.map(tier => (
                <option key={tier.experience} value={tier.experience}>{tier.label} — {tier.rate}%</option>
              ))}
            </select>
          </div>

          {/* FICO Score */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">FICO Score</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="680"
              min={300}
              max={850}
              className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors bg-white ${
                inputs.ficoScore > 0 && outputs && !outputs.ficoMeetsMinimum
                  ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                  : 'border-border focus:ring-navy/20 focus:border-navy'
              }`}
              value={inputs.ficoScore || ''}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setInputs(prev => ({ ...prev, ficoScore: Math.min(850, Math.max(0, val)) }));
              }}
            />
            {inputs.ficoScore > 0 && outputs && !outputs.ficoMeetsMinimum && (
              <p className="text-xs text-accent-red mt-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Below minimum of {outputs.minFICO} for this experience tier
              </p>
            )}
            {inputs.ficoScore > 0 && outputs && outputs.ficoMeetsMinimum && (
              <p className="text-xs text-accent-green mt-1.5 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Meets minimum FICO requirement ({outputs.minFICO}+)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Outputs */}
      <div className="space-y-6">
        {outputs ? (
          <>
            {/* Key Metrics */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-4">
              <h3 className="font-heading text-lg font-semibold text-navy flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent-blue" />
                Deal Analytics
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className={`rounded-xl border p-4 text-center ${ltvColorClasses[ltvColor]}`}>
                  <p className="text-xs font-medium opacity-70 mb-1">LTV</p>
                  <p className="text-2xl font-bold">{formatPercent(outputs.ltv)}</p>
                </div>
                <div className={`rounded-xl border p-4 text-center ${ltvColorClasses[getLTVColor(outputs.ltc)]}`}>
                  <p className="text-xs font-medium opacity-70 mb-1">LTC</p>
                  <p className="text-2xl font-bold">{formatPercent(outputs.ltc)}</p>
                </div>
                <div className={`rounded-xl border p-4 text-center ${ltvColorClasses[getLTVColor(outputs.ltarv)]}`}>
                  <p className="text-xs font-medium opacity-70 mb-1">LTARV</p>
                  <p className="text-2xl font-bold">{formatPercent(outputs.ltarv)}</p>
                </div>
              </div>
              {outputs.ltarv > outputs.maxARVLTV && (
                <div className="flex items-start gap-2 bg-red-50 rounded-lg p-3 border border-red-200">
                  <AlertTriangle className="w-4 h-4 text-accent-red mt-0.5 shrink-0" />
                  <p className="text-xs text-red-700">LTARV exceeds max of {formatPercent(outputs.maxARVLTV)} for this experience tier. Consider reducing loan amount or verifying ARV.</p>
                </div>
              )}
              {outputs.ltc > outputs.maxTotalLTC && (
                <div className="flex items-start gap-2 bg-red-50 rounded-lg p-3 border border-red-200">
                  <AlertTriangle className="w-4 h-4 text-accent-red mt-0.5 shrink-0" />
                  <p className="text-xs text-red-700">Total LTC exceeds max of {formatPercent(outputs.maxTotalLTC)} for this experience tier.</p>
                </div>
              )}
              {inputs.ficoScore > 0 && !outputs.ficoMeetsMinimum && (
                <div className="flex items-start gap-2 bg-red-50 rounded-lg p-3 border border-red-200">
                  <AlertTriangle className="w-4 h-4 text-accent-red mt-0.5 shrink-0" />
                  <p className="text-xs text-red-700">FICO score of {inputs.ficoScore} is below the minimum of {outputs.minFICO} required for this experience tier.</p>
                </div>
              )}
              {outputs.ltarv <= outputs.maxARVLTV && outputs.ltc <= outputs.maxTotalLTC && (inputs.ficoScore === 0 || outputs.ficoMeetsMinimum) && (
                <div className="flex items-start gap-2 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-accent-green mt-0.5 shrink-0" />
                  <p className="text-xs text-emerald-700">Within guidelines — all metrics within limits for this tier{inputs.ficoScore > 0 ? ', FICO qualified' : ''}.</p>
                </div>
              )}
            </div>

            {/* Financial Breakdown */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-accent-blue" />
                Financial Breakdown
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Total Project Cost', value: formatCurrency(outputs.totalProjectCost) },
                  { label: 'Down Payment', value: formatCurrency(outputs.downPayment) },
                  { label: 'Estimated Rate', value: formatPercent(outputs.estimatedRate, 2), highlight: true },
                  { label: `Origination Fee (${formatPercent(outputs.originationFeePercent)})`, value: formatCurrency(outputs.originationFeeDollars) },
                  { label: 'Monthly Interest Payment', value: formatCurrencyWithCents(outputs.monthlyInterestPayment) },
                  { label: `Total Interest (${inputs.loanTermMonths} mo)`, value: formatCurrency(outputs.totalInterestCost) },
                  { label: 'Total Loan Cost', value: formatCurrency(outputs.totalLoanCost), bold: true },
                ].map((row) => (
                  <div key={row.label} className={`flex items-center justify-between py-2 ${row.bold ? 'border-t border-border pt-3' : ''}`}>
                    <span className="text-sm text-text-secondary">{row.label}</span>
                    <span className={`text-sm font-semibold ${row.highlight ? 'text-navy' : row.bold ? 'text-navy text-base' : 'text-text-primary'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lending Guidelines */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent-blue" />
                Lending Guidelines
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-secondary rounded-lg p-3">
                  <p className="text-xs text-text-tertiary mb-0.5">Max Initial LTC</p>
                  <p className="text-lg font-bold text-navy">{formatPercent(outputs.maxInitialLTC)}</p>
                </div>
                <div className="bg-surface-secondary rounded-lg p-3">
                  <p className="text-xs text-text-tertiary mb-0.5">Max Total LTC</p>
                  <p className="text-lg font-bold text-navy">{formatPercent(outputs.maxTotalLTC)}</p>
                </div>
                <div className="bg-surface-secondary rounded-lg p-3">
                  <p className="text-xs text-text-tertiary mb-0.5">Max ARV LTV</p>
                  <p className="text-lg font-bold text-navy">{formatPercent(outputs.maxARVLTV)}</p>
                </div>
                <div className="bg-surface-secondary rounded-lg p-3">
                  <p className="text-xs text-text-tertiary mb-0.5">Min FICO</p>
                  <p className="text-lg font-bold text-navy">{outputs.minFICO}</p>
                </div>
              </div>
              {inputs.purchasePrice > 0 && (
                <div className="mt-3 bg-surface-tertiary rounded-lg p-3">
                  <p className="text-xs text-text-tertiary mb-0.5">Max Loan Amount (per guidelines)</p>
                  <p className="text-lg font-bold text-navy">
                    {formatCurrency(calculateMaxLoanAmount(inputs.purchasePrice, inputs.rehabBudget, inputs.arv, inputs.borrowerExperience))}
                  </p>
                </div>
              )}
            </div>

            {/* Profit & ROI */}
            <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 shadow-lg text-white">
              <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-accent-green" />
                Projected Returns
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-xs text-white/60 mb-1">Estimated Profit</p>
                  <p className={`text-2xl font-bold ${outputs.estimatedProfit >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {formatCurrency(outputs.estimatedProfit)}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-xs text-white/60 mb-1">Cash-on-Cash ROI</p>
                  <p className={`text-2xl font-bold ${outputs.roi >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {formatPercent(outputs.roi)}
                  </p>
                </div>
              </div>
            </div>

            {/* Deal Summary Card */}
            <div className="bg-white rounded-2xl border-2 border-navy/10 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-semibold text-navy">Deal Summary</h3>
                <span className="text-xs text-text-tertiary">Shepherd Mortgage</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-6">
                {inputs.propertyAddress && (
                  <div className="col-span-2">
                    <span className="text-text-tertiary">Property:</span>
                    <span className="ml-2 font-medium">{inputs.propertyAddress}</span>
                  </div>
                )}
                <div><span className="text-text-tertiary">Purchase:</span> <span className="font-medium">{formatCurrency(inputs.purchasePrice)}</span></div>
                <div><span className="text-text-tertiary">Rehab:</span> <span className="font-medium">{formatCurrency(inputs.rehabBudget)}</span></div>
                <div><span className="text-text-tertiary">ARV:</span> <span className="font-medium">{formatCurrency(inputs.arv)}</span></div>
                <div><span className="text-text-tertiary">Loan:</span> <span className="font-medium">{formatCurrency(inputs.loanAmountRequested)}</span></div>
                <div><span className="text-text-tertiary">Rate:</span> <span className="font-medium">{formatPercent(outputs.estimatedRate, 2)}</span></div>
                <div><span className="text-text-tertiary">Term:</span> <span className="font-medium">{inputs.loanTermMonths} months</span></div>
                <div><span className="text-text-tertiary">LTARV:</span> <span className="font-medium">{formatPercent(outputs.ltarv)}</span></div>
                <div><span className="text-text-tertiary">Profit:</span> <span className={`font-medium ${outputs.estimatedProfit >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>{formatCurrency(outputs.estimatedProfit)}</span></div>
              </div>
              <Link
                href={`/apply?${buildQueryString()}`}
                className="w-full flex items-center justify-center gap-2 bg-accent-green text-white font-semibold py-3.5 rounded-xl hover:bg-green-500 transition-colors text-base"
              >
                Apply for This Loan
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="bg-surface-secondary rounded-2xl border border-border p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-navy/30" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-text-secondary mb-2">Enter Your Deal Details</h3>
            <p className="text-sm text-text-tertiary max-w-sm mx-auto">
              Start by entering a purchase price on the left. All outputs will calculate in real-time as you fill in the details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
