'use client';

import type { DealInputs, DealResults } from '@/lib/flip-calculator/engine';
import HeroMetrics from './HeroMetrics';
import KeyCalculations from './KeyCalculations';
import DealHealthIndicators from './DealHealthIndicators';
import WaterfallChart from './WaterfallChart';
import DonutChart from './DonutChart';
import SensitivityHeatmap from './SensitivityHeatmap';

interface DashboardPanelProps {
  results: DealResults;
  inputs: DealInputs;
  hasInputs: boolean;
}

export default function DashboardPanel({
  results,
  inputs,
  hasInputs,
}: DashboardPanelProps) {
  if (!hasInputs) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-8">
        <div className="w-20 h-20 rounded-2xl bg-calc-accent/10 flex items-center justify-center mb-6">
          <span className="text-4xl">📊</span>
        </div>
        <h3 className="text-xl font-semibold text-calc-heading mb-2">
          No deal to analyze yet
        </h3>
        <p className="text-calc-muted text-sm max-w-sm">
          Enter a purchase price and ARV on the left to see your deal metrics,
          charts, and grade update in real-time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Hero Metrics */}
      <HeroMetrics results={results} />

      {/* Deal Health */}
      <DealHealthIndicators results={results} />

      {/* Key Calculations */}
      <KeyCalculations results={results} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WaterfallChart results={results} arv={inputs.arv} />
        <DonutChart results={results} />
      </div>

      {/* Sensitivity */}
      <SensitivityHeatmap inputs={inputs} />
    </div>
  );
}
