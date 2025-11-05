/**
 * Mock factory for Supabase client
 * Used in tests to avoid real API calls
 */

export function createMockSupabaseClient() {
  const mockData = {
    companies: [],
    contacts: [],
    classifications: [],
  };

  const mockClient = {
    from: table => {
      return {
        select: (_columns = '*') => ({
          limit: _num => ({
            single: async () => {
              const data = mockData[table]?.[0] || null;
              return { data, error: data ? null : { message: 'Not found', code: 'PGRST116' } };
            },
            eq: (column, value) => ({
              single: async () => {
                const item = mockData[table]?.find(item => item[column] === value);
                return {
                  data: item || null,
                  error: item ? null : { message: 'Not found', code: 'PGRST116' },
                };
              },
              order: () => ({
                limit: async () => {
                  const filtered = mockData[table]?.filter(item => item[column] === value) || [];
                  return { data: filtered, error: null };
                },
              }),
            }),
            gte: () => ({ order: () => ({ limit: async () => ({ data: [], error: null }) }) }),
            lte: () => ({ order: () => ({ limit: async () => ({ data: [], error: null }) }) }),
            order: () => ({
              limit: async () => ({ data: mockData[table] || [], error: null }),
              range: async () => ({ data: mockData[table] || [], error: null }),
            }),
          }),
          eq: (column, value) => ({
            single: async () => {
              const item = mockData[table]?.find(item => item[column] === value);
              return {
                data: item || null,
                error: item ? null : { message: 'Not found', code: 'PGRST116' },
              };
            },
            order: () => ({
              limit: async () => {
                const filtered = mockData[table]?.filter(item => item[column] === value) || [];
                return { data: filtered, error: null };
              },
            }),
          }),
          head: true,
          count: 'exact',
        }),
        insert: rows => ({
          select: () => ({
            single: async () => {
              const newItem = {
                id: `mock-id-${Date.now()}`,
                ...rows[0],
                created_at: new Date().toISOString(),
              };
              if (!mockData[table]) mockData[table] = [];
              mockData[table].push(newItem);
              return { data: newItem, error: null };
            },
          }),
        }),
        update: updates => ({
          eq: (column, value) => ({
            select: () => ({
              single: async () => {
                const item = mockData[table]?.find(item => item[column] === value);
                if (item) {
                  Object.assign(item, updates);
                  return { data: item, error: null };
                }
                return { data: null, error: { message: 'Not found', code: 'PGRST116' } };
              },
            }),
          }),
        }),
        delete: () => ({
          eq: (column, value) => ({
            select: () => ({
              single: async () => {
                const index = mockData[table]?.findIndex(item => item[column] === value);
                if (index !== undefined && index >= 0) {
                  const deleted = mockData[table][index];
                  mockData[table].splice(index, 1);
                  return { data: deleted, error: null };
                }
                return { data: null, error: { message: 'Not found', code: 'PGRST116' } };
              },
            }),
          }),
        }),
      };
    },
    supabaseUrl: process.env.SUPABASE_URL || 'https://mock.supabase.co',
  };

  return mockClient;
}

export default createMockSupabaseClient;
