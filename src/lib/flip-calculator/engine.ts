/* ═══════════════════════════════════════════════════
   Fix & Flip Deal Analyzer — Calculation Engine
   Pure functions. No React. No side effects.
   ═══════════════════════════════════════════════════ */

export interface DealInputs {
  // Section 1: Property & Purchase
  propertyAddress: string;
  purchasePrice: number;
  arv: number;
  purchaseClosingPct: number; // default 2
  inspectionCost: number; // default 500

  // Section 2: Rehab
  rehabCost: number;
  contingencyPct: number; // default 10
  rehabTimeline: number; // months, default 3

  // Section 3: Financing
  financingType: 'cash' | 'hard-money' | 'private' | 'conventional';
  ltcPct: number; // default 85
  ltvArvCapPct: number; // default 70
  interestRatePct: number; // default 11
  originationPointsPct: number; // default 2
  lenderFlatFees: number; // default 0
  holdMonths: number; // default 6

  // Section 4: Holding & Selling
  annualTaxes: number;
  annualInsurance: number;
  monthlyUtilities: number;
  monthlyHoa: number;
  agentPct: number; // default 5.5
  sellerClosingPct: number; // default 1.5
  transferTaxPct: number; // default 0
  stagingCost: number; // default 2000
}

export type DealGrade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface DealResults {
  // Core outputs
  netProfit: number;
  totalRoi: number;
  annualizedRoi: number;
  profitMargin: number;
  dealGrade: DealGrade;

  // Key calculations
  maxAllowableOffer: number;
  totalProjectCost: number;
  cashInDeal: number;
  loanAmount: number;
  totalInterest: number;
  totalHoldingCosts: number;
  totalSellingCosts: number;
  breakEvenSalePrice: number;
  profitPerMonth: number;

  // Intermediate values (for tooltips)
  totalRehab: number;
  purchaseClosingCosts: number;
  downPayment: number;
  monthlyInterest: number;
  originationFee: number;
  totalFinancingCost: number;
  monthlyHolding: number;
  saleAgentCommission: number;
  saleClosingCosts: number;
  transferTax: number;

  // Cost breakdown (for donut chart)
  costBreakdown: {
    purchase: number;
    rehab: number;
    holding: number;
    financing: number;
    selling: number;
  };

  // Health indicators
  passes70Rule: boolean;
  profitMarginStatus: 'pass' | 'marginal' | 'fail';
  ltvUnderCap: boolean;
  annualizedRoiStatus: 'pass' | 'marginal' | 'fail';
}

export const DEFAULT_INPUTS: DealInputs = {
  propertyAddress: '',
  purchasePrice: 0,
  arv: 0,
  purchaseClosingPct: 2,
  inspectionCost: 500,
  rehabCost: 0,
  contingencyPct: 10,
  rehabTimeline: 3,
  financingType: 'hard-money',
  ltcPct: 85,
  ltvArvCapPct: 70,
  interestRatePct: 11,
  originationPointsPct: 2,
  lenderFlatFees: 0,
  holdMonths: 6,
  annualTaxes: 0,
  annualInsurance: 0,
  monthlyUtilities: 0,
  monthlyHoa: 0,
  agentPct: 5.5,
  sellerClosingPct: 1.5,
  transferTaxPct: 0,
  stagingCost: 2000,
};

export const EXAMPLE_DEAL: DealInputs = {
  propertyAddress: '1234 Elm Street, Seattle, WA 98101',
  purchasePrice: 425000,
  arv: 625000,
  purchaseClosingPct: 2,
  inspectionCost: 500,
  rehabCost: 85000,
  contingencyPct: 10,
  rehabTimeline: 3,
  financingType: 'hard-money',
  ltcPct: 85,
  ltvArvCapPct: 70,
  interestRatePct: 11,
  originationPointsPct: 2,
  lenderFlatFees: 1500,
  holdMonths: 6,
  annualTaxes: 5400,
  annualInsurance: 2400,
  monthlyUtilities: 250,
  monthlyHoa: 0,
  agentPct: 5.5,
  sellerClosingPct: 1.5,
  transferTaxPct: 0.5,
  stagingCost: 2000,
};

function getDealGrade(annualizedRoi: number, profitMargin: number, netProfit: number): DealGrade {
  if (netProfit <= 0) return 'F';
  if (annualizedRoi >= 0.40 && profitMargin >= 0.20) return 'A';
  if (annualizedRoi >= 0.25 && profitMargin >= 0.15) return 'B';
  if (annualizedRoi >= 0.15 && profitMargin >= 0.10) return 'C';
  return 'D';
}

export function calculateDeal(inputs: DealInputs): DealResults {
  const {
    purchasePrice,
    arv,
    purchaseClosingPct,
    inspectionCost,
    rehabCost,
    contingencyPct,
    financingType,
    ltcPct,
    ltvArvCapPct,
    interestRatePct,
    originationPointsPct,
    lenderFlatFees,
    holdMonths,
    annualTaxes,
    annualInsurance,
    monthlyUtilities,
    monthlyHoa,
    agentPct,
    sellerClosingPct,
    transferTaxPct,
    stagingCost,
  } = inputs;

  // Rehab
  const contingencyMultiplier = 1 + contingencyPct / 100;
  const totalRehab = rehabCost * contingencyMultiplier;

  // Financing
  const isCash = financingType === 'cash';
  const maxLoanFromCost = purchasePrice * (ltcPct / 100);
  const maxLoanFromArv = arv * (ltvArvCapPct / 100);
  const loanAmount = isCash ? 0 : Math.min(maxLoanFromCost, maxLoanFromArv);

  // Purchase costs
  const purchaseClosingCosts = purchasePrice * (purchaseClosingPct / 100);
  const downPayment = purchasePrice - loanAmount + purchaseClosingCosts + inspectionCost;

  // Interest & financing
  const monthlyInterest = holdMonths > 0 ? (loanAmount * (interestRatePct / 100)) / 12 : 0;
  const totalInterest = monthlyInterest * holdMonths;
  const originationFee = loanAmount * (originationPointsPct / 100);
  const totalFinancingCost = isCash ? 0 : totalInterest + originationFee + lenderFlatFees;

  // Holding
  const monthlyHolding = (annualTaxes + annualInsurance) / 12 + monthlyUtilities + monthlyHoa;
  const totalHoldingCosts = monthlyHolding * holdMonths;

  // Selling
  const saleAgentCommission = arv * (agentPct / 100);
  const saleClosingCosts = arv * (sellerClosingPct / 100);
  const transferTax = arv * (transferTaxPct / 100);
  const totalSellingCosts = saleAgentCommission + saleClosingCosts + transferTax + stagingCost;

  // Total project cost
  const totalProjectCost =
    purchasePrice +
    purchaseClosingCosts +
    inspectionCost +
    totalRehab +
    totalFinancingCost +
    totalHoldingCosts +
    totalSellingCosts;

  // Profit
  const netProfit = arv - totalProjectCost;
  const profitMargin = arv > 0 ? netProfit / arv : 0;

  // Cash in deal
  const cashInDeal =
    downPayment +
    totalRehab +
    totalHoldingCosts +
    totalSellingCosts +
    (isCash ? 0 : originationFee + lenderFlatFees);

  // ROI
  const totalRoi = cashInDeal > 0 ? netProfit / cashInDeal : 0;
  const safeHoldMonths = Math.max(holdMonths, 1);
  const annualizedRoi =
    cashInDeal > 0 && totalRoi > -1
      ? Math.pow(1 + totalRoi, 12 / safeHoldMonths) - 1
      : 0;

  // Key calculations
  const maxAllowableOffer = arv * 0.7 - totalRehab;
  const breakEvenSalePrice = totalProjectCost;
  const profitPerMonth = safeHoldMonths > 0 ? netProfit / safeHoldMonths : 0;

  // Grade
  const dealGrade = getDealGrade(annualizedRoi, profitMargin, netProfit);

  // Health indicators
  const passes70Rule = purchasePrice <= maxAllowableOffer;
  const profitMarginStatus: 'pass' | 'marginal' | 'fail' =
    profitMargin >= 0.15 ? 'pass' : profitMargin >= 0.10 ? 'marginal' : 'fail';
  const ltvUnderCap = loanAmount <= arv * (ltvArvCapPct / 100);
  const annualizedRoiStatus: 'pass' | 'marginal' | 'fail' =
    annualizedRoi >= 0.25 ? 'pass' : annualizedRoi >= 0.15 ? 'marginal' : 'fail';

  return {
    netProfit,
    totalRoi,
    annualizedRoi,
    profitMargin,
    dealGrade,
    maxAllowableOffer,
    totalProjectCost,
    cashInDeal,
    loanAmount,
    totalInterest,
    totalHoldingCosts,
    totalSellingCosts,
    breakEvenSalePrice,
    profitPerMonth,
    totalRehab,
    purchaseClosingCosts,
    downPayment,
    monthlyInterest,
    originationFee,
    totalFinancingCost,
    monthlyHolding,
    saleAgentCommission,
    saleClosingCosts,
    transferTax,
    costBreakdown: {
      purchase: purchasePrice + purchaseClosingCosts + inspectionCost,
      rehab: totalRehab,
      holding: totalHoldingCosts,
      financing: totalFinancingCost,
      selling: totalSellingCosts,
    },
    passes70Rule,
    profitMarginStatus,
    ltvUnderCap,
    annualizedRoiStatus,
  };
}
