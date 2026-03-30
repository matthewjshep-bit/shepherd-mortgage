'use server';

import { isSupabaseConfigured } from '@/lib/local-storage';
import type { LoanApplication, ApplicationDocument, ApplicationStatus } from '@/types';
import { createServiceClient } from '@/lib/supabase';
import { 
  getApplications as getLocalApplications, 
  getApplication as getLocalApplicationById,
  getDocuments as getLocalDocuments 
} from '@/lib/local-storage';

export async function fetchApplications(): Promise<LoanApplication[]> {
  if (!isSupabaseConfigured()) {
    return getLocalApplications();
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('loan_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching from Supabase:', error);
      return getLocalApplications();
    }
    return (data || []) as LoanApplication[];
  } catch (err) {
    console.error('Exception in fetchApplications:', err);
    return getLocalApplications();
  }
}

export async function fetchApplication(id: string): Promise<LoanApplication | null> {
  if (!isSupabaseConfigured()) {
    return getLocalApplicationById(id);
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('loan_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching from Supabase:', error);
      return getLocalApplicationById(id);
    }
    return data as LoanApplication | null;
  } catch (err) {
    console.error('Exception in fetchApplicationById:', err);
    return getLocalApplicationById(id);
  }
}

export async function fetchDocuments(applicationId: string): Promise<ApplicationDocument[]> {
  if (!isSupabaseConfigured()) {
    return getLocalDocuments(applicationId);
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('application_documents')
      .select('*')
      .eq('application_id', applicationId);

    if (error) {
      console.error('Error fetching from Supabase:', error);
      return getLocalDocuments(applicationId);
    }
    return (data || []) as ApplicationDocument[];
  } catch (err) {
    console.error('Exception in fetchDocuments:', err);
    return getLocalDocuments(applicationId);
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
  if (!isSupabaseConfigured()) {
    const { updateApplication } = await import('@/lib/local-storage');
    updateApplication(id, updates as Partial<LoanApplication>);
    return { success: true };
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from('loan_applications').update({
      ...updates,
      updated_at: new Date().toISOString(),
    }).eq('id', id);

    if (error) {
      console.error('Error updating Supabase:', error);
      const { updateApplication } = await import('@/lib/local-storage');
      updateApplication(id, updates as Partial<LoanApplication>);
    }
  } catch (err) {
    console.error('Exception in updateApplicationAction:', err);
    const { updateApplication } = await import('@/lib/local-storage');
    updateApplication(id, updates as Partial<LoanApplication>);
  }
  return { success: true };
}

export async function fetchRateConfig() {
  if (!isSupabaseConfigured()) {
    const { getRateConfig } = await import('@/lib/local-storage');
    return getRateConfig();
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('rate_config').select('*').limit(1).single();
    if (error) {
      console.error('Error fetching rate config from Supabase:', error);
      const { getRateConfig } = await import('@/lib/local-storage');
      return getRateConfig();
    }
    return data;
  } catch (err) {
    console.error('Exception in fetchRateConfig:', err);
    const { getRateConfig } = await import('@/lib/local-storage');
    return getRateConfig();
  }
}

export async function saveRateConfigAction(config: { base_rate: number; base_points: number; adjustments: Record<string, number> }) {
  if (!isSupabaseConfigured()) {
    const { saveRateConfig } = await import('@/lib/local-storage');
    saveRateConfig(config as Record<string, number | Record<string, number>>);
    return { success: true };
  }

  try {
    const supabase = createServiceClient();
    const { data: existing } = await supabase.from('rate_config').select('id').limit(1).single();
    if (existing) {
      await supabase.from('rate_config').update({ ...config, updated_at: new Date().toISOString() }).eq('id', existing.id);
    } else {
      await supabase.from('rate_config').insert(config);
    }
  } catch (err) {
    console.error('Exception in saveRateConfigAction:', err);
    const { saveRateConfig } = await import('@/lib/local-storage');
    saveRateConfig(config as Record<string, number | Record<string, number>>);
  }
  return { success: true };
}

export async function fetchCompanySettings() {
  if (!isSupabaseConfigured()) {
    const { getCompanySettings } = await import('@/lib/local-storage');
    return getCompanySettings();
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('company_settings').select('*').limit(1).single();
    if (error) {
      console.error('Error fetching company settings from Supabase:', error);
      const { getCompanySettings } = await import('@/lib/local-storage');
      return getCompanySettings();
    }
    return data;
  } catch (err) {
    console.error('Exception in fetchCompanySettings:', err);
    const { getCompanySettings } = await import('@/lib/local-storage');
    return getCompanySettings();
  }
}

export async function saveCompanySettingsAction(settings: { company_name: string; contact_email: string; contact_phone: string }) {
  if (!isSupabaseConfigured()) {
    const { saveCompanySettings } = await import('@/lib/local-storage');
    saveCompanySettings(settings);
    return { success: true };
  }

  try {
    const supabase = createServiceClient();
    const { data: existing } = await supabase.from('company_settings').select('id').limit(1).single();
    if (existing) {
      await supabase.from('company_settings').update({ ...settings, updated_at: new Date().toISOString() }).eq('id', existing.id);
    } else {
      await supabase.from('company_settings').insert(settings);
    }
  } catch (err) {
    console.error('Exception in saveCompanySettingsAction:', err);
    const { saveCompanySettings } = await import('@/lib/local-storage');
    saveCompanySettings(settings);
  }
  return { success: true };
}
