// ============================================
// Hard Money Lending Platform — Type Definitions
// ============================================

// ----- Rate Configuration -----
export interface RateAdjustments {
  ltv_75_80: number;
  ltv_80_85: number;
  ltv_85_plus: number;
  first_time_borrower: number;
  low_experience: number;
  long_term: number;
  condo_townhome: number;
}

export interface RateConfig {
  id: string;
  base_rate: number;
  base_points: number;
  adjustments: RateAdjustments;
  updated_at: string;
}

// ----- Company Settings -----
export interface CompanySettings {
  id: string;
  company_name: string;
  logo_url: string | null;
  contact_email: string;
  contact_phone: string;
  updated_at: string;
}

// ----- Calculator -----
export type ExperienceTier = '0' | '1-3' | '4-6' | '7-11' | '12-15' | '16-19' | '20+';

export interface CalculatorInputs {
  propertyAddress: string;
  purchasePrice: number;
  rehabBudget: number;
  arv: number;
  loanAmountRequested: number;
  loanTermMonths: number;
  ficoScore: number;
  propertyType: 'sfr' | '2-4_unit' | 'condo' | 'townhome';
  exitStrategy: 'sell' | 'refinance' | 'hold_rent';
  borrowerExperience: ExperienceTier;
}

export interface CalculatorOutputs {
  ltv: number;
  ltc: number;
  ltarv: number;
  totalProjectCost: number;
  estimatedRate: number;
  originationFeePercent: number;
  originationFeeDollars: number;
  monthlyInterestPayment: number;
  totalInterestCost: number;
  totalLoanCost: number;
  estimatedProfit: number;
  roi: number;
  downPayment: number;
  // RTL pricing constraints
  maxInitialLTC: number;
  maxTotalLTC: number;
  maxARVLTV: number;
  maxNoRehabBridgeLTV: number;
  minFICO: number;
  ficoMeetsMinimum: boolean;
}

// ----- Loan Application -----
export interface LoanApplication {
  id: string;
  ref_number: string;
  status: ApplicationStatus;

  // Property Info
  property_address: string;
  property_city: string;
  property_state: string;
  property_zip: string;
  property_type: string;
  purchase_price: number;
  rehab_budget: number;
  arv: number;

  // Loan Terms Requested
  loan_amount_requested: number;
  loan_term_months: number;
  exit_strategy: string;

  // Borrower Info
  borrower_name: string;
  borrower_email: string;
  borrower_phone: string;
  entity_name: string | null;
  entity_state: string | null;
  borrower_address: string;
  borrower_experience: string;
  rehab_plan_description: string;

  // Calculated Fields
  ltv: number;
  ltc: number;
  ltarv: number;
  estimated_rate: number;
  estimated_points: number;
  total_project_cost: number;

  // Underwriting (admin)
  lender_notes: string | null;
  approved_loan_amount: number | null;
  approved_rate: number | null;
  approved_points: number | null;
  approved_term_months: number | null;
  holdback_amount: number | null;
  conditions: string | null;
  underwriting_checklist: UnderwritingChecklist;

  // Metadata
  submitted_by: string | null;
  created_at: string;
  updated_at: string;
}

export type ApplicationStatus = 'new' | 'in_review' | 'approved' | 'declined' | 'funded' | 'closed';

export interface UnderwritingChecklist {
  purchase_contract_reviewed?: boolean;
  sow_reviewed?: boolean;
  proof_of_funds_verified?: boolean;
  entity_docs_reviewed?: boolean;
  id_verified?: boolean;
  title_search_ordered?: boolean;
  appraisal_ordered?: boolean;
  insurance_verified?: boolean;
  loan_docs_prepared?: boolean;
  funding_scheduled?: boolean;
}

// ----- Application Documents -----
export interface ApplicationDocument {
  id: string;
  application_id: string;
  document_type: DocumentType;
  file_name: string;
  file_size: number;
  file_type: string;
  storage_path: string;
  uploaded_by: string | null;
  created_at: string;
}

export type DocumentType =
  | 'purchase_contract'
  | 'sow'
  | 'proof_of_funds'
  | 'entity_docs'
  | 'photo_id'
  | 'other'
  | 'lender_upload';

// ----- Profile -----
export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  role: 'borrower' | 'admin';
  created_at: string;
}

// ----- Dashboard KPIs -----
export interface DashboardKPIs {
  totalApplications: number;
  applicationsThisMonth: number;
  statusBreakdown: Record<ApplicationStatus, number>;
  totalLoanVolume: number;
  averageLTV: number;
}

// ----- Form State -----
export interface ApplicationFormData {
  // Property Info
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  propertyType: string;
  purchasePrice: string;
  rehabBudget: string;
  arv: string;
  loanAmountRequested: string;
  loanTermMonths: string;
  exitStrategy: string;

  // Borrower Info
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  entityName: string;
  entityState: string;
  borrowerAddress: string;
  borrowerExperience: string;
  rehabPlanDescription: string;
}
