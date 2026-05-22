'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Save,
  RotateCcw,
  Sparkles,
  Trash2,
  FolderOpen,
  FileDown,
} from 'lucide-react';
import { useFlipCalculator } from '@/components/flip-calculator/useFlipCalculator';
import InputPanel from '@/components/flip-calculator/InputPanel';
import DashboardPanel from '@/components/flip-calculator/DashboardPanel';
import { PdfDownloadGate } from '@/components/flip-calculator/PdfDownloadGate';
import { saveDeal, loadDeals, deleteDeal, type SavedDeal } from '@/lib/flip-calculator/storage';

export default function FlipCalculatorClient() {
  const {
    inputs,
    setInput,
    results,
    resetInputs,
    loadExample,
    loadDeal,
    hasInputs,
  } = useFlipCalculator();

  const [savedDeals, setSavedDeals] = useState<SavedDeal[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [currentDealId, setCurrentDealId] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSavedDeals(loadDeals());
  }, []);

  const handleSave = useCallback(() => {
    const name =
      inputs.propertyAddress || `Deal — ${new Date().toLocaleDateString()}`;
    const deal = saveDeal(name, inputs, currentDealId ?? undefined);
    setCurrentDealId(deal.id);
    setSavedDeals(loadDeals());
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  }, [inputs, currentDealId]);

  const handleLoadDeal = useCallback(
    (deal: SavedDeal) => {
      loadDeal(deal.inputs);
      setCurrentDealId(deal.id);
      setShowSaved(false);
    },
    [loadDeal]
  );

  const handleDeleteDeal = useCallback((id: string) => {
    deleteDeal(id);
    setSavedDeals(loadDeals());
  }, []);

  const handleNew = useCallback(() => {
    resetInputs();
    setCurrentDealId(null);
  }, [resetInputs]);

  const handleDownloadPdf = useCallback(async () => {
    if (!dashboardRef.current) return;
    const { default: generatePDF, Resolution, Margin } = await import('react-to-pdf');

    const filename = inputs.propertyAddress
      ? `deal-${inputs.propertyAddress.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`
      : `fix-flip-deal-${new Date().toISOString().slice(0, 10)}.pdf`;

    await generatePDF(() => dashboardRef.current, {
      filename,
      method: 'save',
      resolution: Resolution.MEDIUM,
      page: {
        margin: Margin.MEDIUM,
        format: 'letter',
        orientation: 'portrait',
      },
      canvas: {
        mimeType: 'image/jpeg',
        qualityRatio: 0.85,
      },
    });
  }, [inputs.propertyAddress]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleSave]);

  return (
    <div className="min-h-[600px] text-calc-text">
      {/* Toolbar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentDealId && (
            <span className="text-[11px] font-medium text-calc-profit bg-calc-profit/10 border border-calc-profit/20 rounded-full px-2.5 py-0.5">
              Saved
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {!hasInputs && (
            <button
              onClick={loadExample}
              className="flex items-center gap-1.5 text-xs font-semibold text-calc-accent bg-calc-accent/8 border border-calc-accent/20 px-3 py-1.5 rounded-lg hover:bg-calc-accent/15 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Try example
            </button>
          )}
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="flex items-center gap-1.5 text-xs text-calc-muted hover:text-calc-heading px-2.5 py-1.5 rounded-lg hover:bg-calc-surface transition-colors cursor-pointer"
            title="Saved deals"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Saved ({savedDeals.length})</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 text-xs text-calc-muted hover:text-calc-heading px-2.5 py-1.5 rounded-lg hover:bg-calc-surface transition-colors cursor-pointer"
            title="Save deal (⌘S)"
          >
            <Save className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNew}
            className="flex items-center gap-1.5 text-xs text-calc-muted hover:text-calc-heading px-2.5 py-1.5 rounded-lg hover:bg-calc-surface transition-colors cursor-pointer"
            title="New deal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Save Toast */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-calc-profit/15 border border-calc-profit/30 text-calc-profit text-sm font-semibold px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          Deal saved ✓
        </div>
      )}

      {/* Saved Deals Dropdown */}
      {showSaved && (
        <div className="fixed top-20 right-4 z-50 w-80 max-h-96 overflow-y-auto bg-calc-surface border border-calc-border rounded-xl shadow-2xl p-2 animate-scale-in">
          <div className="px-2 py-1.5 mb-1">
            <span className="text-[11px] font-semibold text-calc-muted uppercase tracking-wider">
              Saved Deals
            </span>
          </div>
          {savedDeals.length === 0 ? (
            <p className="text-sm text-calc-muted px-2 py-4 text-center">
              No saved deals yet
            </p>
          ) : (
            savedDeals.map((deal) => (
              <div
                key={deal.id}
                className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-calc-surface-hover group cursor-pointer"
                onClick={() => handleLoadDeal(deal)}
              >
                <div className="min-w-0">
                  <p className="text-sm text-calc-heading truncate">{deal.name}</p>
                  <p className="text-[10px] text-calc-muted">
                    {new Date(deal.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDeal(deal.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-calc-loss/60 hover:text-calc-loss p-1 transition-all cursor-pointer"
                  title="Delete deal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Centered Export PDF CTA (Top Center) */}
      {hasInputs && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 flex justify-center select-none animate-fade-in">
          <button
            onClick={() => setGateOpen(true)}
            className="flex items-center gap-3 text-base sm:text-lg font-bold text-white bg-calc-accent px-10 py-4 rounded-2xl hover:bg-calc-accent/90 transition-all shadow-lg shadow-calc-accent/30 hover:shadow-2xl hover:shadow-calc-accent/40 hover:-translate-y-1 active:translate-y-0 duration-200 cursor-pointer"
          >
            <FileDown className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Export PDF report</span>
          </button>
        </div>
      )}

      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Inputs */}
          <div className="w-full lg:w-[42%]">
            <InputPanel inputs={inputs} setInput={setInput} />
          </div>

          {/* Right: Dashboard */}
          <div className="w-full lg:w-[58%] lg:sticky lg:top-6 lg:self-start">
            <DashboardPanel
              ref={dashboardRef}
              results={results}
              inputs={inputs}
              hasInputs={hasInputs}
            />
          </div>
        </div>
      </div>

      {/* Bottom Export PDF CTA */}
      {hasInputs && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 flex justify-center">
          <button
            onClick={() => setGateOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-calc-accent px-6 py-3 rounded-xl hover:bg-calc-accent/90 transition-all shadow-md shadow-calc-accent/25 hover:shadow-lg hover:shadow-calc-accent/30 cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            Export PDF report
          </button>
        </div>
      )}

      {/* PDF Download Gate Modal */}
      <PdfDownloadGate
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        onDownload={handleDownloadPdf}
      />
    </div>
  );
}
