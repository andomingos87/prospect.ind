import { supabase, supabaseAdmin } from '../config/supabase.js';

// Use admin client for write operations (bypasses RLS)
// Use regular client for read operations (respects RLS)
const db = supabaseAdmin || supabase;

/**
 * Contact model for interacting with contacts table
 */
class Contact {
  /**
   * Get all contacts with optional filters
   * @param {Object} filters - Optional filters { company_id, type, email }
   * @param {number} limit - Maximum number of results
   * @param {number} offset - Offset for pagination
   * @returns {Promise<{data: Array, error: Object|null}>}
   */
  static async findAll(filters = {}, limit = 100, offset = 0) {
    let query = db.from('contacts').select('*');

    if (filters.company_id) {
      query = query.eq('company_id', filters.company_id);
    }

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    if (filters.email) {
      query = query.eq('email', filters.email);
    }

    query = query
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    return await query;
  }

  /**
   * Get contacts by company ID with company details
   * @param {string} companyId - Company UUID
   * @returns {Promise<{data: Array, error: Object|null}>}
   */
  static async findByCompanyId(companyId) {
    const { data, error } = await db
      .from('contacts')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    return { data, error };
  }

  /**
   * Get a contact by ID
   * @param {string} id - Contact UUID
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async findById(id) {
    const { data, error } = await db.from('contacts').select('*').eq('id', id).single();

    return { data, error };
  }

  /**
   * Create a new contact
   * @param {Object} contactData - Contact data
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async create(contactData) {
    const { company_id, email, phone, linkedin, type } = contactData;

    // Validate required fields
    if (!company_id) {
      return {
        data: null,
        error: { message: 'Company ID is required', code: 'VALIDATION_ERROR' },
      };
    }

    // Validate type enum
    const validTypes = ['decision_maker', 'influencer', 'technical', 'procurement', 'other'];
    if (type && !validTypes.includes(type)) {
      return {
        data: null,
        error: {
          message: `Invalid type. Must be one of: ${validTypes.join(', ')}`,
          code: 'VALIDATION_ERROR',
        },
      };
    }

    // Verify company exists
    const { data: company, error: companyError } = await db
      .from('companies')
      .select('id')
      .eq('id', company_id)
      .single();

    if (companyError || !company) {
      return {
        data: null,
        error: {
          message: 'Company not found. Foreign key constraint violation.',
          code: 'FOREIGN_KEY_ERROR',
        },
      };
    }

    const { data, error } = await db
      .from('contacts')
      .insert([
        {
          company_id,
          email,
          phone,
          linkedin,
          type,
        },
      ])
      .select()
      .single();

    return { data, error };
  }

  /**
   * Update a contact by ID
   * @param {string} id - Contact UUID
   * @param {Object} updates - Fields to update
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async update(id, updates) {
    // Validate type enum if provided
    if (updates.type) {
      const validTypes = ['decision_maker', 'influencer', 'technical', 'procurement', 'other'];
      if (!validTypes.includes(updates.type)) {
        return {
          data: null,
          error: {
            message: `Invalid type. Must be one of: ${validTypes.join(', ')}`,
            code: 'VALIDATION_ERROR',
          },
        };
      }
    }

    // Validate company_id if provided
    if (updates.company_id) {
      const { data: company, error: companyError } = await db
        .from('companies')
        .select('id')
        .eq('id', updates.company_id)
        .single();

      if (companyError || !company) {
        return {
          data: null,
          error: {
            message: 'Company not found. Foreign key constraint violation.',
            code: 'FOREIGN_KEY_ERROR',
          },
        };
      }
    }

    const { data, error } = await db
      .from('contacts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  /**
   * Delete a contact by ID
   * @param {string} id - Contact UUID
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async delete(id) {
    const { data, error } = await db.from('contacts').delete().eq('id', id).select().single();

    return { data, error };
  }

  /**
   * Count contacts with optional filters
   * @param {Object} filters - Optional filters
   * @returns {Promise<{count: number, error: Object|null}>}
   */
  static async count(filters = {}) {
    let query = db.from('contacts').select('*', { count: 'exact', head: true });

    if (filters.company_id) {
      query = query.eq('company_id', filters.company_id);
    }

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    if (filters.email) {
      query = query.eq('email', filters.email);
    }

    const { count, error } = await query;

    return { count: count || 0, error };
  }
}

export default Contact;
