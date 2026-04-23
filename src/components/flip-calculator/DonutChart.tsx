'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { DealResults } from '@/lib/flip-calculator/engine';

const COLORS = ['#6366F1', '#F59E0B', '#10B981', '#F43F5E', '#8B5CF6'];

function fmt(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

export default function DonutChart({ results }: { results: DealResults }) {
  const data = [
    { name: 'Purchase', value: results.costBreakdown.purchase },
    { name: 'Rehab', value: results.costBreakdown.rehab },
    { name: 'Holding', value: results.costBreakdown.holding },
    { name: 'Financing', value: results.costBreakdown.financing },
    { name: 'Selling', value: results.costBreakdown.selling },
  ].filter((d) => d.value > 0);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-calc-surface border border-calc-border rounded-xl p-4">
      <h3 className="text-sm font-semibold text-calc-heading tracking-tight mb-4">
        Cost Breakdown
      </h3>
      <div className="flex items-center gap-6">
        <div className="w-[160px] h-[160px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={72}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [fmt(Number(value)), 'Cost']}
                contentStyle={{
                  background: '#111624',
                  border: '1px solid #1F2937',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#E5E7EB',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {data.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-xs text-calc-muted truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="text-xs font-medium text-calc-text tabular-nums"
                  style={{ fontFamily: 'var(--font-geist-mono)' }}
                >
                  {fmt(item.value)}
                </span>
                <span className="text-[10px] text-calc-muted tabular-nums w-8 text-right">
                  {total > 0 ? `${Math.round((item.value / total) * 100)}%` : '—'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
