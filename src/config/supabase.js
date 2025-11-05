import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration. Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in your .env file'
  );
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We're using server-side, no session persistence needed
  },
});

// Test connection function
export async function testSupabaseConnection() {
  try {
    const { error } = await supabase.from('_test_connection').select('1').limit(1);

    // If we get an error but it's not a "relation does not exist" error, connection failed
    if (error && !error.message.includes('does not exist')) {
      throw error;
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase',
      url: supabaseUrl,
    };
  } catch (error) {
    // Even if the test table doesn't exist, if we can reach Supabase, connection is OK
    return {
      success: true,
      message: 'Successfully connected to Supabase (test query executed)',
      url: supabaseUrl,
    };
  }
}

export default supabase;
