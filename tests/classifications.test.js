import Classification from '../src/models/Classification.js';
import Company from '../src/models/Company.js';

describe('Classifications Model', () => {
  let testCompanyId;
  let testClassificationId;

  const testCompanyData = {
    name: 'Test Company for Classifications',
    website: 'https://testcompany.com',
    location: 'São Paulo, SP',
    size: 'large',
    segment: 'Technology',
  };

  const testClassificationData = {
    relevance_score: 85.5,
    reason: 'High growth potential in technology sector',
    ai_model_used: 'gpt-4',
  };

  beforeAll(async () => {
    // Create a test company for classifications
    const { data: company } = await Company.create(testCompanyData);
    testCompanyId = company.id;
  });

  afterEach(async () => {
    // Clean up test classifications
    if (testClassificationId) {
      await Classification.delete(testClassificationId);
      testClassificationId = null;
    }
  });

  afterAll(async () => {
    // Clean up test company
    if (testCompanyId) {
      await Company.delete(testCompanyId);
      testCompanyId = null;
    }
  });

  describe('create', () => {
    it('should create a new classification with valid data', async () => {
      const { data, error } = await Classification.create({
        ...testClassificationData,
        company_id: testCompanyId,
      });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBeDefined();
      expect(data.company_id).toBe(testCompanyId);
      expect(Number(data.relevance_score)).toBe(testClassificationData.relevance_score);
      expect(data.reason).toBe(testClassificationData.reason);
      expect(data.ai_model_used).toBe(testClassificationData.ai_model_used);
      expect(data.created_at).toBeDefined();

      testClassificationId = data.id;
    }, 10000);

    it('should require company_id', async () => {
      const { data, error } = await Classification.create({
        relevance_score: 75.0,
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.message).toContain('Company ID is required');
    });

    it('should require relevance_score', async () => {
      const { data, error } = await Classification.create({
        company_id: testCompanyId,
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.message).toContain('Relevance score is required');
    });

    it('should validate score range (0-100)', async () => {
      const invalidScores = [-1, 101, 150, -10];

      for (const score of invalidScores) {
        const { data, error } = await Classification.create({
          company_id: testCompanyId,
          relevance_score: score,
        });

        expect(data).toBeNull();
        expect(error).toBeDefined();
        expect(error.code).toBe('VALIDATION_ERROR');
        expect(error.message).toContain('between 0 and 100');
      }
    }, 15000);

    it('should accept valid scores (0-100)', async () => {
      const validScores = [0, 50, 75.5, 100];

      for (const score of validScores) {
        const { data, error } = await Classification.create({
          company_id: testCompanyId,
          relevance_score: score,
          ai_model_used: `test-model-${score}`,
        });

        expect(error).toBeNull();
        expect(data).toBeDefined();
        expect(Number(data.relevance_score)).toBe(score);

        if (testClassificationId) {
          await Classification.delete(testClassificationId);
        }
        testClassificationId = data.id;
      }
    }, 20000);

    it('should fail with non-existent company_id', async () => {
      const { data, error } = await Classification.create({
        company_id: '00000000-0000-0000-0000-000000000000',
        relevance_score: 75.0,
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('FOREIGN_KEY_ERROR');
    }, 10000);
  });

  describe('findById', () => {
    it('should find a classification by ID', async () => {
      const { data: created } = await Classification.create({
        ...testClassificationData,
        company_id: testCompanyId,
      });
      testClassificationId = created.id;

      const { data, error } = await Classification.findById(testClassificationId);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBe(testClassificationId);
      expect(data.company_id).toBe(testCompanyId);
    }, 10000);

    it('should return null for non-existent classification', async () => {
      const { data, error } = await Classification.findById('00000000-0000-0000-0000-000000000000');

      expect(error).toBeDefined();
      expect(data).toBeNull();
    });
  });

  describe('findByCompanyId', () => {
    it('should find all classifications for a company', async () => {
      // Create multiple classifications for the same company
      const classifications = [
        { relevance_score: 90, ai_model_used: 'model-1' },
        { relevance_score: 75, ai_model_used: 'model-2' },
        { relevance_score: 60, ai_model_used: 'model-3' },
      ];

      const createdClassifications = [];
      for (const classification of classifications) {
        const { data } = await Classification.create({
          ...classification,
          company_id: testCompanyId,
        });
        createdClassifications.push(data.id);
      }

      const { data, error } = await Classification.findByCompanyId(testCompanyId);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(3);
      // Should be ordered by score descending
      expect(Number(data[0].relevance_score)).toBeGreaterThanOrEqual(
        Number(data[1].relevance_score)
      );
      data.forEach(classification => {
        expect(classification.company_id).toBe(testCompanyId);
      });

      // Cleanup
      for (const id of createdClassifications) {
        await Classification.delete(id);
      }
    }, 20000);
  });

  describe('findTopByScore', () => {
    beforeEach(async () => {
      // Create test classifications with different scores
      const scores = [95, 85, 70, 60, 50];
      for (const score of scores) {
        await Classification.create({
          company_id: testCompanyId,
          relevance_score: score,
          ai_model_used: 'top-score-test',
        });
      }
    }, 20000);

    it('should find top classifications by score', async () => {
      const { data, error } = await Classification.findTopByScore(3);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBe(3);
      // Should be ordered by score descending
      expect(Number(data[0].relevance_score)).toBeGreaterThanOrEqual(
        Number(data[1].relevance_score)
      );
      expect(Number(data[1].relevance_score)).toBeGreaterThanOrEqual(
        Number(data[2].relevance_score)
      );
    }, 10000);

    it('should filter by minimum score', async () => {
      const { data, error } = await Classification.findTopByScore(10, 70);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      data.forEach(classification => {
        expect(Number(classification.relevance_score)).toBeGreaterThanOrEqual(70);
      });
    }, 10000);
  });

  describe('findAll', () => {
    beforeEach(async () => {
      // Create test classifications
      const classifications = [
        { relevance_score: 90, ai_model_used: 'gpt-4' },
        { relevance_score: 75, ai_model_used: 'gpt-3.5' },
        { relevance_score: 60, ai_model_used: 'gpt-4' },
      ];

      for (const classification of classifications) {
        const { data } = await Classification.create({
          ...classification,
          company_id: testCompanyId,
        });
        if (!testClassificationId) {
          testClassificationId = data.id; // Track first for cleanup
        }
      }
    }, 20000);

    it('should retrieve all classifications', async () => {
      const { data, error } = await Classification.findAll();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThanOrEqual(3);
    }, 10000);

    it('should filter by company_id', async () => {
      const { data, error } = await Classification.findAll({ company_id: testCompanyId });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(3);
      data.forEach(classification => {
        expect(classification.company_id).toBe(testCompanyId);
      });
    }, 10000);

    it('should filter by min_score', async () => {
      const { data, error } = await Classification.findAll({ min_score: 70 });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      data.forEach(classification => {
        expect(Number(classification.relevance_score)).toBeGreaterThanOrEqual(70);
      });
    }, 10000);

    it('should filter by max_score', async () => {
      const { data, error } = await Classification.findAll({ max_score: 80 });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      data.forEach(classification => {
        expect(Number(classification.relevance_score)).toBeLessThanOrEqual(80);
      });
    }, 10000);

    it('should filter by score range', async () => {
      const { data, error } = await Classification.findAll({ min_score: 70, max_score: 85 });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      data.forEach(classification => {
        const score = Number(classification.relevance_score);
        expect(score).toBeGreaterThanOrEqual(70);
        expect(score).toBeLessThanOrEqual(85);
      });
    }, 10000);

    it('should filter by ai_model_used', async () => {
      const { data, error } = await Classification.findAll({ ai_model_used: 'gpt-4' });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(2);
      data.forEach(classification => {
        expect(classification.ai_model_used).toBe('gpt-4');
      });
    }, 10000);
  });

  describe('update', () => {
    it('should update a classification', async () => {
      const { data: created } = await Classification.create({
        ...testClassificationData,
        company_id: testCompanyId,
      });
      testClassificationId = created.id;

      const updates = {
        relevance_score: 92.5,
        reason: 'Updated reason',
        ai_model_used: 'gpt-4-turbo',
      };

      const { data, error } = await Classification.update(testClassificationId, updates);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Number(data.relevance_score)).toBe(updates.relevance_score);
      expect(data.reason).toBe(updates.reason);
      expect(data.ai_model_used).toBe(updates.ai_model_used);
    }, 10000);

    it('should validate score range on update', async () => {
      const { data: created } = await Classification.create({
        ...testClassificationData,
        company_id: testCompanyId,
      });
      testClassificationId = created.id;

      const { data, error } = await Classification.update(testClassificationId, {
        relevance_score: 150,
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('delete', () => {
    it('should delete a classification', async () => {
      const { data: created } = await Classification.create({
        ...testClassificationData,
        company_id: testCompanyId,
      });
      testClassificationId = created.id;

      const { data, error } = await Classification.delete(testClassificationId);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBe(testClassificationId);

      // Verify deletion
      const { data: found } = await Classification.findById(testClassificationId);
      expect(found).toBeNull();

      testClassificationId = null; // Prevent double deletion
    }, 10000);
  });

  describe('CASCADE delete', () => {
    it('should cascade delete classifications when company is deleted', async () => {
      // Create a new company for this test
      const { data: company } = await Company.create({
        name: 'Cascade Test Company Classifications',
        location: 'Test Location',
      });

      // Create classifications for this company
      const { data: classification1 } = await Classification.create({
        company_id: company.id,
        relevance_score: 80,
      });
      const { data: classification2 } = await Classification.create({
        company_id: company.id,
        relevance_score: 75,
      });

      // Delete the company
      await Company.delete(company.id);

      // Verify classifications are deleted
      const { data: found1 } = await Classification.findById(classification1.id);
      const { data: found2 } = await Classification.findById(classification2.id);

      expect(found1).toBeNull();
      expect(found2).toBeNull();
    }, 10000);
  });

  describe('getAverageScore', () => {
    it('should calculate average score for a company', async () => {
      // Create a new company for this test to avoid interference
      const { data: company } = await Company.create({
        name: 'Average Score Test Company',
        location: 'Test Location',
      });

      // Create multiple classifications
      const scores = [90, 80, 70];
      const createdIds = [];
      for (const score of scores) {
        const { data } = await Classification.create({
          company_id: company.id,
          relevance_score: score,
        });
        createdIds.push(data.id);
      }

      const { average, error } = await Classification.getAverageScore(company.id);

      expect(error).toBeNull();
      expect(average).toBe(80); // (90 + 80 + 70) / 3 = 80

      // Cleanup
      for (const id of createdIds) {
        await Classification.delete(id);
      }
      await Company.delete(company.id);
    }, 20000);

    it('should return null for company with no classifications', async () => {
      // Create a new company without classifications
      const { data: company } = await Company.create({
        name: 'Empty Company',
        location: 'Test',
      });

      const { average, error } = await Classification.getAverageScore(company.id);

      expect(error).toBeNull();
      expect(average).toBeNull();

      // Cleanup
      await Company.delete(company.id);
    }, 10000);
  });

  describe('count', () => {
    it('should count all classifications', async () => {
      const { count, error } = await Classification.count();

      expect(error).toBeNull();
      expect(count).toBeGreaterThanOrEqual(0);
    }, 10000);

    it('should count classifications with filters', async () => {
      const { count, error } = await Classification.count({
        company_id: testCompanyId,
        min_score: 70,
      });

      expect(error).toBeNull();
      expect(count).toBeGreaterThanOrEqual(0);
    }, 10000);
  });
});
