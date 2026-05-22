'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import type { DealResults } from '@/lib/flip-calculator/engine';

function fmt(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${n < 0 ? '-' : ''}$${(abs / 1_000_000).toFixed(1)}M`;
  return `${n < 0 ? '-' : ''}$${Math.round(abs).toLocaleString()}`;
}

interface WaterfallData {
  name: string;
  value: number;
  start: number;
  fill: string;
}

export default function WaterfallChart({
  results,
  arv,
}: {
  results: DealResults;
  arv: number;
}) {
  const categories: { name: string; value: number }[] = [
    { name: 'Sale Price', value: arv },
    { name: 'Purchase', value: -(results.costBreakdown.purchase) },
    { name: 'Rehab', value: -(results.costBreakdown.rehab) },
    { name: 'Financing', value: -(results.costBreakdown.financing) },
    { name: 'Holding', value: -(results.costBreakdown.holding) },
    { name: 'Selling', value: -(results.costBreakdown.selling) },
    { name: 'Net Profit', value: results.netProfit },
  ];

  // Build waterfall data — each bar positioned from running total
  let running = 0;
  const data: WaterfallData[] = categories.map((cat) => {
    if (cat.name === 'Sale Price') {
      running = cat.value;
      return { name: cat.name, value: cat.value, start: 0, fill: '#4F46E5' };
    }
    if (cat.name === 'Net Profit') {
      return {
        name: cat.name,
        value: cat.value,
        start: 0,
        fill: cat.value >= 0 ? '#059669' : '#DC2626',
      };
    }
    const start = running + cat.value;
    const d: WaterfallData = {
      name: cat.name,
      value: Math.abs(cat.value),
      start,
      fill: '#DC2626',
    };
    running = start;
    return d;
  });

  return (
    <div className="calc-card p-5">
      <h3 className="text-sm font-semibold text-calc-heading tracking-tight mb-4">
        Profit Waterfall
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#64748B' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#64748B' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => fmt(v)}
          />
          <Tooltip
            formatter={(value) => [fmt(Number(value)), 'Amount']}
            contentStyle={{
              background: '#FFFFFF',
              border: '1px solid #E7E5E0',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#0F172A',
              boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
            }}
          />
          <ReferenceLine y={0} stroke="#E7E5E0" />
          {/* Invisible bar for stacking offset */}
          <Bar dataKey="start" stackId="stack" fill="transparent" />
          <Bar dataKey="value" stackId="stack" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
