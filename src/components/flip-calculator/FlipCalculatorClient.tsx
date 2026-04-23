'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Sun,
  Moon,
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
    isDarkMode,
    toggleTheme,
    hasInputs,
  } = useFlipCalculator();

  const [savedDeals, setSavedDeals] = useState<SavedDeal[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [currentDealId, setCurrentDealId] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  // Ref for PDF capture
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Load saved deals on mount
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

  // PDF download using react-to-pdf
  const handleDownloadPdf = useCallback(async () => {
    if (!dashboardRef.current) return;

    // Dynamic import to keep bundle size down
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

  // Keyboard shortcuts
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
    <div className={isDarkMode ? '' : 'calc-light'}>
      <div className="min-h-[600px] bg-calc-bg text-calc-text transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-calc-border bg-calc-bg/80 backdrop-blur-xl">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-calc-heading tracking-tight">
                Deal Analyzer
              </span>
              {currentDealId && (
                <span className="text-[10px] text-calc-muted bg-calc-surface border border-calc-border rounded px-1.5 py-0.5">
                  Saved
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {/* Load Example */}
              {!hasInputs && (
                <button
                  onClick={loadExample}
                  className="flex items-center gap-1.5 text-xs font-medium text-calc-accent bg-calc-accent-bg border border-calc-accent/20 px-3 py-1.5 rounded-lg hover:bg-calc-accent/20 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Load Example
                </button>
              )}
              {/* Saved Deals */}
              <button
                onClick={() => setShowSaved(!showSaved)}
                className="flex items-center gap-1.5 text-xs text-calc-muted hover:text-calc-text px-2.5 py-1.5 rounded-lg hover:bg-calc-surface transition-colors cursor-pointer"
                title="Saved deals"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Saved ({savedDeals.length})</span>
              </button>
              {/* Save */}
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 text-xs text-calc-muted hover:text-calc-text px-2.5 py-1.5 rounded-lg hover:bg-calc-surface transition-colors cursor-pointer"
                title="Save deal (⌘S)"
              >
                <Save className="w-3.5 h-3.5" />
              </button>
              {/* Export PDF */}
              {hasInputs && (
                <button
                  onClick={() => setGateOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-medium text-calc-accent bg-calc-accent-bg border border-calc-accent/20 px-3 py-1.5 rounded-lg hover:bg-calc-accent/20 transition-colors cursor-pointer"
                  title="Export deal as PDF"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export PDF</span>
                </button>
              )}
              {/* New */}
              <button
                onClick={handleNew}
                className="flex items-center gap-1.5 text-xs text-calc-muted hover:text-calc-text px-2.5 py-1.5 rounded-lg hover:bg-calc-surface transition-colors cursor-pointer"
                title="New deal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 text-xs text-calc-muted hover:text-calc-text px-2.5 py-1.5 rounded-lg hover:bg-calc-surface transition-colors cursor-pointer"
                title="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-3.5 h-3.5" />
                ) : (
                  <Moon className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Save Toast */}
        {saveToast && (
          <div className="fixed top-20 right-6 z-50 bg-calc-profit/20 border border-calc-profit/30 text-calc-profit text-sm font-medium px-4 py-2 rounded-lg animate-fade-in">
            Deal saved ✓
          </div>
        )}

        {/* Saved Deals Dropdown */}
        {showSaved && (
          <div className="fixed top-14 right-4 z-50 w-80 max-h-96 overflow-y-auto bg-calc-surface border border-calc-border rounded-xl shadow-2xl p-2 animate-scale-in">
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
                    <p className="text-sm text-calc-text truncate">{deal.name}</p>
                    <p className="text-[10px] text-calc-muted">
                      {new Date(deal.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDeal(deal.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-calc-loss/50 hover:text-calc-loss p-1 transition-all cursor-pointer"
                    title="Delete deal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Main Layout */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Inputs */}
            <div className="w-full lg:w-[40%] lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto lg:pr-2">
              <InputPanel inputs={inputs} setInput={setInput} />
            </div>

            {/* Right: Dashboard */}
            <div className="w-full lg:w-[60%] lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
              <DashboardPanel
                ref={dashboardRef}
                results={results}
                inputs={inputs}
                hasInputs={hasInputs}
              />
            </div>
          </div>
        </div>

        {/* PDF Download Gate Modal */}
        <PdfDownloadGate
          isOpen={gateOpen}
          onClose={() => setGateOpen(false)}
          onDownload={handleDownloadPdf}
        />
      </div>
    </div>
  );
}
