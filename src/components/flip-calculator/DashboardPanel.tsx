'use client';

import { forwardRef } from 'react';
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

const DashboardPanel = forwardRef<HTMLDivElement, DashboardPanelProps>(
  function DashboardPanel({ results, inputs, hasInputs }, ref) {
    if (!hasInputs) {
      return (
        <div className="calc-card flex flex-col items-center justify-center h-full min-h-[500px] text-center px-8 py-12">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-calc-accent/15 blur-2xl rounded-full" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-calc-accent to-indigo-500 flex items-center justify-center shadow-lg shadow-calc-accent/30">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M7 14l4-4 4 4 6-6" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-calc-heading mb-2 tracking-tight">
            Your deal scorecard appears here
          </h3>
          <p className="text-calc-muted text-sm max-w-sm leading-relaxed">
            Enter a purchase price to see live profit, ROI, max allowable offer,
            and an A–F grade — updated as you type.
          </p>
        </div>
      );
    }

    return (
      <div ref={ref} className="space-y-4">
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
);

export default DashboardPanel;
