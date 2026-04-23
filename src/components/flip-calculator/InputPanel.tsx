'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Home,
  Hammer,
  Landmark,
  Receipt,
} from 'lucide-react';
import CurrencyInput from './CurrencyInput';
import type { DealInputs } from '@/lib/flip-calculator/engine';

interface InputPanelProps {
  inputs: DealInputs;
  setInput: <K extends keyof DealInputs>(key: K, value: DealInputs[K]) => void;
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function Section({ title, icon, defaultOpen = true, children }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-calc-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-calc-surface hover:bg-calc-surface-hover transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-calc-accent">{icon}</span>
          <span className="text-sm font-semibold text-calc-heading tracking-tight">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-calc-muted" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-4 py-4 space-y-4 bg-calc-bg/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InputPanel({ inputs, setInput }: InputPanelProps) {
  return (
    <div className="space-y-4">
      {/* Section 1: Property & Purchase */}
      <Section
        title="Property & Purchase"
        icon={<Home className="w-4 h-4" />}
        defaultOpen={true}
      >
        <div>
          <label className="text-xs font-medium text-calc-muted uppercase tracking-wider">
            Property Address
          </label>
          <input
            type="text"
            value={inputs.propertyAddress}
            onChange={(e) => setInput('propertyAddress', e.target.value)}
            placeholder="Optional — for your reference"
            className="mt-1.5 w-full bg-calc-bg border border-calc-border rounded-lg px-3 py-2.5 text-sm text-calc-text placeholder:text-calc-muted/30 outline-none focus:border-calc-border-focus focus:ring-2 focus:ring-calc-accent/20 transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <CurrencyInput
            label="Purchase Price"
            value={inputs.purchasePrice}
            onChange={(v) => setInput('purchasePrice', v)}
            tooltip="What you're paying for the property"
          />
          <CurrencyInput
            label="After Repair Value"
            value={inputs.arv}
            onChange={(v) => setInput('arv', v)}
            tooltip="Estimated sale price after rehab is complete"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <CurrencyInput
            label="Closing Costs"
            value={inputs.purchaseClosingPct}
            onChange={(v) => setInput('purchaseClosingPct', v)}
            prefix="%"
            tooltip="Buyer closing costs as % of purchase price. Typical: 1.5–3%"
          />
          <CurrencyInput
            label="Inspection / DD"
            value={inputs.inspectionCost}
            onChange={(v) => setInput('inspectionCost', v)}
            tooltip="Inspection, appraisal, and due diligence fees"
          />
        </div>
      </Section>

      {/* Section 2: Rehab Budget */}
      <Section
        title="Rehab Budget"
        icon={<Hammer className="w-4 h-4" />}
        defaultOpen={true}
      >
        <CurrencyInput
          label="Total Rehab Cost"
          value={inputs.rehabCost}
          onChange={(v) => setInput('rehabCost', v)}
          tooltip="Estimated total renovation cost before contingency"
        />
        <div className="grid grid-cols-2 gap-3">
          <CurrencyInput
            label="Contingency Buffer"
            value={inputs.contingencyPct}
            onChange={(v) => setInput('contingencyPct', v)}
            prefix="%"
            tooltip="Extra buffer on top of rehab. Industry standard: 10–20%"
          />
          <CurrencyInput
            label="Rehab Timeline"
            value={inputs.rehabTimeline}
            onChange={(v) => setInput('rehabTimeline', v)}
            prefix="%"
            suffix="mos"
            tooltip="Expected renovation duration in months"
            placeholder="3"
          />
        </div>
      </Section>

      {/* Section 3: Financing */}
      <Section
        title="Financing"
        icon={<Landmark className="w-4 h-4" />}
        defaultOpen={true}
      >
        <div>
          <label className="text-xs font-medium text-calc-muted uppercase tracking-wider">
            Financing Type
          </label>
          <select
            value={inputs.financingType}
            onChange={(e) =>
              setInput('financingType', e.target.value as DealInputs['financingType'])
            }
            className="mt-1.5 w-full bg-calc-bg border border-calc-border rounded-lg px-3 py-2.5 text-sm text-calc-text outline-none focus:border-calc-border-focus focus:ring-2 focus:ring-calc-accent/20 transition-all cursor-pointer"
          >
            <option value="hard-money">Hard Money</option>
            <option value="private">Private Lending</option>
            <option value="conventional">Conventional</option>
            <option value="cash">Cash (No Financing)</option>
          </select>
        </div>
        {inputs.financingType !== 'cash' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <CurrencyInput
                label="Loan-to-Cost"
                value={inputs.ltcPct}
                onChange={(v) => setInput('ltcPct', v)}
                prefix="%"
                tooltip="Max loan as % of purchase price. Typical: 75–90%"
              />
              <CurrencyInput
                label="LTV / ARV Cap"
                value={inputs.ltvArvCapPct}
                onChange={(v) => setInput('ltvArvCapPct', v)}
                prefix="%"
                tooltip="Max loan as % of ARV. Most lenders cap at 65–75%"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <CurrencyInput
                label="Interest Rate"
                value={inputs.interestRatePct}
                onChange={(v) => setInput('interestRatePct', v)}
                prefix="%"
                tooltip="Annual interest rate on the loan"
              />
              <CurrencyInput
                label="Origination Points"
                value={inputs.originationPointsPct}
                onChange={(v) => setInput('originationPointsPct', v)}
                prefix="%"
                tooltip="Points charged by lender at closing. 1 point = 1% of loan amount"
              />
            </div>
            <CurrencyInput
              label="Lender Flat Fees"
              value={inputs.lenderFlatFees}
              onChange={(v) => setInput('lenderFlatFees', v)}
              tooltip="Processing, underwriting, doc fees, etc."
            />
          </>
        )}
        <CurrencyInput
          label="Total Hold Period"
          value={inputs.holdMonths}
          onChange={(v) => setInput('holdMonths', v)}
          prefix="%"
          suffix="mos"
          tooltip="Total months from purchase to sale. Include rehab + listing time"
          placeholder="6"
        />
      </Section>

      {/* Section 4: Holding & Selling Costs */}
      <Section
        title="Holding & Selling Costs"
        icon={<Receipt className="w-4 h-4" />}
        defaultOpen={false}
      >
        <div className="grid grid-cols-2 gap-3">
          <CurrencyInput
            label="Property Taxes"
            value={inputs.annualTaxes}
            onChange={(v) => setInput('annualTaxes', v)}
            suffix="/yr"
            tooltip="Annual property taxes"
          />
          <CurrencyInput
            label="Insurance"
            value={inputs.annualInsurance}
            onChange={(v) => setInput('annualInsurance', v)}
            suffix="/yr"
            tooltip="Annual hazard / builder's risk insurance"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <CurrencyInput
            label="Utilities"
            value={inputs.monthlyUtilities}
            onChange={(v) => setInput('monthlyUtilities', v)}
            suffix="/mo"
            tooltip="Monthly utility costs during hold"
          />
          <CurrencyInput
            label="HOA"
            value={inputs.monthlyHoa}
            onChange={(v) => setInput('monthlyHoa', v)}
            suffix="/mo"
            tooltip="Monthly HOA dues, if applicable"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <CurrencyInput
            label="Agent Commission"
            value={inputs.agentPct}
            onChange={(v) => setInput('agentPct', v)}
            prefix="%"
            tooltip="Total agent commission on sale. Typical: 5–6%"
          />
          <CurrencyInput
            label="Seller Closing"
            value={inputs.sellerClosingPct}
            onChange={(v) => setInput('sellerClosingPct', v)}
            prefix="%"
            tooltip="Seller-side closing costs. Typical: 1–2%"
          />
          <CurrencyInput
            label="Transfer Tax"
            value={inputs.transferTaxPct}
            onChange={(v) => setInput('transferTaxPct', v)}
            prefix="%"
            tooltip="Transfer/excise tax. Varies by state"
          />
        </div>
        <CurrencyInput
          label="Staging Cost"
          value={inputs.stagingCost}
          onChange={(v) => setInput('stagingCost', v)}
          tooltip="Cost to stage the property for sale"
        />
      </Section>
    </div>
  );
}
