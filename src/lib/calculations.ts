// ============================================
// Loan Calculation Engine
// RTL Pricing – SFR (1-4 Units) Fix & Flip / Bridge
// Shared between borrower calculator + admin dashboard
// ============================================

import type { CalculatorInputs, CalculatorOutputs, RateConfig, ExperienceTier } from '@/types';

// ---- RTL Pricing Matrix by Experience Tier ----
export interface PricingTier {
  experience: ExperienceTier;
  label: string;
  initialLTC: number;    // Max % of purchase price
  rehabFunding: number;  // % of rehab funded (always 100%)
  totalLTC: number;      // Max total LTC cap
  arvLTV: number;        // Max ARV LTV
  noRehabBridgeLTV: number; // Max LTV for no-rehab bridge
  rate: number;          // Interest rate %
  minFICO: number;       // Minimum FICO score
}

export const RTL_PRICING_TABLE: PricingTier[] = [
  { experience: '0',     label: '0 (First Deal)',   initialLTC: 80, rehabFunding: 100, totalLTC: 93.5, arvLTV: 65, noRehabBridgeLTV: 70, rate: 12.50, minFICO: 720 },
  { experience: '1-3',   label: '1-3 Flips',        initialLTC: 85, rehabFunding: 100, totalLTC: 93.5, arvLTV: 70, noRehabBridgeLTV: 75, rate: 11.25, minFICO: 700 },
  { experience: '4-6',   label: '4-6 Flips',        initialLTC: 90, rehabFunding: 100, totalLTC: 93.5, arvLTV: 75, noRehabBridgeLTV: 75, rate: 9.99,  minFICO: 680 },
  { experience: '7-11',  label: '7-11 Flips',       initialLTC: 90, rehabFunding: 100, totalLTC: 93.5, arvLTV: 75, noRehabBridgeLTV: 75, rate: 9.50,  minFICO: 680 },
  { experience: '12-15', label: '12-15 Flips',      initialLTC: 90, rehabFunding: 100, totalLTC: 93.5, arvLTV: 75, noRehabBridgeLTV: 75, rate: 9.25,  minFICO: 680 },
  { experience: '16-19', label: '16-19 Flips',      initialLTC: 90, rehabFunding: 100, totalLTC: 93.5, arvLTV: 75, noRehabBridgeLTV: 75, rate: 8.75,  minFICO: 680 },
  { experience: '20+',   label: '20+ Flips',        initialLTC: 90, rehabFunding: 100, totalLTC: 93.5, arvLTV: 75, noRehabBridgeLTV: 75, rate: 8.50,  minFICO: 680 },
];

/**
 * Get the pricing tier for a given experience level
 */
export function getPricingTier(experience: ExperienceTier): PricingTier {
  return RTL_PRICING_TABLE.find(t => t.experience === experience) || RTL_PRICING_TABLE[0];
}

// Default rate config (kept for admin rate override compatibility)
export const DEFAULT_RATE_CONFIG: RateConfig = {
  id: 'default',
  base_rate: 11.0,
  base_points: 2.0,
  adjustments: {
    ltv_75_80: 0.5,
    ltv_80_85: 1.0,
    ltv_85_plus: 1.5,
    first_time_borrower: 1.0,
    low_experience: 0.5,
    long_term: 0.25,
    condo_townhome: 0.25,
  },
  updated_at: new Date().toISOString(),
};

/**
 * Calculate LTV: Loan Amount / Purchase Price × 100
 */
export function calculateLTV(loanAmount: number, purchasePrice: number): number {
  if (purchasePrice === 0) return 0;
  return (loanAmount / purchasePrice) * 100;
}

/**
 * Calculate LTC: Loan Amount / (Purchase Price + Rehab) × 100
 */
export function calculateLTC(loanAmount: number, purchasePrice: number, rehabBudget: number): number {
  const totalCost = purchasePrice + rehabBudget;
  if (totalCost === 0) return 0;
  return (loanAmount / totalCost) * 100;
}

/**
 * Calculate LTARV: Loan Amount / ARV × 100
 */
export function calculateLTARV(loanAmount: number, arv: number): number {
  if (arv === 0) return 0;
  return (loanAmount / arv) * 100;
}

/**
 * Get the rate based on RTL pricing table (by experience tier)
 * The rate is determined solely by the experience tier per the matrix.
 */
export function calculateRate(experience: ExperienceTier): number {
  const tier = getPricingTier(experience);
  return tier.rate;
}

/**
 * Calculate all deal economics from inputs
 */
export function calculateDealEconomics(
  inputs: CalculatorInputs,
  rateConfig: RateConfig
): CalculatorOutputs {
  const {
    purchasePrice,
    rehabBudget,
    arv,
    loanAmountRequested,
    loanTermMonths,
    ficoScore,
    borrowerExperience,
  } = inputs;

  // Get the pricing tier for this experience level
  const tier = getPricingTier(borrowerExperience);

  const ltv = calculateLTV(loanAmountRequested, purchasePrice);
  const ltc = calculateLTC(loanAmountRequested, purchasePrice, rehabBudget);
  const ltarv = calculateLTARV(loanAmountRequested, arv);
  const totalProjectCost = purchasePrice + rehabBudget;

  // Rate comes directly from the RTL pricing table
  const estimatedRate = tier.rate;

  const originationFeePercent = rateConfig.base_points;
  const originationFeeDollars = loanAmountRequested * (originationFeePercent / 100);

  // Interest-only monthly payment
  const monthlyInterestPayment = loanAmountRequested * (estimatedRate / 100 / 12);
  const totalInterestCost = monthlyInterestPayment * loanTermMonths;
  const totalLoanCost = originationFeeDollars + totalInterestCost;

  // Down payment = Purchase Price - Loan Amount (if loan < purchase price)
  const downPayment = Math.max(0, purchasePrice - loanAmountRequested);

  // Estimated profit
  const estimatedProfit = arv - purchasePrice - rehabBudget - totalLoanCost;

  // ROI = Profit / (Down Payment + Rehab out of pocket) × 100
  const totalOutOfPocket = downPayment + rehabBudget;
  const roi = totalOutOfPocket > 0 ? (estimatedProfit / totalOutOfPocket) * 100 : 0;

  // FICO qualification check
  const ficoMeetsMinimum = ficoScore === 0 || ficoScore >= tier.minFICO;

  return {
    ltv: Math.round(ltv * 100) / 100,
    ltc: Math.round(ltc * 100) / 100,
    ltarv: Math.round(ltarv * 100) / 100,
    totalProjectCost,
    estimatedRate,
    originationFeePercent,
    originationFeeDollars: Math.round(originationFeeDollars * 100) / 100,
    monthlyInterestPayment: Math.round(monthlyInterestPayment * 100) / 100,
    totalInterestCost: Math.round(totalInterestCost * 100) / 100,
    totalLoanCost: Math.round(totalLoanCost * 100) / 100,
    estimatedProfit: Math.round(estimatedProfit * 100) / 100,
    roi: Math.round(roi * 100) / 100,
    downPayment,
    // RTL pricing constraints from the tier
    maxInitialLTC: tier.initialLTC,
    maxTotalLTC: tier.totalLTC,
    maxARVLTV: tier.arvLTV,
    maxNoRehabBridgeLTV: tier.noRehabBridgeLTV,
    minFICO: tier.minFICO,
    ficoMeetsMinimum,
  };
}

/**
 * Calculate the max loan amount based on pricing tier constraints
 */
export function calculateMaxLoanAmount(
  purchasePrice: number,
  rehabBudget: number,
  arv: number,
  experience: ExperienceTier
): number {
  const tier = getPricingTier(experience);

  // Max based on Initial LTC (% of purchase price)
  const maxFromPurchase = purchasePrice * (tier.initialLTC / 100);

  // Max based on ARV LTV
  const maxFromARV = arv > 0 ? arv * (tier.arvLTV / 100) : Infinity;

  // Max based on Total LTC
  const totalCost = purchasePrice + rehabBudget;
  const maxFromTotalLTC = totalCost * (tier.totalLTC / 100);

  return Math.round(Math.min(maxFromPurchase, maxFromARV, maxFromTotalLTC));
}

/**
 * Suggest loan amount based on Initial LTC for the experience tier
 */
export function suggestLoanAmount(purchasePrice: number, experience: ExperienceTier = '4-6'): number {
  const tier = getPricingTier(experience);
  return Math.round(purchasePrice * (tier.initialLTC / 100));
}
