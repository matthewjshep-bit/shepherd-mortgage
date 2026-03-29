// ============================================
// Formatting Utilities
// ============================================

/**
 * Format a number as currency: $1,234,567
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number as currency with cents: $1,234.56
 */
export function formatCurrencyWithCents(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number as percentage: 75.5%
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Parse a currency string input (strips $, commas, spaces) → number
 */
export function parseCurrencyInput(str: string): number {
  const cleaned = str.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Format a number with commas for display in inputs: 1,234,567
 */
export function formatNumberWithCommas(value: number): string {
  if (value === 0) return '';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a date string for display
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format file size in bytes to human-readable
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Get color for LTV display
 */
export function getLTVColor(ltarv: number): 'green' | 'yellow' | 'red' {
  if (ltarv <= 70) return 'green';
  if (ltarv <= 75) return 'yellow';
  return 'red';
}

/**
 * Get status badge color
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800';
    case 'in_review': return 'bg-amber-100 text-amber-800';
    case 'approved': return 'bg-emerald-100 text-emerald-800';
    case 'declined': return 'bg-red-100 text-red-800';
    case 'funded': return 'bg-purple-100 text-purple-800';
    case 'closed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Format status for display
 */
export function formatStatus(status: string): string {
  switch (status) {
    case 'new': return 'New';
    case 'in_review': return 'In Review';
    case 'approved': return 'Approved';
    case 'declined': return 'Declined';
    case 'funded': return 'Funded';
    case 'closed': return 'Closed';
    default: return status;
  }
}
