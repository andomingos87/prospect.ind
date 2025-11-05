import Contact from '../src/models/Contact.js';
import Company from '../src/models/Company.js';

describe('Contacts Model', () => {
  let testCompanyId;
  let testContactIds = []; // Track all created contact IDs

  const testCompanyData = {
    name: 'Test Company for Contacts',
    website: 'https://testcompany.com',
    location: 'São Paulo, SP',
    size: 'medium',
    segment: 'Technology',
  };

  const testContactData = {
    email: 'contact@testcompany.com',
    phone: '+55 11 99999-9999',
    linkedin: 'https://linkedin.com/in/testcontact',
    type: 'decision_maker',
  };

  beforeAll(async () => {
    // Create a test company for contacts
    const { data: company } = await Company.create(testCompanyData);
    testCompanyId = company.id;
  });

  afterEach(async () => {
    // Clean up all test contacts
    for (const id of testContactIds) {
      try {
        await Contact.delete(id);
      } catch (error) {
        // Ignore errors for already deleted items
      }
    }
    testContactIds = [];
  });

  afterAll(async () => {
    // Clean up test company
    if (testCompanyId) {
      await Company.delete(testCompanyId);
      testCompanyId = null;
    }
  });

  describe('create', () => {
    it('should create a new contact with valid data', async () => {
      const { data, error } = await Contact.create({
        ...testContactData,
        company_id: testCompanyId,
      });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBeDefined();
      expect(data.company_id).toBe(testCompanyId);
      expect(data.email).toBe(testContactData.email);
      expect(data.phone).toBe(testContactData.phone);
      expect(data.linkedin).toBe(testContactData.linkedin);
      expect(data.type).toBe(testContactData.type);
      expect(data.created_at).toBeDefined();

      testContactIds.push(data.id);
    }, 10000);

    it('should require company_id', async () => {
      const { data, error } = await Contact.create({
        email: 'test@example.com',
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.message).toContain('Company ID is required');
    });

    it('should validate type enum', async () => {
      const { data, error } = await Contact.create({
        company_id: testCompanyId,
        type: 'invalid_type',
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.message).toContain('Invalid type');
    });

    it('should accept all valid type values', async () => {
      const validTypes = ['decision_maker', 'influencer', 'technical', 'procurement', 'other'];

      for (const type of validTypes) {
        const { data, error } = await Contact.create({
          company_id: testCompanyId,
          email: `test_${type}@example.com`,
          type,
        });

        expect(error).toBeNull();
        expect(data).toBeDefined();
        expect(data.type).toBe(type);

        if (testContactIds.length > 0) {
          await Contact.delete(testContactIds[testContactIds.length - 1]);
          testContactIds.pop();
        }
        testContactIds.push(data.id);
      }
    }, 30000);

    it('should fail with non-existent company_id', async () => {
      const { data, error } = await Contact.create({
        company_id: '00000000-0000-0000-0000-000000000000',
        email: 'test@example.com',
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('FOREIGN_KEY_ERROR');
    }, 10000);
  });

  describe('findById', () => {
    it('should find a contact by ID', async () => {
      const { data: created } = await Contact.create({
        ...testContactData,
        company_id: testCompanyId,
      });
      testContactIds.push(created.id);

      const { data, error } = await Contact.findById(created.id);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBe(created.id);
      expect(data.company_id).toBe(testCompanyId);
    }, 10000);

    it('should return null for non-existent contact', async () => {
      const { data, error } = await Contact.findById('00000000-0000-0000-0000-000000000000');

      expect(error).toBeDefined();
      expect(data).toBeNull();
    });
  });

  describe('findByCompanyId', () => {
    it('should find all contacts for a company', async () => {
      // Create multiple contacts for the same company
      const contacts = [
        { email: 'contact1@test.com', type: 'decision_maker' },
        { email: 'contact2@test.com', type: 'influencer' },
        { email: 'contact3@test.com', type: 'technical' },
      ];

      const createdContacts = [];
      for (const contact of contacts) {
        const { data } = await Contact.create({
          ...contact,
          company_id: testCompanyId,
        });
        createdContacts.push(data.id);
      }

      const { data, error } = await Contact.findByCompanyId(testCompanyId);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(3);
      data.forEach(contact => {
        expect(contact.company_id).toBe(testCompanyId);
      });

      // Cleanup
      for (const id of createdContacts) {
        await Contact.delete(id);
      }
    }, 15000);
  });

  describe('findAll', () => {
    beforeEach(async () => {
      // Create test contacts
      const contacts = [
        { email: 'filter1@test.com', type: 'decision_maker' },
        { email: 'filter2@test.com', type: 'influencer' },
        { email: 'filter3@test.com', type: 'technical' },
      ];

      for (const contact of contacts) {
        const { data } = await Contact.create({
          ...contact,
          company_id: testCompanyId,
        });
        testContactIds.push(data.id); // Track all IDs for cleanup
      }
    }, 20000);

    it('should retrieve all contacts', async () => {
      const { data, error } = await Contact.findAll();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThanOrEqual(3);
    }, 10000);

    it('should filter by company_id', async () => {
      const { data, error } = await Contact.findAll({ company_id: testCompanyId });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(3);
      data.forEach(contact => {
        expect(contact.company_id).toBe(testCompanyId);
      });
    }, 10000);

    it('should filter by type', async () => {
      const { data, error } = await Contact.findAll({ type: 'decision_maker' });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(1);
      data.forEach(contact => {
        expect(contact.type).toBe('decision_maker');
      });
    }, 10000);

    it('should filter by email', async () => {
      const { data, error } = await Contact.findAll({ email: 'filter1@test.com' });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThanOrEqual(1);
      data.forEach(contact => {
        expect(contact.email).toBe('filter1@test.com');
      });
    }, 10000);
  });

  describe('update', () => {
    it('should update a contact', async () => {
      const { data: created } = await Contact.create({
        ...testContactData,
        company_id: testCompanyId,
      });
      testContactIds.push(created.id);

      const updates = {
        email: 'updated@testcompany.com',
        phone: '+55 11 88888-8888',
        type: 'influencer',
      };

      const { data, error } = await Contact.update(created.id, updates);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.email).toBe(updates.email);
      expect(data.phone).toBe(updates.phone);
      expect(data.type).toBe(updates.type);
    }, 10000);

    it('should validate type enum on update', async () => {
      const { data: created } = await Contact.create({
        ...testContactData,
        company_id: testCompanyId,
      });
      testContactIds.push(created.id);

      const { data, error } = await Contact.update(created.id, {
        type: 'invalid_type',
      });

      expect(data).toBeNull();
      expect(error).toBeDefined();
      expect(error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('delete', () => {
    it('should delete a contact', async () => {
      const { data: created } = await Contact.create({
        ...testContactData,
        company_id: testCompanyId,
      });
      testContactIds.push(created.id);

      const { data, error } = await Contact.delete(created.id);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBe(created.id);

      // Verify deletion
      const { data: found } = await Contact.findById(created.id);
      expect(found).toBeNull();

      testContactIds = testContactIds.filter(id => id !== created.id); // Remove from tracking
    }, 10000);
  });

  describe('CASCADE delete', () => {
    it('should cascade delete contacts when company is deleted', async () => {
      // Create a new company for this test
      const { data: company } = await Company.create({
        name: 'Cascade Test Company',
        location: 'Test Location',
      });

      // Create contacts for this company
      const { data: contact1 } = await Contact.create({
        company_id: company.id,
        email: 'cascade1@test.com',
      });
      const { data: contact2 } = await Contact.create({
        company_id: company.id,
        email: 'cascade2@test.com',
      });

      // Delete the company
      await Company.delete(company.id);

      // Verify contacts are deleted
      const { data: found1 } = await Contact.findById(contact1.id);
      const { data: found2 } = await Contact.findById(contact2.id);

      expect(found1).toBeNull();
      expect(found2).toBeNull();
    }, 10000);
  });

  describe('count', () => {
    it('should count all contacts', async () => {
      const { count, error } = await Contact.count();

      expect(error).toBeNull();
      expect(count).toBeGreaterThanOrEqual(0);
    }, 10000);

    it('should count contacts with filters', async () => {
      const { count, error } = await Contact.count({ company_id: testCompanyId });

      expect(error).toBeNull();
      expect(count).toBeGreaterThanOrEqual(0);
    }, 10000);
  });
});
