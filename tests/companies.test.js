import Company from '../src/models/Company.js';

describe('Companies Model', () => {
  let testCompanyIds = []; // Track all created IDs

  const testCompanyData = {
    name: 'Test Industrial Company',
    website: 'https://testcompany.com',
    location: 'São Paulo, SP',
    size: 'medium',
    segment: 'Manufacturing',
    revenue_estimate: 5000000.5,
  };

  afterEach(async () => {
    // Clean up all test data
    for (const id of testCompanyIds) {
      try {
        await Company.delete(id);
      } catch (error) {
        // Ignore errors for already deleted items
      }
    }
    testCompanyIds = [];
  });

  describe('create', () => {
    it('should create a new company with valid data', async () => {
      const { data, error } = await Company.create(testCompanyData);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBeDefined();
      expect(data.name).toBe(testCompanyData.name);
      expect(data.website).toBe(testCompanyData.website);
      expect(data.location).toBe(testCompanyData.location);
      expect(data.size).toBe(testCompanyData.size);
      expect(data.segment).toBe(testCompanyData.segment);
      expect(Number(data.revenue_estimate)).toBe(testCompanyData.revenue_estimate);
      expect(data.created_at).toBeDefined();

      testCompanyIds.push(data.id);
    }, 10000);

    it('should require company name', async () => {
      const { data, error } = await Company.create({
        website: 'https://test.com',
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.message).toContain('name is required');
    });

    it('should validate size enum', async () => {
      const { data, error } = await Company.create({
        name: 'Test Company',
        size: 'invalid_size',
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.message).toContain('Invalid size');
    });

    it('should accept all valid size values', async () => {
      const validSizes = ['micro', 'small', 'medium', 'large', 'enterprise'];

      for (const size of validSizes) {
        const { data, error } = await Company.create({
          name: `Test Company ${size}`,
          size,
        });

        expect(error).toBeNull();
        expect(data).toBeDefined();
        expect(data.size).toBe(size);

        if (testCompanyIds.length > 0) {
          await Company.delete(testCompanyIds[testCompanyIds.length - 1]);
          testCompanyIds.pop();
        }
        testCompanyIds.push(data.id);
      }
    }, 30000);
  });

  describe('findById', () => {
    it('should find a company by ID', async () => {
      const { data: created } = await Company.create(testCompanyData);
      testCompanyIds.push(created.id);

      const { data, error } = await Company.findById(created.id);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBe(created.id);
      expect(data.name).toBe(testCompanyData.name);
    }, 10000);

    it('should return null for non-existent company', async () => {
      const { data, error } = await Company.findById('00000000-0000-0000-0000-000000000000');

      expect(error).toBeDefined();
      expect(data).toBeNull();
    });
  });

  describe('findAll', () => {
    beforeEach(async () => {
      // Create test companies
      const companies = [
        { name: 'Company A', location: 'São Paulo', size: 'large', segment: 'Tech' },
        { name: 'Company B', location: 'Rio de Janeiro', size: 'medium', segment: 'Manufacturing' },
        { name: 'Company C', location: 'São Paulo', size: 'small', segment: 'Tech' },
      ];

      for (const company of companies) {
        const { data } = await Company.create(company);
        testCompanyIds.push(data.id); // Track all IDs for cleanup
      }
    }, 30000);

    it('should retrieve all companies', async () => {
      const { data, error } = await Company.findAll();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThanOrEqual(3);
    }, 10000);

    it('should filter by location', async () => {
      const { data, error } = await Company.findAll({ location: 'São Paulo' });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(2);
      data.forEach(company => {
        expect(company.location).toBe('São Paulo');
      });
    }, 10000);

    it('should filter by size', async () => {
      const { data, error } = await Company.findAll({ size: 'medium' });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(1);
      data.forEach(company => {
        expect(company.size).toBe('medium');
      });
    }, 10000);

    it('should filter by segment', async () => {
      const { data, error } = await Company.findAll({ segment: 'Tech' });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(2);
      data.forEach(company => {
        expect(company.segment).toBe('Tech');
      });
    }, 10000);

    it('should combine multiple filters', async () => {
      const { data, error } = await Company.findAll({
        location: 'São Paulo',
        segment: 'Tech',
      });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      data.forEach(company => {
        expect(company.location).toBe('São Paulo');
        expect(company.segment).toBe('Tech');
      });
    }, 10000);
  });

  describe('update', () => {
    it('should update a company', async () => {
      const { data: created } = await Company.create(testCompanyData);
      testCompanyIds.push(created.id);

      const updates = {
        name: 'Updated Company Name',
        location: 'Rio de Janeiro, RJ',
      };

      const { data, error } = await Company.update(created.id, updates);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.name).toBe(updates.name);
      expect(data.location).toBe(updates.location);
    }, 10000);

    it('should validate size enum on update', async () => {
      const { data: created } = await Company.create(testCompanyData);
      testCompanyIds.push(created.id);

      const { data, error } = await Company.update(created.id, {
        size: 'invalid_size',
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('delete', () => {
    it('should delete a company', async () => {
      const { data: created } = await Company.create(testCompanyData);
      testCompanyIds.push(created.id);

      const { data, error } = await Company.delete(created.id);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBe(created.id);

      // Verify deletion
      const { data: found } = await Company.findById(created.id);
      expect(found).toBeNull();

      testCompanyIds = testCompanyIds.filter(id => id !== created.id); // Remove from tracking
    }, 10000);
  });

  describe('count', () => {
    it('should count all companies', async () => {
      const { count, error } = await Company.count();

      expect(error).toBeNull();
      expect(count).toBeGreaterThanOrEqual(0);
    }, 10000);

    it('should count companies with filters', async () => {
      await Company.create({ name: 'Filter Test', location: 'Brasília', size: 'small' });

      const { count, error } = await Company.count({ location: 'Brasília' });

      expect(error).toBeNull();
      expect(count).toBeGreaterThanOrEqual(1);
    }, 10000);
  });
});
