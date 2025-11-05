import { supabase, supabaseAdmin } from '../config/supabase.js';

// Use admin client for write operations (bypasses RLS)
// Use regular client for read operations (respects RLS)
const db = supabaseAdmin || supabase;

/**
 * Classification model for interacting with classifications table
 */
class Classification {
  /**
   * Get all classifications with optional filters
   * @param {Object} filters - Optional filters { company_id, min_score, max_score, ai_model_used }
   * @param {number} limit - Maximum number of results
   * @param {number} offset - Offset for pagination
   * @returns {Promise<{data: Array, error: Object|null}>}
   */
  static async findAll(filters = {}, limit = 100, offset = 0) {
    let query = db.from('classifications').select('*');

    if (filters.company_id) {
      query = query.eq('company_id', filters.company_id);
    }

    if (filters.min_score !== undefined) {
      query = query.gte('relevance_score', filters.min_score);
    }

    if (filters.max_score !== undefined) {
      query = query.lte('relevance_score', filters.max_score);
    }

    if (filters.ai_model_used) {
      query = query.eq('ai_model_used', filters.ai_model_used);
    }

    query = query
      .order('relevance_score', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);

    return await query;
  }

  /**
   * Get classifications by company ID
   * @param {string} companyId - Company UUID
   * @returns {Promise<{data: Array, error: Object|null}>}
   */
  static async findByCompanyId(companyId) {
    const { data, error } = await db
      .from('classifications')
      .select('*')
      .eq('company_id', companyId)
      .order('relevance_score', { ascending: false });

    return { data, error };
  }

  /**
   * Get a classification by ID
   * @param {string} id - Classification UUID
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async findById(id) {
    const { data, error } = await db.from('classifications').select('*').eq('id', id).single();

    return { data, error };
  }

  /**
   * Get top classifications by relevance score
   * @param {number} limit - Number of top classifications to return
   * @param {number} minScore - Minimum relevance score
   * @returns {Promise<{data: Array, error: Object|null}>}
   */
  static async findTopByScore(limit = 10, minScore = 0) {
    const { data, error } = await db
      .from('classifications')
      .select('*')
      .gte('relevance_score', minScore)
      .order('relevance_score', { ascending: false })
      .limit(limit);

    return { data, error };
  }

  /**
   * Create a new classification
   * @param {Object} classificationData - Classification data
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async create(classificationData) {
    const { company_id, relevance_score, reason, ai_model_used } = classificationData;

    // Validate required fields
    if (!company_id) {
      return {
        data: null,
        error: { message: 'Company ID is required', code: 'VALIDATION_ERROR' },
      };
    }

    if (relevance_score === undefined || relevance_score === null) {
      return {
        data: null,
        error: { message: 'Relevance score is required', code: 'VALIDATION_ERROR' },
      };
    }

    // Validate score range
    if (relevance_score < 0 || relevance_score > 100) {
      return {
        data: null,
        error: {
          message: 'Relevance score must be between 0 and 100',
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
      .from('classifications')
      .insert([
        {
          company_id,
          relevance_score,
          reason,
          ai_model_used,
        },
      ])
      .select()
      .single();

    return { data, error };
  }

  /**
   * Update a classification by ID
   * @param {string} id - Classification UUID
   * @param {Object} updates - Fields to update
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async update(id, updates) {
    // Validate score range if provided
    if (updates.relevance_score !== undefined) {
      if (updates.relevance_score < 0 || updates.relevance_score > 100) {
        return {
          data: null,
          error: {
            message: 'Relevance score must be between 0 and 100',
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
      .from('classifications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  /**
   * Delete a classification by ID
   * @param {string} id - Classification UUID
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  static async delete(id) {
    const { data, error } = await db
      .from('classifications')
      .delete()
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  /**
   * Count classifications with optional filters
   * @param {Object} filters - Optional filters
   * @returns {Promise<{count: number, error: Object|null}>}
   */
  static async count(filters = {}) {
    let query = db.from('classifications').select('*', { count: 'exact', head: true });

    if (filters.company_id) {
      query = query.eq('company_id', filters.company_id);
    }

    if (filters.min_score !== undefined) {
      query = query.gte('relevance_score', filters.min_score);
    }

    if (filters.max_score !== undefined) {
      query = query.lte('relevance_score', filters.max_score);
    }

    if (filters.ai_model_used) {
      query = query.eq('ai_model_used', filters.ai_model_used);
    }

    const { count, error } = await query;

    return { count: count || 0, error };
  }

  /**
   * Get average relevance score for a company
   * @param {string} companyId - Company UUID
   * @returns {Promise<{average: number|null, error: Object|null}>}
   */
  static async getAverageScore(companyId) {
    const { data, error } = await db
      .from('classifications')
      .select('relevance_score')
      .eq('company_id', companyId);

    if (error) {
      return { average: null, error };
    }

    if (!data || data.length === 0) {
      return { average: null, error: null };
    }

    const sum = data.reduce((acc, item) => acc + Number(item.relevance_score), 0);
    const average = sum / data.length;

    return { average: Number(average.toFixed(2)), error: null };
  }
}

export default Classification;
