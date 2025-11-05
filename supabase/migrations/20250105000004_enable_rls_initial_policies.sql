-- Migration: Enable RLS and create initial policies
-- Description: Set up initial RLS policies for all tables (will be restricted later)
-- Date: 2025-01-05
-- Note: These policies are permissive for development. See migration 20250105000000_restrict_rls_policies.sql for security updates

-- Companies policies
CREATE POLICY IF NOT EXISTS "Allow anon to select companies" ON public.companies
  FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "Allow anon to insert companies" ON public.companies
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow anon to update companies" ON public.companies
  FOR UPDATE TO anon USING (true);

CREATE POLICY IF NOT EXISTS "Allow anon to delete companies" ON public.companies
  FOR DELETE TO anon USING (true);

-- Contacts policies
CREATE POLICY IF NOT EXISTS "Allow anon to select contacts" ON public.contacts
  FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "Allow anon to insert contacts" ON public.contacts
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow anon to update contacts" ON public.contacts
  FOR UPDATE TO anon USING (true);

CREATE POLICY IF NOT EXISTS "Allow anon to delete contacts" ON public.contacts
  FOR DELETE TO anon USING (true);

-- Classifications policies
CREATE POLICY IF NOT EXISTS "Allow anon to select classifications" ON public.classifications
  FOR SELECT TO anon USING (true);

CREATE POLICY IF NOT EXISTS "Allow anon to insert classifications" ON public.classifications
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow anon to update classifications" ON public.classifications
  FOR UPDATE TO anon USING (true);

CREATE POLICY IF NOT EXISTS "Allow anon to delete classifications" ON public.classifications
  FOR DELETE TO anon USING (true);

