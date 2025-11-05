import { testSupabaseConnection } from '../config/supabase.js';

/**
 * Test Supabase connection and log results
 */
async function testConnection() {
  // eslint-disable-next-line no-console
  console.log('Testing Supabase connection...\n');

  try {
    const result = await testSupabaseConnection();
    // eslint-disable-next-line no-console
    console.log('✅', result.message);
    // eslint-disable-next-line no-console
    console.log('📍 Supabase URL:', result.url);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Connection failed:', error.message);
    // eslint-disable-next-line no-console
    console.error('Stack:', error.stack);
    return false;
  }
}

// Run test if executed directly
if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith('testSupabaseConnection.js')
) {
  testConnection()
    .then(success => {
      if (!success) {
        throw new Error('Connection test failed');
      }
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error('Unexpected error:', error);
      throw error;
    });
}

export default testConnection;
