import { supabase, testSupabaseConnection } from '../src/config/supabase.js';

// Only run integration tests if INTEGRATION_TESTS flag is set
const RUN_INTEGRATION_TESTS = process.env.INTEGRATION_TESTS === 'true';

describe('Supabase Configuration', () => {
  it('should have Supabase URL configured', () => {
    expect(process.env.SUPABASE_URL).toBeDefined();
    // Removed requirement for 'supabase.co' to work in any environment
    expect(process.env.SUPABASE_URL.length).toBeGreaterThan(0);
  });

  it('should have Supabase anon key configured', () => {
    expect(process.env.SUPABASE_ANON_KEY).toBeDefined();
    expect(process.env.SUPABASE_ANON_KEY.length).toBeGreaterThan(0);
  });

  it('should create Supabase client successfully', () => {
    expect(supabase).toBeDefined();
    expect(supabase.supabaseUrl).toBe(process.env.SUPABASE_URL);
  });

  // Integration test - only runs if INTEGRATION_TESTS=true
  (RUN_INTEGRATION_TESTS ? it : it.skip)(
    'should connect to Supabase',
    async () => {
      const result = await testSupabaseConnection();
      expect(result.success).toBe(true);
      expect(result.url).toBe(process.env.SUPABASE_URL);
    },
    10000
  ); // 10 second timeout for network request
});
