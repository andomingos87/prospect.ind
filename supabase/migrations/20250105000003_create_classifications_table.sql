-- Migration: Create classifications table
-- Description: Initial schema for classifications table with foreign key to companies and score constraint
-- Date: 2025-01-05

-- Create classifications table
CREATE TABLE IF NOT EXISTS public.classifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  relevance_score NUMERIC NOT NULL CHECK (relevance_score >= 0 AND relevance_score <= 100),
  reason TEXT,
  ai_model_used TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_classifications_company_id ON public.classifications(company_id);
CREATE INDEX IF NOT EXISTS idx_classifications_relevance_score ON public.classifications(relevance_score DESC);
CREATE INDEX IF NOT EXISTS idx_classifications_created_at ON public.classifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_classifications_ai_model ON public.classifications(ai_model_used) WHERE ai_model_used IS NOT NULL;

-- Enable RLS
ALTER TABLE public.classifications ENABLE ROW LEVEL SECURITY;

