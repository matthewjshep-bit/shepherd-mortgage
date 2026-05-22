'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  TrendingUp,
  Hammer,
  Landmark,
  Receipt,
  ChevronDown,
  Banknote,
  Coins,
  Wallet,
} from 'lucide-react';
import type { DealInputs } from '@/lib/flip-calculator/engine';

/* ─────────── Persistent Hero Grid Input ─────────── */
interface HeroGridInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  icon: React.ReactNode;
}

function HeroGridInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  icon,
}: HeroGridInputProps) {
  const [focused, setFocused] = useState(false);
  const [rawText, setRawText] = useState('');
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  const display = focused
    ? rawText
    : value === 0
    ? ''
    : '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 });

  return (
    <div className="flex flex-col p-4 rounded-xl bg-calc-surface border border-calc-border hover:border-calc-accent/40 shadow-sm transition-all duration-200">
      <div className="flex items-center gap-1.5 mb-2 select-none">
        <span className="w-6 h-6 rounded-lg bg-calc-accent/8 text-calc-accent flex items-center justify-center">
          {icon}
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold text-calc-muted uppercase tracking-wider">
          {label}
        </span>
      </div>

      <div className="relative flex items-center mb-3">
        <input
          type="text"
          inputMode="decimal"
          value={display}
          onChange={(e) => {
            setRawText(e.target.value);
            const cleaned = e.target.value.replace(/[^0-9.\-]/g, '');
            const parsed = parseFloat(cleaned);
            if (!isNaN(parsed)) onChange(Math.min(max, Math.max(min, parsed)));
            else if (e.target.value === '') onChange(0);
          }}
          onFocus={() => {
            setFocused(true);
            setRawText(value > 0 ? String(value) : '');
          }}
          onBlur={() => setFocused(false)}
          placeholder="$0"
          className="bg-transparent text-xl sm:text-2xl font-semibold text-calc-heading tracking-tight tabular-nums outline-none w-full placeholder:text-calc-muted/20"
          aria-label={label}
        />
      </div>

      <div className="relative h-4 flex items-center px-0.5">
        <div className="absolute inset-x-0.5 h-1 rounded-full bg-calc-border">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-calc-accent to-indigo-400 transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-x-0 w-full h-4 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-calc-accent [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-calc-accent [&::-moz-range-thumb]:cursor-pointer"
          aria-label={`${label} slider`}
        />
      </div>
      <div className="flex justify-between text-[10px] text-calc-muted/50 tabular-nums px-0.5 mt-0.5 select-none">
        <span>$0</span>
        <span>{max >= 1_000_000 ? `$${(max / 1_000_000).toFixed(0)}M` : `$${(max / 1000).toFixed(0)}k`}</span>
      </div>
    </div>
  );
}

/* ─────────── Compact Input (for secondary options) ─────────── */
interface CompactInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: '$' | '%' | '#';
  suffix?: string;
  hint?: string;
}

function CompactInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = '$',
  suffix,
  hint,
}: CompactInputProps) {
  const [focused, setFocused] = useState(false);
  const [rawText, setRawText] = useState('');
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  const display = focused
    ? rawText
    : value === 0
    ? ''
    : prefix === '$'
    ? value.toLocaleString('en-US', { maximumFractionDigits: 0 })
    : String(value);

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between select-none">
        <label className="text-xs font-semibold text-calc-muted uppercase tracking-wider">{label}</label>
        {hint && <span className="text-[10px] text-calc-muted/70">{hint}</span>}
      </div>
      <div
        className={`flex items-center rounded-xl border bg-calc-surface transition-all duration-200 ${
          focused
            ? 'border-calc-accent ring-4 ring-calc-accent/10'
            : 'border-calc-border hover:border-calc-border/60'
        }`}
      >
        {prefix === '$' && (
          <span className="pl-3.5 text-sm text-calc-muted select-none">$</span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={display}
          onChange={(e) => {
            setRawText(e.target.value);
            const cleaned = e.target.value.replace(/[^0-9.\-]/g, '');
            const parsed = parseFloat(cleaned);
            if (!isNaN(parsed)) onChange(Math.min(max, Math.max(min, parsed)));
            else if (e.target.value === '') onChange(0);
          }}
          onFocus={() => {
            setFocused(true);
            setRawText(value > 0 ? String(value) : '');
          }}
          onBlur={() => setFocused(false)}
          placeholder="0"
          className="flex-1 bg-transparent text-sm text-calc-heading py-2.5 px-2 outline-none tabular-nums placeholder:text-calc-muted/30 font-medium"
          aria-label={label}
        />
        {prefix === '%' && (
          <span className="pr-3.5 text-sm text-calc-muted select-none">%</span>
        )}
        {suffix && (
          <span className="pr-3.5 text-xs text-calc-muted select-none font-semibold">{suffix}</span>
        )}
      </div>
      <div className="relative h-4 flex items-center px-0.5">
        <div className="absolute inset-x-0.5 h-1 rounded-full bg-calc-border">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-calc-accent/80 transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-x-0 w-full h-4 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-calc-accent [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-calc-accent [&::-moz-range-thumb]:cursor-pointer"
          aria-label={`${label} slider`}
        />
      </div>
    </div>
  );
}

/* ─────────── Text Input ─────────── */
function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-calc-muted uppercase tracking-wider select-none">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-calc-surface border border-calc-border rounded-xl px-3.5 py-2.5 text-sm text-calc-heading placeholder:text-calc-muted/40 outline-none focus:border-calc-accent focus:ring-4 focus:ring-calc-accent/10 transition-all duration-200 font-medium"
      />
    </div>
  );
}

/* ─────────── Financing Type Cards ─────────── */
const FINANCING_OPTIONS: {
  value: DealInputs['financingType'];
  label: string;
  blurb: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'hard-money',
    label: 'Hard Money',
    blurb: 'Fast, asset-based',
    icon: <Banknote className="w-4 h-4" />,
  },
  {
    value: 'private',
    label: 'Private',
    blurb: 'Individual lender',
    icon: <Coins className="w-4 h-4" />,
  },
  {
    value: 'conventional',
    label: 'Conventional',
    blurb: 'Bank loan',
    icon: <Landmark className="w-4 h-4" />,
  },
  {
    value: 'cash',
    label: 'Cash',
    blurb: 'No financing',
    icon: <Wallet className="w-4 h-4" />,
  },
];

function FinancingCards({
  value,
  onChange,
}: {
  value: DealInputs['financingType'];
  onChange: (v: DealInputs['financingType']) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 select-none">
      {FINANCING_OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-start gap-1 text-left p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              active
                ? 'border-calc-accent bg-calc-accent/5 shadow-sm'
                : 'border-calc-border bg-calc-surface hover:border-calc-accent/40'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                active
                  ? 'bg-calc-accent text-white'
                  : 'bg-calc-accent/10 text-calc-accent'
              }`}
            >
              {opt.icon}
            </div>
            <span className="text-xs font-bold text-calc-heading">
              {opt.label}
            </span>
            <span className="text-[10px] text-calc-muted font-medium">{opt.blurb}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────── Advanced Disclosure ─────────── */
function Advanced({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-calc-border/60 pt-4 mt-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs font-semibold text-calc-muted hover:text-calc-text transition-colors cursor-pointer select-none"
      >
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
        {open ? 'Hide' : 'Show'} Advanced Settings
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────── Main InputPanel Overhaul ─────────── */
interface InputPanelProps {
  inputs: DealInputs;
  setInput: <K extends keyof DealInputs>(key: K, value: DealInputs[K]) => void;
}

export default function InputPanel({ inputs, setInput }: InputPanelProps) {
  const [activeTab, setActiveTab] = useState<'property' | 'financing' | 'costs'>('property');
  const isCash = inputs.financingType === 'cash';

  return (
    <div className="calc-card-elevated p-5 sm:p-7 space-y-6">
      {/* 1. Persistent Top Row: Primary Deal Drivers */}
      <div>
        <h3 className="text-xs font-bold text-calc-heading uppercase tracking-wider mb-3 select-none flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-calc-accent" />
          Primary Deal Drivers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <HeroGridInput
            label="Purchase Price"
            value={inputs.purchasePrice}
            onChange={(v) => setInput('purchasePrice', v)}
            min={0}
            max={2000000}
            step={5000}
            icon={<Banknote className="w-4 h-4" />}
          />
          <HeroGridInput
            label="Rehab Budget"
            value={inputs.rehabCost}
            onChange={(v) => setInput('rehabCost', v)}
            min={0}
            max={500000}
            step={1000}
            icon={<Hammer className="w-4 h-4" />}
          />
          <HeroGridInput
            label="After Repair Value (ARV)"
            value={inputs.arv}
            onChange={(v) => setInput('arv', v)}
            min={0}
            max={3000000}
            step={5000}
            icon={<TrendingUp className="w-4 h-4" />}
          />
        </div>
      </div>

      <hr className="border-calc-border/60" />

      {/* 2. Unified Details Panel */}
      <div>
        <h3 className="text-xs font-bold text-calc-heading uppercase tracking-wider mb-3.5 select-none flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          Details &amp; carrying costs
        </h3>

        {/* Custom Segmented Tab Bar */}
        <div className="flex items-center border border-calc-border bg-calc-surface/60 rounded-xl p-1 gap-1 mb-5 select-none">
          <button
            onClick={() => setActiveTab('property')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'property'
                ? 'bg-calc-surface text-calc-accent shadow-sm border border-calc-border'
                : 'text-calc-muted hover:text-calc-heading hover:bg-calc-surface-hover border border-transparent'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">General &amp; Rehab</span>
            <span className="inline sm:hidden">General</span>
          </button>
          <button
            onClick={() => setActiveTab('financing')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'financing'
                ? 'bg-calc-surface text-calc-accent shadow-sm border border-calc-border'
                : 'text-calc-muted hover:text-calc-heading hover:bg-calc-surface-hover border border-transparent'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Financing</span>
          </button>
          <button
            onClick={() => setActiveTab('costs')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'costs'
                ? 'bg-calc-surface text-calc-accent shadow-sm border border-calc-border'
                : 'text-calc-muted hover:text-calc-heading hover:bg-calc-surface-hover border border-transparent'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Holding &amp; Exit</span>
            <span className="inline sm:hidden">Exit</span>
          </button>
        </div>

        {/* Tab Subpanels */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {/* Tab 1: General & Property Details */}
              {activeTab === 'property' && (
                <>
                  <TextInput
                    label="Property Address (optional)"
                    value={inputs.propertyAddress}
                    onChange={(v) => setInput('propertyAddress', v)}
                    placeholder="e.g. 123 Main St, Seattle, WA"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CompactInput
                      label="Rehab Timeline"
                      value={inputs.rehabTimeline}
                      onChange={(v) => setInput('rehabTimeline', v)}
                      min={1}
                      max={24}
                      step={1}
                      prefix="#"
                      suffix="months"
                      hint="Estimated project length"
                    />
                    <CompactInput
                      label="Total Hold Period"
                      value={inputs.holdMonths}
                      onChange={(v) => setInput('holdMonths', v)}
                      min={1}
                      max={36}
                      step={1}
                      prefix="#"
                      suffix="months"
                      hint="Purchase to sale duration"
                    />
                  </div>
                  <Advanced>
                    <CompactInput
                      label="Contingency Buffer"
                      value={inputs.contingencyPct}
                      onChange={(v) => setInput('contingencyPct', v)}
                      min={0}
                      max={30}
                      step={1}
                      prefix="%"
                      hint="Standard is 10–20%"
                    />
                    <CompactInput
                      label="Closing Costs (Buy)"
                      value={inputs.purchaseClosingPct}
                      onChange={(v) => setInput('purchaseClosingPct', v)}
                      min={0}
                      max={10}
                      step={0.25}
                      prefix="%"
                      hint="Buy closing: typical 1.5–3%"
                    />
                    <CompactInput
                      label="Inspection &amp; Due Diligence"
                      value={inputs.inspectionCost}
                      onChange={(v) => setInput('inspectionCost', v)}
                      min={0}
                      max={5000}
                      step={100}
                      hint="Appraisal, survey, one-time fees"
                    />
                  </Advanced>
                </>
              )}

              {/* Tab 2: Financing Details */}
              {activeTab === 'financing' && (
                <>
                  <FinancingCards
                    value={inputs.financingType}
                    onChange={(v) => setInput('financingType', v)}
                  />
                  {!isCash && (
                    <Advanced>
                      <CompactInput
                        label="Interest Rate"
                        value={inputs.interestRatePct}
                        onChange={(v) => setInput('interestRatePct', v)}
                        min={0}
                        max={20}
                        step={0.25}
                        prefix="%"
                        hint="Annual lender rate"
                      />
                      <CompactInput
                        label="Loan-to-Cost (LTC)"
                        value={inputs.ltcPct}
                        onChange={(v) => setInput('ltcPct', v)}
                        min={0}
                        max={100}
                        step={1}
                        prefix="%"
                        hint="Standard 75–90% cost leverage"
                      />
                      <CompactInput
                        label="ARV Cap (LTV)"
                        value={inputs.ltvArvCapPct}
                        onChange={(v) => setInput('ltvArvCapPct', v)}
                        min={0}
                        max={100}
                        step={1}
                        prefix="%"
                        hint="Maximum cap: typical 65–75%"
                      />
                      <CompactInput
                        label="Origination Points"
                        value={inputs.originationPointsPct}
                        onChange={(v) => setInput('originationPointsPct', v)}
                        min={0}
                        max={5}
                        step={0.25}
                        prefix="%"
                        hint="Points charged on loan size"
                      />
                      <CompactInput
                        label="Flat Lender Fees"
                        value={inputs.lenderFlatFees}
                        onChange={(v) => setInput('lenderFlatFees', v)}
                        min={0}
                        max={10000}
                        step={100}
                        hint="Underwriting, doc, flat fees"
                      />
                    </Advanced>
                  )}
                  {isCash && (
                    <div className="rounded-xl border border-calc-profit/20 bg-calc-profit/5 p-4 select-none">
                      <p className="text-xs text-calc-profit font-semibold flex items-center gap-1.5">
                        <Wallet className="w-4 h-4" />
                        All Cash Purchase Enabled
                      </p>
                      <p className="text-[11px] text-calc-muted mt-1 leading-relaxed">
                        Lender points, interest rate, flat lender fees, and LTC limits are deactivated. You are funding 100% of the acquisition and rehab costs with liquid cash.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Tab 3: Carrying & Selling Costs */}
              {activeTab === 'costs' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CompactInput
                      label="Annual Property Taxes"
                      value={inputs.annualTaxes}
                      onChange={(v) => setInput('annualTaxes', v)}
                      min={0}
                      max={30000}
                      step={100}
                      suffix="/yr"
                      hint="Assessor property taxes"
                    />
                    <CompactInput
                      label="Agent Commission"
                      value={inputs.agentPct}
                      onChange={(v) => setInput('agentPct', v)}
                      min={0}
                      max={10}
                      step={0.25}
                      prefix="%"
                      hint="Listing + buyer commissions: standard 5–6%"
                    />
                  </div>
                  <Advanced>
                    <CompactInput
                      label="Annual Insurance"
                      value={inputs.annualInsurance}
                      onChange={(v) => setInput('annualInsurance', v)}
                      min={0}
                      max={10000}
                      step={100}
                      suffix="/yr"
                      hint="Builder risk / hazard policies"
                    />
                    <CompactInput
                      label="Monthly Utilities"
                      value={inputs.monthlyUtilities}
                      onChange={(v) => setInput('monthlyUtilities', v)}
                      min={0}
                      max={1000}
                      step={25}
                      suffix="/mo"
                      hint="Power, water, gas, internet"
                    />
                    <CompactInput
                      label="Monthly HOA Fees"
                      value={inputs.monthlyHoa}
                      onChange={(v) => setInput('monthlyHoa', v)}
                      min={0}
                      max={1000}
                      step={25}
                      suffix="/mo"
                      hint="If property is in HOA zone"
                    />
                    <CompactInput
                      label="Seller Closing Costs"
                      value={inputs.sellerClosingPct}
                      onChange={(v) => setInput('sellerClosingPct', v)}
                      min={0}
                      max={5}
                      step={0.25}
                      prefix="%"
                      hint="Exit transfer fees: standard 1–2%"
                    />
                    <CompactInput
                      label="Transfer Tax"
                      value={inputs.transferTaxPct}
                      onChange={(v) => setInput('transferTaxPct', v)}
                      min={0}
                      max={5}
                      step={0.1}
                      prefix="%"
                      hint="State/municipal excise transfer taxes"
                    />
                    <CompactInput
                      label="Home Staging"
                      value={inputs.stagingCost}
                      onChange={(v) => setInput('stagingCost', v)}
                      min={0}
                      max={10000}
                      step={250}
                      hint="Professional prep before list"
                    />
                  </Advanced>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
