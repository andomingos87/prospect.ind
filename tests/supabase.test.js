import { supabase, testSupabaseConnection } from '../src/config/supabase.js';

describe('Supabase Configuration', () => {
  it('should have Supabase URL configured', () => {
    expect(process.env.SUPABASE_URL).toBeDefined();
    expect(process.env.SUPABASE_URL).toContain('supabase.co');
  });

  it('should have Supabase anon key configured', () => {
    expect(process.env.SUPABASE_ANON_KEY).toBeDefined();
    expect(process.env.SUPABASE_ANON_KEY.length).toBeGreaterThan(0);
  });

  it('should create Supabase client successfully', () => {
    expect(supabase).toBeDefined();
    expect(supabase.supabaseUrl).toBe(process.env.SUPABASE_URL);
  });

  it('should connect to Supabase', async () => {
    const result = await testSupabaseConnection();
    expect(result.success).toBe(true);
    expect(result.url).toBe(process.env.SUPABASE_URL);
  }, 10000); // 10 second timeout for network request
});
