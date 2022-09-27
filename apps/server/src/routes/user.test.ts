import request from 'supertest';

import { connect, clearDatabase, closeDatabase } from '@utils/test-db';
import { app } from '@utils/test-server';
import { userDetailsForAuth } from '@utils/test-helpers';

import user from './user';

// Express Init
app.use('/', user);

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('User Routes', () => {
  it('Sign Up Route', async () => {
    const response = await request(app).post('/signup').send(userDetailsForAuth);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        token: expect.any(String),
        user: expect.anything(),
      })
    );
  });
});
