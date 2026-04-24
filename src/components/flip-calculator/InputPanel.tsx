'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Home,
  Hammer,
  Landmark,
  Receipt,
} from 'lucide-react';
import type { DealInputs } from '@/lib/flip-calculator/engine';

/* ─────────── Read-only display ─────────── */
function ReadOnlyField({ label, value, tooltip }: { label: string; value: string; tooltip?: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-calc-muted uppercase tracking-wider">{label}</label>
        {tooltip && <span className="text-[10px] text-calc-muted/50 hidden sm:inline">{tooltip}</span>}
      </div>
      <div className="flex items-center rounded-lg border border-calc-border bg-calc-bg/50 px-3 py-2.5">
        <span className="text-sm text-calc-text tabular-nums font-medium">{value}</span>
      </div>
    </div>
  );
}

/* ─────────── Slider+Input Combo ─────────── */
interface SliderInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: '$' | '%' | '#';
  suffix?: string;
  tooltip?: string;
  placeholder?: string;
}

function formatDisplay(n: number, prefix: string): string {
  if (n === 0) return '';
  if (prefix === '$') return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  return String(n);
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = '$',
  suffix,
  tooltip,
  placeholder = '0',
}: SliderInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [rawText, setRawText] = useState('');

  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-calc-muted uppercase tracking-wider">
          {label}
        </label>
        {tooltip && (
          <span className="text-[10px] text-calc-muted/50 hidden sm:inline">{tooltip}</span>
        )}
      </div>
      {/* Number input */}
      <div
        className={`flex items-center gap-0 rounded-lg border transition-all duration-150 ${
          isFocused
            ? 'border-calc-border-focus ring-2 ring-calc-accent/20'
            : 'border-calc-border hover:border-calc-border/80'
        } bg-calc-bg`}
      >
        {prefix !== '#' && <span className="pl-3 text-sm text-calc-muted select-none">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={isFocused ? rawText : formatDisplay(value, prefix)}
          onChange={(e) => {
            setRawText(e.target.value);
            const cleaned = e.target.value.replace(/[^0-9.\-]/g, '');
            const parsed = parseFloat(cleaned);
            if (!isNaN(parsed)) onChange(Math.min(max, Math.max(min, parsed)));
          }}
          onFocus={() => {
            setIsFocused(true);
            setRawText(value > 0 ? String(value) : '');
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-calc-text py-2.5 px-1.5 outline-none tabular-nums placeholder:text-calc-muted/30"
          aria-label={label}
        />
        {suffix && <span className="pr-3 text-sm text-calc-muted select-none">{suffix}</span>}
      </div>
      {/* Slider */}
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-calc-border">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-calc-accent transition-all duration-100"
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
          className="absolute inset-x-0 w-full h-6 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-calc-accent [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-calc-accent [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-track]:bg-transparent"
          aria-label={`${label} slider`}
        />
      </div>
      <div className="flex justify-between text-[10px] text-calc-muted/40 tabular-nums">
        <span>{prefix === '$' ? `$${min.toLocaleString()}` : suffix ? `${min} ${suffix}` : `${min}%`}</span>
        <span>{prefix === '$' ? `$${max.toLocaleString()}` : suffix ? `${max} ${suffix}` : `${max}%`}</span>
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
      <label className="text-xs font-medium text-calc-muted uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-calc-bg border border-calc-border rounded-lg px-3 py-2.5 text-sm text-calc-text placeholder:text-calc-muted/30 outline-none focus:border-calc-border-focus focus:ring-2 focus:ring-calc-accent/20 transition-all"
      />
    </div>
  );
}

/* ─────────── Select Input ─────────── */
function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-calc-muted uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-calc-bg border border-calc-border rounded-lg px-3 py-2.5 text-sm text-calc-text outline-none focus:border-calc-border-focus focus:ring-2 focus:ring-calc-accent/20 transition-all cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ─────────── Step Config ─────────── */
interface Step {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    id: 'property',
    title: 'Purchase',
    subtitle: 'Property details and acquisition costs',
    icon: <Home className="w-5 h-5" />,
  },
  {
    id: 'rehab',
    title: 'Rehab & ARV',
    subtitle: 'Renovation scope and target sale price',
    icon: <Hammer className="w-5 h-5" />,
  },
  {
    id: 'financing',
    title: 'Financing',
    subtitle: 'How are you funding the deal?',
    icon: <Landmark className="w-5 h-5" />,
  },
  {
    id: 'costs',
    title: 'Holding & Selling',
    subtitle: 'Ongoing costs and exit fees',
    icon: <Receipt className="w-5 h-5" />,
  },
];

/* ─────────── Animation Variants ─────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

/* ─────────── Main Component ─────────── */
interface InputPanelProps {
  inputs: DealInputs;
  setInput: <K extends keyof DealInputs>(key: K, value: DealInputs[K]) => void;
}

export default function InputPanel({ inputs, setInput }: InputPanelProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [step]);

  const goPrev = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > step ? 1 : -1);
      setStep(idx);
    },
    [step]
  );

  // Scroll to top of panel on step change
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  return (
    <div ref={containerRef} className="space-y-0">
      {/* Progress Bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
                i === step
                  ? 'text-calc-accent'
                  : i < step
                  ? 'text-calc-profit'
                  : 'text-calc-muted/40'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  i === step
                    ? 'bg-calc-accent text-white'
                    : i < step
                    ? 'bg-calc-profit/20 text-calc-profit'
                    : 'bg-calc-surface border border-calc-border text-calc-muted/40'
                }`}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className="hidden md:inline">{s.title}</span>
            </button>
          ))}
        </div>
        <div className="h-1 bg-calc-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-calc-accent rounded-full"
            initial={false}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-calc-accent">{current.icon}</span>
          <h3 className="text-lg font-semibold text-calc-heading tracking-tight">
            {current.title}
          </h3>
        </div>
        <p className="text-sm text-calc-muted">{current.subtitle}</p>
      </div>

      {/* Step Content — Animated */}
      <div className="relative min-h-[320px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-5"
          >
            {step === 0 && (
              <StepProperty inputs={inputs} setInput={setInput} />
            )}
            {step === 1 && (
              <StepRehab inputs={inputs} setInput={setInput} />
            )}
            {step === 2 && (
              <StepFinancing inputs={inputs} setInput={setInput} />
            )}
            {step === 3 && (
              <StepCosts inputs={inputs} setInput={setInput} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-calc-border">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
            isFirst
              ? 'text-calc-muted/30 cursor-not-allowed'
              : 'text-calc-muted hover:text-calc-text hover:bg-calc-surface'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-xs text-calc-muted tabular-nums">
          {step + 1} of {STEPS.length}
        </span>
        {!isLast ? (
          <button
            onClick={goNext}
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-calc-accent px-5 py-2.5 rounded-xl hover:bg-calc-accent/90 transition-colors shadow-md shadow-calc-accent/20 cursor-pointer"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-sm font-semibold text-calc-profit bg-calc-profit/10 px-5 py-2.5 rounded-xl">
            <Check className="w-4 h-4" />
            Complete
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════ Step Panels ═══════════ */

function StepProperty({
  inputs,
  setInput,
}: InputPanelProps) {
  return (
    <>
      <TextInput
        label="Property Address"
        value={inputs.propertyAddress}
        onChange={(v) => setInput('propertyAddress', v)}
        placeholder="Optional — for your reference"
      />
      <SliderInput
        label="Purchase Price"
        value={inputs.purchasePrice}
        onChange={(v) => setInput('purchasePrice', v)}
        min={0}
        max={2000000}
        step={5000}
        tooltip="What you're paying for the property"
      />
      <div className="grid grid-cols-2 gap-4">
        <SliderInput
          label="Closing Costs"
          value={inputs.purchaseClosingPct}
          onChange={(v) => setInput('purchaseClosingPct', v)}
          min={0}
          max={10}
          step={0.25}
          prefix="%"
          tooltip="Typical: 1.5–3%"
        />
        <SliderInput
          label="Inspection / DD"
          value={inputs.inspectionCost}
          onChange={(v) => setInput('inspectionCost', v)}
          min={0}
          max={5000}
          step={100}
          tooltip="Inspection & appraisal fees"
        />
      </div>
    </>
  );
}

function StepRehab({
  inputs,
  setInput,
}: InputPanelProps) {
  return (
    <>
      <SliderInput
        label="Total Rehab Cost"
        value={inputs.rehabCost}
        onChange={(v) => setInput('rehabCost', v)}
        min={0}
        max={500000}
        step={1000}
        tooltip="Total renovation cost before contingency"
      />
      <SliderInput
        label="After Repair Value (ARV)"
        value={inputs.arv}
        onChange={(v) => setInput('arv', v)}
        min={0}
        max={3000000}
        step={5000}
        tooltip="Estimated sale price after rehab"
      />
      <div className="grid grid-cols-2 gap-4">
        <SliderInput
          label="Contingency Buffer"
          value={inputs.contingencyPct}
          onChange={(v) => setInput('contingencyPct', v)}
          min={0}
          max={30}
          step={1}
          prefix="%"
          tooltip="Industry standard: 10–20%"
        />
        <SliderInput
          label="Rehab Timeline"
          value={inputs.rehabTimeline}
          onChange={(v) => setInput('rehabTimeline', v)}
          min={1}
          max={24}
          step={1}
          prefix="#"
          suffix="mos"
          placeholder="3"
          tooltip="Renovation duration in months"
        />
      </div>
    </>
  );
}

function StepFinancing({
  inputs,
  setInput,
}: InputPanelProps) {
  return (
    <>
      <SelectInput
        label="Financing Type"
        value={inputs.financingType}
        onChange={(v) => setInput('financingType', v as DealInputs['financingType'])}
        options={[
          { value: 'hard-money', label: 'Hard Money' },
          { value: 'private', label: 'Private Lending' },
          { value: 'conventional', label: 'Conventional' },
          { value: 'cash', label: 'Cash (No Financing)' },
        ]}
      />
      {inputs.financingType !== 'cash' && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <SliderInput
              label="Loan-to-Cost"
              value={inputs.ltcPct}
              onChange={(v) => setInput('ltcPct', v)}
              min={0}
              max={100}
              step={1}
              prefix="%"
              tooltip="Typical: 75–90%"
            />
            <SliderInput
              label="LTV / ARV Cap"
              value={inputs.ltvArvCapPct}
              onChange={(v) => setInput('ltvArvCapPct', v)}
              min={0}
              max={100}
              step={1}
              prefix="%"
              tooltip="Most lenders: 65–75%"
            />
          </div>
          {/* Auto-calculated loan metrics */}
          {inputs.purchasePrice > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <ReadOnlyField
                label="Loan Amount"
                value={`$${Math.min(
                  inputs.purchasePrice * (inputs.ltcPct / 100),
                  inputs.arv * (inputs.ltvArvCapPct / 100)
                ).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                tooltip="Auto-calculated"
              />
              <ReadOnlyField
                label="Cash Required"
                value={`$${Math.max(0, inputs.purchasePrice - Math.min(
                  inputs.purchasePrice * (inputs.ltcPct / 100),
                  inputs.arv * (inputs.ltvArvCapPct / 100)
                ) + inputs.purchasePrice * (inputs.purchaseClosingPct / 100) + inputs.inspectionCost).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                tooltip="Down payment + closing"
              />
            </div>
          )}
          <SliderInput
            label="Interest Rate"
            value={inputs.interestRatePct}
            onChange={(v) => setInput('interestRatePct', v)}
            min={0}
            max={20}
            step={0.25}
            prefix="%"
            tooltip="Annual interest rate"
          />
          <div className="grid grid-cols-2 gap-4">
            <SliderInput
              label="Origination Points"
              value={inputs.originationPointsPct}
              onChange={(v) => setInput('originationPointsPct', v)}
              min={0}
              max={5}
              step={0.25}
              prefix="%"
              tooltip="Points charged on loan amount"
            />
            <SliderInput
              label="Lender Fees"
              value={inputs.lenderFlatFees}
              onChange={(v) => setInput('lenderFlatFees', v)}
              min={0}
              max={10000}
              step={100}
              tooltip="Flat processing / underwriting"
            />
          </div>
          <p className="text-[10px] text-calc-muted/50 -mt-2">
            Note: Some lenders charge points, others charge flat fees — enter whichever applies.
          </p>
        </>
      )}
      <SliderInput
        label="Total Hold Period"
        value={inputs.holdMonths}
        onChange={(v) => setInput('holdMonths', v)}
        min={1}
        max={36}
        step={1}
        prefix="#"
        suffix="mos"
        placeholder="6"
        tooltip="Purchase to sale, including rehab + listing"
      />
    </>
  );
}

function StepCosts({
  inputs,
  setInput,
}: InputPanelProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <SliderInput
          label="Property Taxes"
          value={inputs.annualTaxes}
          onChange={(v) => setInput('annualTaxes', v)}
          min={0}
          max={30000}
          step={100}
          suffix="/yr"
          tooltip="Annual property taxes"
        />
        <SliderInput
          label="Insurance"
          value={inputs.annualInsurance}
          onChange={(v) => setInput('annualInsurance', v)}
          min={0}
          max={10000}
          step={100}
          suffix="/yr"
          tooltip="Annual hazard / builder's risk"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SliderInput
          label="Utilities"
          value={inputs.monthlyUtilities}
          onChange={(v) => setInput('monthlyUtilities', v)}
          min={0}
          max={1000}
          step={25}
          suffix="/mo"
          tooltip="Monthly utilities during hold"
        />
        <SliderInput
          label="HOA"
          value={inputs.monthlyHoa}
          onChange={(v) => setInput('monthlyHoa', v)}
          min={0}
          max={1000}
          step={25}
          suffix="/mo"
          tooltip="Monthly HOA, if applicable"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SliderInput
          label="Agent Commission"
          value={inputs.agentPct}
          onChange={(v) => setInput('agentPct', v)}
          min={0}
          max={10}
          step={0.25}
          prefix="%"
          tooltip="Total agent commission. Typical: 5–6%"
        />
        <SliderInput
          label="Seller Closing"
          value={inputs.sellerClosingPct}
          onChange={(v) => setInput('sellerClosingPct', v)}
          min={0}
          max={5}
          step={0.25}
          prefix="%"
          tooltip="Seller-side closing. Typical: 1–2%"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SliderInput
          label="Transfer Tax"
          value={inputs.transferTaxPct}
          onChange={(v) => setInput('transferTaxPct', v)}
          min={0}
          max={5}
          step={0.1}
          prefix="%"
          tooltip="Transfer/excise tax. Varies by state"
        />
        <SliderInput
          label="Staging Cost"
          value={inputs.stagingCost}
          onChange={(v) => setInput('stagingCost', v)}
          min={0}
          max={10000}
          step={250}
          tooltip="Staging for sale"
        />
      </div>
    </>
  );
}
