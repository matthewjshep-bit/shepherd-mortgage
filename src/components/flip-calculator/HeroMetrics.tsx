'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { DealResults, DealGrade } from '@/lib/flip-calculator/engine';

function formatCurrency(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${n < 0 ? '-' : ''}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${n < 0 ? '-' : ''}$${Math.round(abs).toLocaleString()}`;
  return `${n < 0 ? '-' : ''}$${Math.round(abs)}`;
}

function formatPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function useAnimatedNumber(target: number, duration = 300) {
  const [current, setCurrent] = useState(target);
  const raf = useRef<number>(0);
  const start = useRef(current);
  const startTime = useRef(0);

  useEffect(() => {
    start.current = current;
    startTime.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCurrent(start.current + (target - start.current) * eased);
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return current;
}

const gradeColors: Record<DealGrade, { bg: string; text: string; ring: string }> = {
  A: { bg: 'bg-calc-profit/20', text: 'text-calc-profit', ring: 'ring-calc-profit/30' },
  B: { bg: 'bg-calc-profit/10', text: 'text-calc-profit', ring: 'ring-calc-profit/20' },
  C: { bg: 'bg-calc-warning/10', text: 'text-calc-warning', ring: 'ring-calc-warning/20' },
  D: { bg: 'bg-calc-warning/10', text: 'text-calc-warning', ring: 'ring-calc-warning/20' },
  F: { bg: 'bg-calc-loss/10', text: 'text-calc-loss', ring: 'ring-calc-loss/20' },
};

export default function HeroMetrics({ results }: { results: DealResults }) {
  const animatedProfit = useAnimatedNumber(results.netProfit);
  const animatedRoi = useAnimatedNumber(results.totalRoi * 100);
  const animatedAnnRoi = useAnimatedNumber(results.annualizedRoi * 100);

  const profitColor =
    results.netProfit >= 0 ? 'text-calc-profit' : 'text-calc-loss';

  const grade = results.dealGrade;
  const gc = gradeColors[grade];

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Net Profit */}
      <div className="bg-calc-surface border border-calc-border rounded-xl p-4 flex flex-col">
        <span className="text-[11px] font-medium text-calc-muted uppercase tracking-wider mb-1">
          Net Profit
        </span>
        <span
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold tabular-nums tracking-tight leading-none ${profitColor}`}
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          {formatCurrency(animatedProfit)}
        </span>
        <span className="text-[11px] text-calc-muted mt-1.5 tabular-nums">
          {formatPct(results.profitMargin)} margin
        </span>
      </div>

      {/* ROI */}
      <div className="bg-calc-surface border border-calc-border rounded-xl p-4 flex flex-col">
        <span className="text-[11px] font-medium text-calc-muted uppercase tracking-wider mb-1">
          Return on Cash
        </span>
        <span
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold tabular-nums tracking-tight leading-none ${
            animatedRoi >= 0 ? 'text-calc-text' : 'text-calc-loss'
          }`}
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          {animatedRoi.toFixed(1)}%
        </span>
        <span className="text-[11px] text-calc-muted mt-1.5 tabular-nums">
          {animatedAnnRoi.toFixed(1)}% annualized
        </span>
      </div>

      {/* Deal Grade */}
      <div className="bg-calc-surface border border-calc-border rounded-xl p-4 flex flex-col items-center justify-center">
        <span className="text-[11px] font-medium text-calc-muted uppercase tracking-wider mb-2">
          Deal Grade
        </span>
        <motion.div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ring-2 ${gc.bg} ${gc.ring} ${
            grade === 'A' ? 'animate-grade-pulse' : ''
          }`}
        >
          <span
            className={`text-3xl font-bold ${gc.text}`}
            style={{ fontFamily: 'var(--font-geist-mono)' }}
          >
            {grade}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
