-- Migration: Create companies table
-- Description: Initial schema for companies table with enum and indexes
-- Date: 2025-01-05

-- Create enum type for company size
CREATE TYPE company_size AS ENUM ('micro', 'small', 'medium', 'large', 'enterprise');

-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website TEXT,
  location TEXT,
  size company_size,
  segment TEXT,
  revenue_estimate NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_companies_location ON public.companies(location);
CREATE INDEX IF NOT EXISTS idx_companies_size ON public.companies(size);
CREATE INDEX IF NOT EXISTS idx_companies_segment ON public.companies(segment);
CREATE INDEX IF NOT EXISTS idx_companies_created_at ON public.companies(created_at);

-- Enable RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

