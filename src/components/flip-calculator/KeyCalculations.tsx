'use client';

import { useState } from 'react';
import type { DealResults } from '@/lib/flip-calculator/engine';

function fmt(n: number): string {
  return n < 0
    ? `-$${Math.abs(Math.round(n)).toLocaleString()}`
    : `$${Math.round(n).toLocaleString()}`;
}

const rows: { label: string; key: keyof DealResults; tooltip: string }[] = [
  {
    label: 'Max Allowable Offer (70% Rule)',
    key: 'maxAllowableOffer',
    tooltip: 'ARV × 70% minus total rehab. The max you should pay per the 70% rule.',
  },
  {
    label: 'Total Project Cost',
    key: 'totalProjectCost',
    tooltip: 'Purchase + closing + rehab + financing + holding + selling costs.',
  },
  {
    label: 'Total Cash Required',
    key: 'cashInDeal',
    tooltip: 'All out-of-pocket cash: down payment + rehab + holding + selling + loan fees.',
  },
  {
    label: 'Loan Amount',
    key: 'loanAmount',
    tooltip: 'Min of (Purchase × LTC%) and (ARV × LTV cap%). Zero if paying cash.',
  },
  {
    label: 'Total Interest Paid',
    key: 'totalInterest',
    tooltip: '(Loan × Rate / 12) × hold months. Interest-only assumed.',
  },
  {
    label: 'Total Holding Costs',
    key: 'totalHoldingCosts',
    tooltip: '(Taxes + insurance)/12 + utilities + HOA, times hold months.',
  },
  {
    label: 'Total Selling Costs',
    key: 'totalSellingCosts',
    tooltip: 'Agent commission + seller closing + transfer tax + staging.',
  },
  {
    label: 'Break-even Sale Price',
    key: 'breakEvenSalePrice',
    tooltip: 'The minimum sale price to recover all costs — zero profit.',
  },
  {
    label: 'Profit per Month',
    key: 'profitPerMonth',
    tooltip: 'Net profit divided by hold months.',
  },
];

export default function KeyCalculations({ results }: { results: DealResults }) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div className="bg-calc-surface border border-calc-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-calc-border">
        <h3 className="text-sm font-semibold text-calc-heading tracking-tight">
          Key Calculations
        </h3>
      </div>
      <div className="divide-y divide-calc-border/50">
        {rows.map((row) => {
          const value = results[row.key] as number;
          return (
            <div
              key={row.key}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-calc-surface-hover transition-colors relative group"
              onMouseEnter={() => setHoveredRow(row.key)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <span className="text-sm text-calc-muted">{row.label}</span>
              <span
                className={`text-sm font-medium tabular-nums ${
                  value < 0 ? 'text-calc-loss' : 'text-calc-text'
                }`}
                style={{ fontFamily: 'var(--font-geist-mono)' }}
              >
                {fmt(value)}
              </span>
              {hoveredRow === row.key && (
                <div className="absolute right-4 bottom-full mb-2 px-3 py-2 text-xs text-calc-text bg-calc-surface border border-calc-border rounded-lg shadow-xl max-w-[280px] z-50">
                  {row.tooltip}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
