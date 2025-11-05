-- Migration: Restrict RLS policies for role anon
-- Description: Remove INSERT/UPDATE/DELETE permissions from anon role for security
-- This migration ensures that only the backend using service_role key can modify data
-- Date: 2025-01-05

-- Drop existing INSERT policies for anon role
DROP POLICY IF EXISTS "Allow anon to insert companies" ON public.companies;
DROP POLICY IF EXISTS "Allow anon to insert contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow anon to insert classifications" ON public.classifications;

-- Drop existing UPDATE policies for anon role
DROP POLICY IF EXISTS "Allow anon to update companies" ON public.companies;
DROP POLICY IF EXISTS "Allow anon to update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow anon to update classifications" ON public.classifications;

-- Drop existing DELETE policies for anon role
DROP POLICY IF EXISTS "Allow anon to delete companies" ON public.companies;
DROP POLICY IF EXISTS "Allow anon to delete contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow anon to delete classifications" ON public.classifications;

-- Note: SELECT policies for anon role are kept if they exist (for public read access)
-- If you need to restrict SELECT as well, uncomment and adjust the following:

-- DROP POLICY IF EXISTS "Allow anon to select companies" ON public.companies;
-- DROP POLICY IF EXISTS "Allow anon to select contacts" ON public.contacts;
-- DROP POLICY IF EXISTS "Allow anon to select classifications" ON public.classifications;

-- After this migration:
-- - Backend must use SUPABASE_SERVICE_KEY (service_role) for all write operations
-- - Anon role can only read (SELECT) if policies exist, otherwise is blocked
-- - This ensures compliance with LGPD and prevents unauthorized data modifications

