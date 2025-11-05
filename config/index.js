import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Application Configuration
 * Centralized configuration for the prospect AI system
 */
const config = {
  // Application settings
  app: {
    name: process.env.APP_NAME || 'Sistema IA de Prospecção de Indústrias',
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },

  // Database - Supabase
  database: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
  },

  // Search APIs
  search: {
    serpapi: {
      apiKey: process.env.SERPAPI_KEY,
      enabled: !!process.env.SERPAPI_KEY,
    },
    serper: {
      apiKey: process.env.SERPER_API_KEY,
      enabled: !!process.env.SERPER_API_KEY,
    },
  },

  // AI APIs
  ai: {
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY,
      enabled: !!process.env.ANTHROPIC_API_KEY,
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      enabled: !!process.env.OPENAI_API_KEY,
    },
  },

  // Data Enrichment APIs
  enrichment: {
    hunter: {
      apiKey: process.env.HUNTER_API_KEY,
      enabled: !!process.env.HUNTER_API_KEY,
    },
    clearbit: {
      apiKey: process.env.CLEARBIT_API_KEY,
      enabled: !!process.env.CLEARBIT_API_KEY,
    },
  },

  // Business rules
  business: {
    excludedSegments: [
      'portas automáticas',
      'portões automáticos',
      'portas e portões',
    ],
    targetSegments: [
      'automação industrial',
      'metalurgia',
      'estruturas metálicas',
      'máquinas industriais',
      'componentes industriais',
      'equipamentos industriais',
    ],
    minCompanySize: 'medium', // small, medium, large
    monthlyLeadGoal: 50,
    targetConversionRate: 0.1, // 10%
  },

  // LGPD Compliance
  lgpd: {
    dataRetentionDays: 365,
    anonymizeAfterDays: 730,
    consentRequired: true,
  },
};

/**
 * Validate required configuration
 */
export function validateConfig() {
  const required = [];

  if (!config.database.supabaseUrl) {
    required.push('SUPABASE_URL');
  }
  if (!config.database.supabaseAnonKey) {
    required.push('SUPABASE_ANON_KEY');
  }
  if (!config.search.serpapi.enabled && !config.search.serper.enabled) {
    required.push('SERPAPI_KEY or SERPER_API_KEY');
  }
  if (!config.ai.anthropic.enabled && !config.ai.openai.enabled) {
    required.push('ANTHROPIC_API_KEY or OPENAI_API_KEY');
  }

  if (required.length > 0) {
    throw new Error(
      `Missing required environment variables: ${required.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }

  return true;
}

export default config;
