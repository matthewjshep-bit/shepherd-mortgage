'use client';

import { calculateDeal, type DealInputs } from '@/lib/flip-calculator/engine';

function fmt(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000) {
    return `${n < 0 ? '-' : ''}$${Math.round(abs / 1_000)}k`;
  }
  return `${n < 0 ? '-' : ''}$${Math.round(abs)}`;
}

function fmtShort(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    return `$${Math.round(n / 1_000)}k`;
  }
  return `$${Math.round(n)}`;
}

const arvDeltas = [-10, -5, 0, 5, 10];
const rehabDeltas = [-20, -10, 0, 10, 20];

export default function SensitivityHeatmap({ inputs }: { inputs: DealInputs }) {
  const grid = rehabDeltas.map((rd) =>
    arvDeltas.map((ad) => {
      const modifiedInputs: DealInputs = {
        ...inputs,
        arv: inputs.arv * (1 + ad / 100),
        rehabCost: inputs.rehabCost * (1 + rd / 100),
      };
      return calculateDeal(modifiedInputs).netProfit;
    })
  );

  const allValues = grid.flat();
  const maxProfit = Math.max(...allValues, 1);
  const minProfit = Math.min(...allValues, -1);

  // Pre-compute actual values for headers
  const arvValues = arvDeltas.map((d) => inputs.arv * (1 + d / 100));
  const rehabValues = rehabDeltas.map((d) => inputs.rehabCost * (1 + d / 100));

  function getCellColor(profit: number): string {
    if (profit > 0) {
      const intensity = Math.min(profit / maxProfit, 1);
      return `rgba(16, 185, 129, ${0.15 + intensity * 0.55})`; // emerald
    }
    const intensity = Math.min(Math.abs(profit) / Math.abs(minProfit), 1);
    return `rgba(244, 63, 94, ${0.15 + intensity * 0.55})`; // rose
  }

  return (
    <div className="bg-calc-surface border border-calc-border rounded-xl p-4">
      <h3 className="text-sm font-semibold text-calc-heading tracking-tight mb-1">
        Sensitivity Analysis
      </h3>
      <p className="text-[11px] text-calc-muted mb-4">
        Net profit at different ARV and rehab scenarios
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-center" style={{ minWidth: 340 }}>
          <thead>
            <tr>
              <th className="text-[10px] text-calc-muted font-normal pb-1 pr-2 text-left">
                <span className="block">Rehab ↓</span>
                <span className="block opacity-50">ARV →</span>
              </th>
              {arvDeltas.map((d, i) => (
                <th
                  key={d}
                  className="text-[10px] text-calc-muted font-medium pb-1 px-1"
                >
                  <span className="block">{fmtShort(arvValues[i])}</span>
                  <span className="block opacity-50">
                    {d > 0 ? `+${d}%` : d === 0 ? 'Base' : `${d}%`}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rehabDeltas.map((rd, ri) => (
              <tr key={rd}>
                <td className="text-[10px] text-calc-muted font-medium py-0.5 pr-2 text-left">
                  <span className="block">{fmtShort(rehabValues[ri])}</span>
                  <span className="block opacity-50">
                    {rd > 0 ? `+${rd}%` : rd === 0 ? 'Base' : `${rd}%`}
                  </span>
                </td>
                {arvDeltas.map((_, ci) => {
                  const profit = grid[ri][ci];
                  const isBase = rd === 0 && arvDeltas[ci] === 0;
                  return (
                    <td key={ci} className="p-0.5">
                      <div
                        className={`rounded-md py-2 px-1 text-[11px] font-medium tabular-nums transition-colors ${
                          isBase ? 'ring-1 ring-calc-accent/50' : ''
                        }`}
                        style={{
                          backgroundColor: getCellColor(profit),
                          color: '#E5E7EB',
                          fontFamily: 'var(--font-geist-mono)',
                        }}
                        title={`ARV: ${fmtShort(arvValues[ci])} / Rehab: ${fmtShort(rehabValues[ri])}`}
                      >
                        {fmt(profit)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

