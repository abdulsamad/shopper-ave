import request from 'supertest';

import { connect, closeDatabase } from '@utils/test-db';
import { app } from '@utils/test-server';
import { userDetailsForAuth } from '@utils/test-helpers';

import user from './user';

// Express Init
app.use('/', user);

beforeAll(async () => await connect());

afterAll(async () => await closeDatabase());

describe('User Routes', () => {
  it('Sign Up', async () => {
    const response = await request(app).post('/signup').send(userDetailsForAuth);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        token: expect.any(String),
        user: expect.anything(),
      })
    );
  }),
    it('Login', async () => {
      const { email, password } = userDetailsForAuth;
      const response = await request(app).post('/login').send({ email, password });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          token: expect.any(String),
          user: expect.anything(),
        })
      );
    }),
    it('Logout', async () => {
      const response = await request(app).get('/logout');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          message: expect.any(String),
        })
      );
    });
});
