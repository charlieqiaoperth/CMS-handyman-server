const request = require('supertest');
const server = require('../../../src/index');
const { TOKEN, TEST_USER } = require('../../data');

describe('/api', () => {
  describe('GET /me', () => {
    const exec = () =>
      request(server)
        .get('/api/me')
        .set('Authorization', `Bearer ${TOKEN}`);

    it('should return 200 with user info', async () => {
      const res = await exec(TOKEN);

      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject({
        email: TEST_USER.email,
        name: TEST_USER.name,
        _id: TEST_USER._id
      });
    });
  });

  describe('POST /', () => {
    const exec = data =>
      request(server)
        .post('/api/users')
        .send(data);

    it('should return 400 if name is missing', async () => {
      const user = {
        email: 'abc@test.com',
        password: '123456'
      };
      const res = await exec(user);
      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid email', async () => {
      const user = {
        name: 'abcm',
        password: '123456',
        email: 'test@'
      };
      const res = await exec(user);
      expect(res.status).toBe(400);
    });

    it('should return 400 if password is less than 6 chars', async () => {
      const user = {
        name: 'abcm',
        password: '12345',
        email: 'test2@test.com'
      };
      const res = await exec(user);
      expect(res.status).toBe(400);
    });

    it('should return 201 if all fields are valid', async () => {
      const user = {
        name: 'abcm',
        password: '123456',
        email: 'test3@test.com'
      };
      const res = await exec(user);
      expect(res.status).toBe(201);
    });

    it('should return 400 if email already exist', async () => {
      const user = {
        name: 'abcm',
        password: '123456',
        email: TEST_USER.email
      };
      const res = await exec(user);
      expect(res.status).toBe(400);
    });
  });
});
