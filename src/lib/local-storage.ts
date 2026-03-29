import fs from 'fs';
import path from 'path';
import type { LoanApplication, ApplicationDocument, RateConfig, CompanySettings } from '@/types';
import { DEFAULT_RATE_CONFIG } from '@/lib/calculations';

const DATA_DIR = path.join(process.cwd(), '.data');
const APPS_FILE = path.join(DATA_DIR, 'applications.json');
const DOCS_FILE = path.join(DATA_DIR, 'documents.json');
const RATE_FILE = path.join(DATA_DIR, 'rate_config.json');
const COMPANY_FILE = path.join(DATA_DIR, 'company_settings.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function readJSON<T>(filePath: string, fallback: T): T {
  ensureDataDir();
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return fallback;
  }
}

function writeJSON<T>(filePath: string, data: T) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// --- Applications ---

export function getApplications(): LoanApplication[] {
  return readJSON<LoanApplication[]>(APPS_FILE, []);
}

export function getApplication(id: string): LoanApplication | null {
  const apps = getApplications();
  return apps.find(a => a.id === id) || null;
}

export function insertApplication(app: Omit<LoanApplication, 'id' | 'created_at' | 'updated_at'>): LoanApplication {
  const apps = getApplications();
  const newApp: LoanApplication = {
    ...app,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as LoanApplication;
  apps.unshift(newApp);
  writeJSON(APPS_FILE, apps);
  return newApp;
}

export function updateApplication(id: string, updates: Partial<LoanApplication>): LoanApplication | null {
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === id);
  if (idx === -1) return null;
  apps[idx] = { ...apps[idx], ...updates, updated_at: new Date().toISOString() };
  writeJSON(APPS_FILE, apps);
  return apps[idx];
}

export function getNextRefNumber(): string {
  const apps = getApplications();
  const year = new Date().getFullYear();
  const seqNum = apps.length + 1;
  return `LN-${year}-${seqNum.toString().padStart(4, '0')}`;
}

// --- Documents ---

export function getDocuments(applicationId: string): ApplicationDocument[] {
  const docs = readJSON<ApplicationDocument[]>(DOCS_FILE, []);
  return docs.filter(d => d.application_id === applicationId);
}

export function insertDocument(doc: Omit<ApplicationDocument, 'id' | 'created_at'>): ApplicationDocument {
  const docs = readJSON<ApplicationDocument[]>(DOCS_FILE, []);
  const newDoc: ApplicationDocument = {
    ...doc,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  docs.push(newDoc);
  writeJSON(DOCS_FILE, docs);
  return newDoc;
}

export async function saveUploadedFile(applicationId: string, docType: string, file: File): Promise<string> {
  ensureDataDir();
  const appDir = path.join(UPLOADS_DIR, applicationId, docType);
  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });

  const filePath = path.join(appDir, file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return `uploads/${applicationId}/${docType}/${file.name}`;
}

// --- Rate Config ---

export function getRateConfig(): RateConfig {
  return readJSON<RateConfig>(RATE_FILE, DEFAULT_RATE_CONFIG);
}

export function saveRateConfig(config: Partial<RateConfig>): RateConfig {
  const current = getRateConfig();
  const updated = { ...current, ...config, updated_at: new Date().toISOString() };
  writeJSON(RATE_FILE, updated);
  return updated;
}

// --- Company Settings ---

const DEFAULT_COMPANY: CompanySettings = {
  id: 'default',
  company_name: 'Shepherd Mortgage',
  logo_url: null,
  contact_email: 'info@shepherdmortgage.com',
  contact_phone: '(555) 123-4567',
  updated_at: new Date().toISOString(),
};

export function getCompanySettings(): CompanySettings {
  return readJSON<CompanySettings>(COMPANY_FILE, DEFAULT_COMPANY);
}

export function saveCompanySettings(settings: Partial<CompanySettings>): CompanySettings {
  const current = getCompanySettings();
  const updated = { ...current, ...settings, updated_at: new Date().toISOString() };
  writeJSON(COMPANY_FILE, updated);
  return updated;
}

// --- Check if Supabase is configured ---
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && url.startsWith('https://') && !url.includes('your_supabase');
}
