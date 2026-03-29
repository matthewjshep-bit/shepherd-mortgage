-- ============================================
-- Shepherd Mortgage — Database Schema Migration
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'borrower' CHECK (role IN ('borrower', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Loan Applications
CREATE TABLE IF NOT EXISTS public.loan_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'approved', 'declined', 'funded', 'closed')),

  -- Property Info
  property_address TEXT,
  property_city TEXT,
  property_state TEXT,
  property_zip TEXT,
  property_type TEXT,
  purchase_price NUMERIC(12,2),
  rehab_budget NUMERIC(12,2),
  arv NUMERIC(12,2),

  -- Loan Terms
  loan_amount_requested NUMERIC(12,2),
  loan_term_months INTEGER,
  exit_strategy TEXT,

  -- Borrower Info
  borrower_name TEXT,
  borrower_email TEXT,
  borrower_phone TEXT,
  entity_name TEXT,
  entity_state TEXT,
  borrower_address TEXT,
  borrower_experience TEXT,
  rehab_plan_description TEXT,

  -- Calculated at submission
  ltv NUMERIC(5,2),
  ltc NUMERIC(5,2),
  ltarv NUMERIC(5,2),
  estimated_rate NUMERIC(5,3),
  estimated_points NUMERIC(5,3),
  total_project_cost NUMERIC(12,2),

  -- Underwriting (admin)
  lender_notes TEXT,
  approved_loan_amount NUMERIC(12,2),
  approved_rate NUMERIC(5,3),
  approved_points NUMERIC(5,3),
  approved_term_months INTEGER,
  holdback_amount NUMERIC(12,2),
  conditions TEXT,
  underwriting_checklist JSONB DEFAULT '{}',

  -- Metadata
  submitted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Application Documents
CREATE TABLE IF NOT EXISTS public.application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.loan_applications(id) ON DELETE CASCADE,
  document_type TEXT,
  file_name TEXT,
  file_size INTEGER,
  file_type TEXT,
  storage_path TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Rate Configuration
CREATE TABLE IF NOT EXISTS public.rate_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_rate NUMERIC(5,3) DEFAULT 11.0,
  base_points NUMERIC(5,3) DEFAULT 2.0,
  adjustments JSONB DEFAULT '{
    "ltv_75_80": 0.5,
    "ltv_80_85": 1.0,
    "ltv_85_plus": 1.5,
    "first_time_borrower": 1.0,
    "low_experience": 0.5,
    "long_term": 0.25,
    "condo_townhome": 0.25
  }',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Company Settings
CREATE TABLE IF NOT EXISTS public.company_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT DEFAULT 'Shepherd Mortgage',
  logo_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'borrower'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Auto-update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER loan_applications_updated_at
  BEFORE UPDATE ON public.loan_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- Row Level Security
-- ============================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own, admins can read all
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Loan Applications: borrowers own, admins all
CREATE POLICY "Borrowers can insert applications" ON public.loan_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Borrowers can view own applications" ON public.loan_applications FOR SELECT USING (
  borrower_email = (SELECT email FROM public.profiles WHERE id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update applications" ON public.loan_applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
-- Allow service role to insert (for unauthenticated borrower submissions)
CREATE POLICY "Service role can insert applications" ON public.loan_applications FOR INSERT WITH CHECK (true);

-- Application Documents
CREATE POLICY "Anyone can insert documents" ON public.application_documents FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all documents" ON public.application_documents FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Rate Config: public read, admin write
CREATE POLICY "Anyone can read rate config" ON public.rate_config FOR SELECT USING (true);
CREATE POLICY "Admins can update rate config" ON public.rate_config FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Company Settings: public read, admin write
CREATE POLICY "Anyone can read company settings" ON public.company_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update company settings" ON public.company_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- Seed default data
-- ============================================
INSERT INTO public.rate_config (base_rate, base_points, adjustments)
VALUES (11.0, 2.0, '{
  "ltv_75_80": 0.5,
  "ltv_80_85": 1.0,
  "ltv_85_plus": 1.5,
  "first_time_borrower": 1.0,
  "low_experience": 0.5,
  "long_term": 0.25,
  "condo_townhome": 0.25
}')
ON CONFLICT DO NOTHING;

INSERT INTO public.company_settings (company_name, contact_email, contact_phone)
VALUES ('Shepherd Mortgage', 'info@shepherdmortgage.com', '(555) 123-4567')
ON CONFLICT DO NOTHING;

-- ============================================
-- Storage Bucket
-- ============================================
-- Run this separately in the Supabase dashboard:
-- 1. Go to Storage > Create new bucket
-- 2. Name: "documents"
-- 3. Set to PRIVATE
-- 4. Add policy: service_role can do everything
