'use client';

import type { DealResults } from '@/lib/flip-calculator/engine';

type Status = 'pass' | 'marginal' | 'fail';

const statusStyles: Record<Status, string> = {
  pass: 'bg-calc-profit/10 text-calc-profit border-calc-profit/20',
  marginal: 'bg-calc-warning/10 text-calc-warning border-calc-warning/20',
  fail: 'bg-calc-loss/10 text-calc-loss border-calc-loss/20',
};

function Pill({ label, status }: { label: string; status: Status }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === 'pass'
            ? 'bg-calc-profit'
            : status === 'marginal'
              ? 'bg-calc-warning'
              : 'bg-calc-loss'
        }`}
      />
      {label}
    </span>
  );
}

export default function DealHealthIndicators({ results }: { results: DealResults }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Pill
        label="70% Rule"
        status={results.passes70Rule ? 'pass' : 'fail'}
      />
      <Pill
        label="Profit Margin"
        status={results.profitMarginStatus}
      />
      <Pill
        label="LTV"
        status={results.ltvUnderCap ? 'pass' : 'fail'}
      />
      <Pill
        label="Annualized ROI"
        status={results.annualizedRoiStatus}
      />
    </div>
  );
}
