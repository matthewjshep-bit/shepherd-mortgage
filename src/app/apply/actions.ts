'use server';

import { calculateDealEconomics, DEFAULT_RATE_CONFIG } from '@/lib/calculations';
import { isSupabaseConfigured } from '@/lib/local-storage';
import type { LoanApplication, ApplicationDocument, CalculatorInputs } from '@/types';

export interface SubmitApplicationResult {
  success: boolean;
  refNumber?: string;
  error?: string;
}

export async function submitApplication(formData: FormData): Promise<SubmitApplicationResult> {
  try {
    // Extract form fields
    const propertyAddress = formData.get('propertyAddress') as string;
    const propertyCity = formData.get('propertyCity') as string;
    const propertyState = formData.get('propertyState') as string;
    const propertyZip = formData.get('propertyZip') as string;
    const propertyType = formData.get('propertyType') as string;
    const purchasePrice = parseFloat(formData.get('purchasePrice') as string) || 0;
    const rehabBudget = parseFloat(formData.get('rehabBudget') as string) || 0;
    const arv = parseFloat(formData.get('arv') as string) || 0;
    const loanAmountRequested = parseFloat(formData.get('loanAmountRequested') as string) || 0;
    const loanTermMonths = parseInt(formData.get('loanTermMonths') as string) || 12;
    const exitStrategy = formData.get('exitStrategy') as string;
    const borrowerName = formData.get('borrowerName') as string;
    const borrowerEmail = formData.get('borrowerEmail') as string;
    const borrowerPhone = formData.get('borrowerPhone') as string;
    const entityName = formData.get('entityName') as string;
    const entityState = formData.get('entityState') as string;
    const borrowerAddress = formData.get('borrowerAddress') as string;
    const borrowerExperience = formData.get('borrowerExperience') as string;
    const rehabPlanDescription = formData.get('rehabPlanDescription') as string;

    // Validate required fields
    if (!borrowerName || !borrowerEmail || !purchasePrice || !loanAmountRequested) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    // Calculate deal economics
    const calcInputs: CalculatorInputs = {
      propertyAddress,
      purchasePrice,
      rehabBudget,
      arv,
      loanAmountRequested,
      loanTermMonths,
      ficoScore: 0,
      propertyType: propertyType as CalculatorInputs['propertyType'],
      exitStrategy: exitStrategy as CalculatorInputs['exitStrategy'],
      borrowerExperience: borrowerExperience as CalculatorInputs['borrowerExperience'],
    };

    const outputs = calculateDealEconomics(calcInputs, DEFAULT_RATE_CONFIG);

    if (isSupabaseConfigured()) {
      // ---- Supabase path ----
      const { createServiceClient } = await import('@/lib/supabase');
      const supabase = createServiceClient();

      // Try to fetch rate config from DB
      let rateConfig = DEFAULT_RATE_CONFIG;
      const { data: dbConfig } = await supabase.from('rate_config').select('*').limit(1).single();
      if (dbConfig) {
        rateConfig = dbConfig;
      }
      const dbOutputs = calculateDealEconomics(calcInputs, rateConfig);

      // Generate reference number
      const { count } = await supabase
        .from('loan_applications')
        .select('*', { count: 'exact', head: true });
      const seqNum = (count || 0) + 1;
      const refNumber = `LN-${new Date().getFullYear()}-${seqNum.toString().padStart(4, '0')}`;

      // Insert application
      const { data: application, error: insertError } = await supabase
        .from('loan_applications')
        .insert({
          ref_number: refNumber,
          status: 'new',
          property_address: propertyAddress,
          property_city: propertyCity,
          property_state: propertyState,
          property_zip: propertyZip,
          property_type: propertyType,
          purchase_price: purchasePrice,
          rehab_budget: rehabBudget,
          arv,
          loan_amount_requested: loanAmountRequested,
          loan_term_months: loanTermMonths,
          exit_strategy: exitStrategy,
          borrower_name: borrowerName,
          borrower_email: borrowerEmail,
          borrower_phone: borrowerPhone,
          entity_name: entityName || null,
          entity_state: entityState || null,
          borrower_address: borrowerAddress,
          borrower_experience: borrowerExperience,
          rehab_plan_description: rehabPlanDescription,
          ltv: dbOutputs.ltv,
          ltc: dbOutputs.ltc,
          ltarv: dbOutputs.ltarv,
          estimated_rate: dbOutputs.estimatedRate,
          estimated_points: dbOutputs.originationFeePercent,
          total_project_cost: dbOutputs.totalProjectCost,
          underwriting_checklist: {},
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return { success: false, error: 'Failed to submit application. Please try again.' };
      }

      // Upload documents
      const documentTypes = ['purchase_contract', 'sow', 'proof_of_funds', 'entity_docs', 'photo_id', 'other'];
      for (const docType of documentTypes) {
        const files = formData.getAll(`documents_${docType}`) as File[];
        for (const file of files) {
          if (file.size === 0) continue;
          const storagePath = `documents/${application.id}/${docType}/${file.name}`;
          await supabase.storage.from('documents').upload(storagePath, file);
          await supabase.from('application_documents').insert({
            application_id: application.id,
            document_type: docType,
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            storage_path: storagePath,
          });
        }
      }

      return { success: true, refNumber };
    } else {
      // ---- Local storage path ----
      const {
        insertApplication,
        getNextRefNumber,
        insertDocument,
        saveUploadedFile,
      } = await import('@/lib/local-storage');

      const refNumber = getNextRefNumber();

      const application = insertApplication({
        ref_number: refNumber,
        status: 'new',
        property_address: propertyAddress,
        property_city: propertyCity,
        property_state: propertyState,
        property_zip: propertyZip,
        property_type: propertyType,
        purchase_price: purchasePrice,
        rehab_budget: rehabBudget,
        arv,
        loan_amount_requested: loanAmountRequested,
        loan_term_months: loanTermMonths,
        exit_strategy: exitStrategy,
        borrower_name: borrowerName,
        borrower_email: borrowerEmail,
        borrower_phone: borrowerPhone,
        entity_name: entityName || null,
        entity_state: entityState || null,
        borrower_address: borrowerAddress,
        borrower_experience: borrowerExperience,
        rehab_plan_description: rehabPlanDescription,
        ltv: outputs.ltv,
        ltc: outputs.ltc,
        ltarv: outputs.ltarv,
        estimated_rate: outputs.estimatedRate,
        estimated_points: outputs.originationFeePercent,
        total_project_cost: outputs.totalProjectCost,
        lender_notes: null,
        approved_loan_amount: null,
        approved_rate: null,
        approved_points: null,
        approved_term_months: null,
        holdback_amount: null,
        conditions: null,
        underwriting_checklist: {},
        submitted_by: null,
      } as Omit<LoanApplication, 'id' | 'created_at' | 'updated_at'>);

      // Upload documents locally
      const documentTypes = ['purchase_contract', 'sow', 'proof_of_funds', 'entity_docs', 'photo_id', 'other'];
      for (const docType of documentTypes) {
        const files = formData.getAll(`documents_${docType}`) as File[];
        for (const file of files) {
          if (file.size === 0) continue;
          const storagePath = await saveUploadedFile(application.id, docType, file);
          insertDocument({
            application_id: application.id,
            document_type: docType as ApplicationDocument['document_type'],
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            storage_path: storagePath,
            uploaded_by: null,
          });
        }
      }

      return { success: true, refNumber };
    }
  } catch (err) {
    console.error('Submission error:', err);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
