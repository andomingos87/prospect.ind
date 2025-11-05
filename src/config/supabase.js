import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration. Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in your .env file'
  );
}

// Create and export Supabase client for public/anonymous operations
// This client uses the anon key and respects RLS policies
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We're using server-side, no session persistence needed
  },
});

// Create and export Supabase admin client for backend operations
// This client uses the service role key and bypasses RLS
// WARNING: Only use this client in server-side code, never expose service key to frontend
let supabaseAdmin = null;

if (supabaseServiceKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
} else if (process.env.NODE_ENV === 'production') {
  // In production, service key is required for security
  throw new Error(
    'SUPABASE_SERVICE_KEY is required in production. The backend must use service role key for database operations.'
  );
}

export { supabaseAdmin };

// Test connection function
export async function testSupabaseConnection() {
  try {
    // Use a simple query that should always work if connection is valid
    const { error } = await supabase.from('companies').select('id').limit(1);

    // If we get an error, check if it's a connection/auth error or just empty table
    if (error) {
      // Connection/auth errors should be propagated
      if (error.code === 'PGRST116' || error.message.includes('JWT')) {
        throw error;
      }
      // Table not found or RLS blocking are still connection issues
      if (error.message.includes('permission denied') || error.message.includes('does not exist')) {
        throw error;
      }
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase',
      url: supabaseUrl,
    };
  } catch (error) {
    // Return failure with error details
    return {
      success: false,
      message: `Failed to connect to Supabase: ${error.message}`,
      url: supabaseUrl,
      error: error.message,
    };
  }
}

export default supabase;
