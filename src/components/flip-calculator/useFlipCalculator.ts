'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  calculateDeal,
  DEFAULT_INPUTS,
  EXAMPLE_DEAL,
  type DealInputs,
  type DealResults,
} from '@/lib/flip-calculator/engine';

export function useFlipCalculator() {
  const [inputs, setInputs] = useState<DealInputs>(DEFAULT_INPUTS);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const results: DealResults = useMemo(() => calculateDeal(inputs), [inputs]);

  const setInput = useCallback(<K extends keyof DealInputs>(key: K, value: DealInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetInputs = useCallback(() => setInputs(DEFAULT_INPUTS), []);
  const loadExample = useCallback(() => setInputs(EXAMPLE_DEAL), []);
  const loadDeal = useCallback((deal: DealInputs) => setInputs(deal), []);

  const toggleTheme = useCallback(() => setIsDarkMode((d) => !d), []);

  const hasInputs = inputs.purchasePrice > 0 || inputs.arv > 0;

  return {
    inputs,
    setInput,
    results,
    resetInputs,
    loadExample,
    loadDeal,
    isDarkMode,
    toggleTheme,
    hasInputs,
  };
}
