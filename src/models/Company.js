import { supabase, supabaseAdmin } from '../config/supabase.js';

// Use admin client for write operations (bypasses RLS)
// Use regular client for read operations (respects RLS)
const db = supabaseAdmin || supabase;

/**
 * Company model for interacting with companies table
 */
class Company {
  /**
   * Get all companies with optional filters
   * @param {Object} filters - Optional filters { location, size, segment }
   * @param {number} limit - Maximum number of results
   * @param {number} offset - Offset for pagination
   * @returns {Promise<{data: Array, error: Object|null}>}
   */
  static async findAll(filters = {}, limit = 100, offset = 0) {
    let query = db.from('companies').select('*');

    if (filters.location) {
      query = query.eq('location', filters.location);
    }

    if (filters.size) {
      query = query.eq('size', filters.size);
    }

    if (filters.segment) {
      query = query.eq('segment', filters.segment);
    }

    query = query
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    return await query;
  }

  /**
   * Get a company by ID
   * @param {string} id - Company UUID
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async findById(id) {
    const { data, error } = await db.from('companies').select('*').eq('id', id).single();

    return { data, error };
  }

  /**
   * Create a new company
   * @param {Object} companyData - Company data
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async create(companyData) {
    const { name, website, location, size, segment, revenue_estimate } = companyData;

    // Validate required fields
    if (!name) {
      return {
        data: null,
        error: { message: 'Company name is required', code: 'VALIDATION_ERROR' },
      };
    }

    // Validate size enum
    const validSizes = ['micro', 'small', 'medium', 'large', 'enterprise'];
    if (size && !validSizes.includes(size)) {
      return {
        data: null,
        error: {
          message: `Invalid size. Must be one of: ${validSizes.join(', ')}`,
          code: 'VALIDATION_ERROR',
        },
      };
    }

    const { data, error } = await db
      .from('companies')
      .insert([
        {
          name,
          website,
          location,
          size,
          segment,
          revenue_estimate,
        },
      ])
      .select()
      .single();

    return { data, error };
  }

  /**
   * Update a company by ID
   * @param {string} id - Company UUID
   * @param {Object} updates - Fields to update
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async update(id, updates) {
    // Validate size enum if provided
    if (updates.size) {
      const validSizes = ['micro', 'small', 'medium', 'large', 'enterprise'];
      if (!validSizes.includes(updates.size)) {
        return {
          data: null,
          error: {
            message: `Invalid size. Must be one of: ${validSizes.join(', ')}`,
            code: 'VALIDATION_ERROR',
          },
        };
      }
    }

    const { data, error } = await db
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  /**
   * Delete a company by ID
   * @param {string} id - Company UUID
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async delete(id) {
    const { data, error } = await db.from('companies').delete().eq('id', id).select().single();

    return { data, error };
  }

  /**
   * Count companies with optional filters
   * @param {Object} filters - Optional filters
   * @returns {Promise<{count: number, error: Object|null}>}
   */
  static async count(filters = {}) {
    let query = db.from('companies').select('*', { count: 'exact', head: true });

    if (filters.location) {
      query = query.eq('location', filters.location);
    }

    if (filters.size) {
      query = query.eq('size', filters.size);
    }

    if (filters.segment) {
      query = query.eq('segment', filters.segment);
    }

    const { count, error } = await query;

    return { count: count || 0, error };
  }
}

export default Company;
