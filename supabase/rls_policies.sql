-- ============================================================
-- MBA Partner — Supabase RLS Policies
-- Run this in Supabase SQL Editor → New Query
-- ============================================================

-- ── PROFILES TABLE ──────────────────────────────────────────
-- Already created in 001_initial_schema.sql
-- Enable RLS (if not already)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read & update their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Admins (service_role) can read all profiles
-- (handled automatically by service_role key bypassing RLS)

-- ── LEADS TABLE ─────────────────────────────────────────────
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anyone (anon or authed) can insert a lead (enrollment form)
CREATE POLICY "Anyone can insert lead"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Only service_role can read leads (admin CRM)
-- (service_role bypasses RLS, no explicit policy needed)

-- ── MOCK RESULTS TABLE (future) ─────────────────────────────
-- Uncomment when you add this table:
-- CREATE TABLE mock_results (
--   id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
--   user_id     uuid REFERENCES profiles(id) ON DELETE CASCADE,
--   mock_id     text NOT NULL,
--   score       int  NOT NULL,
--   total       int  NOT NULL,
--   answers     jsonb,
--   completed_at timestamptz DEFAULT now()
-- );
-- ALTER TABLE mock_results ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view own mock results"
--   ON mock_results FOR SELECT USING (auth.uid() = user_id);
-- CREATE POLICY "Users can insert own mock results"
--   ON mock_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ── TRIGGER: auto-create profile on signup ───────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, college, cv_sessions_done, pi_sessions_done, gd_sessions_done, enrolled_course)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'college',
    0, 0, 0,
    'bootcamp'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate trigger to avoid duplicates
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
