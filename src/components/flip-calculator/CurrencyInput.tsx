'use client';

import { useRef, useState, useCallback, type ChangeEvent } from 'react';
import { HelpCircle } from 'lucide-react';

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: '$' | '%';
  suffix?: string;
  tooltip?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

function formatWithCommas(n: number): string {
  if (n === 0) return '';
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function parseNumeric(raw: string): number {
  const cleaned = raw.replace(/[^0-9.\-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export default function CurrencyInput({
  label,
  value,
  onChange,
  prefix = '$',
  suffix,
  tooltip,
  min,
  max,
  step = 1,
  placeholder = '0',
}: CurrencyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [displayValue, setDisplayValue] = useState(value > 0 ? formatWithCommas(value) : '');

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setDisplayValue(value > 0 ? String(value) : '');
  }, [value]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setDisplayValue(value > 0 ? formatWithCommas(value) : '');
  }, [value]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setDisplayValue(raw);
      let num = parseNumeric(raw);
      if (min !== undefined) num = Math.max(min, num);
      if (max !== undefined) num = Math.min(max, num);
      onChange(num);
    },
    [onChange, min, max]
  );

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-medium text-calc-muted uppercase tracking-wider">
          {label}
        </label>
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-calc-muted/50 hover:text-calc-muted transition-colors"
              aria-label={`Info about ${label}`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
            {showTooltip && (
              <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-calc-text bg-calc-surface border border-calc-border rounded-lg shadow-xl max-w-[220px] whitespace-normal">
                {tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-calc-border" />
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={`flex items-center gap-0 rounded-lg border transition-all duration-150 ${
          isFocused
            ? 'border-calc-border-focus ring-2 ring-calc-accent/20'
            : 'border-calc-border hover:border-calc-border/80'
        } bg-calc-bg`}
      >
        <span className="pl-3 text-sm text-calc-muted select-none">{prefix}</span>
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={isFocused ? displayValue : value > 0 ? formatWithCommas(value) : ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          step={step}
          className="flex-1 bg-transparent text-sm text-calc-text py-2.5 px-1.5 outline-none tabular-nums placeholder:text-calc-muted/30"
          aria-label={label}
        />
        {suffix && (
          <span className="pr-3 text-sm text-calc-muted select-none">{suffix}</span>
        )}
      </div>
    </div>
  );
}
