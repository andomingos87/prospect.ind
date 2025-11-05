-- Migration: Create contacts table
-- Description: Initial schema for contacts table with foreign key to companies
-- Date: 2025-01-05

-- Create enum type for contact type
CREATE TYPE contact_type AS ENUM ('decision_maker', 'influencer', 'technical', 'procurement', 'other');

-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  linkedin TEXT,
  type contact_type,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_company_id ON public.contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_contacts_type ON public.contacts(type);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

