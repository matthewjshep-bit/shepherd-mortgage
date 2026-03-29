'use server';

import { isSupabaseConfigured } from '@/lib/local-storage';
import type { LoanApplication, ApplicationDocument, ApplicationStatus } from '@/types';

export async function fetchApplications(): Promise<LoanApplication[]> {
  if (isSupabaseConfigured()) {
    const { createServiceClient } = await import('@/lib/supabase');
    const supabase = createServiceClient();
    const { data } = await supabase.from('loan_applications').select('*').order('created_at', { ascending: false });
    return (data || []) as LoanApplication[];
  } else {
    const { getApplications } = await import('@/lib/local-storage');
    return getApplications();
  }
}

export async function fetchApplication(id: string): Promise<LoanApplication | null> {
  if (isSupabaseConfigured()) {
    const { createServiceClient } = await import('@/lib/supabase');
    const supabase = createServiceClient();
    const { data } = await supabase.from('loan_applications').select('*').eq('id', id).single();
    return data as LoanApplication | null;
  } else {
    const { getApplication } = await import('@/lib/local-storage');
    return getApplication(id);
  }
}

export async function fetchDocuments(applicationId: string): Promise<ApplicationDocument[]> {
  if (isSupabaseConfigured()) {
    const { createServiceClient } = await import('@/lib/supabase');
    const supabase = createServiceClient();
    const { data } = await supabase.from('application_documents').select('*').eq('application_id', applicationId);
    return (data || []) as ApplicationDocument[];
  } else {
    const { getDocuments } = await import('@/lib/local-storage');
    return getDocuments(applicationId);
  }
}

export async function updateApplicationAction(
  id: string,
  updates: {
    status?: ApplicationStatus;
    lender_notes?: string;
    underwriting_checklist?: Record<string, boolean>;
    approved_loan_amount?: number | null;
    approved_rate?: number | null;
    approved_points?: number | null;
    approved_term_months?: number | null;
    holdback_amount?: number | null;
    conditions?: string | null;
  }
): Promise<{ success: boolean }> {
  if (isSupabaseConfigured()) {
    const { createServiceClient } = await import('@/lib/supabase');
    const supabase = createServiceClient();
    await supabase.from('loan_applications').update({
      ...updates,
      updated_at: new Date().toISOString(),
    }).eq('id', id);
  } else {
    const { updateApplication } = await import('@/lib/local-storage');
    updateApplication(id, updates as Partial<LoanApplication>);
  }
  return { success: true };
}

export async function fetchRateConfig() {
  if (isSupabaseConfigured()) {
    const { createServiceClient } = await import('@/lib/supabase');
    const supabase = createServiceClient();
    const { data } = await supabase.from('rate_config').select('*').limit(1).single();
    return data;
  } else {
    const { getRateConfig } = await import('@/lib/local-storage');
    return getRateConfig();
  }
}

export async function saveRateConfigAction(config: { base_rate: number; base_points: number; adjustments: Record<string, number> }) {
  if (isSupabaseConfigured()) {
    const { createServiceClient } = await import('@/lib/supabase');
    const supabase = createServiceClient();
    const { data: existing } = await supabase.from('rate_config').select('id').limit(1).single();
    if (existing) {
      await supabase.from('rate_config').update({ ...config, updated_at: new Date().toISOString() }).eq('id', existing.id);
    } else {
      await supabase.from('rate_config').insert(config);
    }
  } else {
    const { saveRateConfig } = await import('@/lib/local-storage');
    saveRateConfig(config as Record<string, number | Record<string, number>>);
  }
  return { success: true };
}

export async function fetchCompanySettings() {
  if (isSupabaseConfigured()) {
    const { createServiceClient } = await import('@/lib/supabase');
    const supabase = createServiceClient();
    const { data } = await supabase.from('company_settings').select('*').limit(1).single();
    return data;
  } else {
    const { getCompanySettings } = await import('@/lib/local-storage');
    return getCompanySettings();
  }
}

export async function saveCompanySettingsAction(settings: { company_name: string; contact_email: string; contact_phone: string }) {
  if (isSupabaseConfigured()) {
    const { createServiceClient } = await import('@/lib/supabase');
    const supabase = createServiceClient();
    const { data: existing } = await supabase.from('company_settings').select('id').limit(1).single();
    if (existing) {
      await supabase.from('company_settings').update({ ...settings, updated_at: new Date().toISOString() }).eq('id', existing.id);
    } else {
      await supabase.from('company_settings').insert(settings);
    }
  } else {
    const { saveCompanySettings } = await import('@/lib/local-storage');
    saveCompanySettings(settings);
  }
  return { success: true };
}
