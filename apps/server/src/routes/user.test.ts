import request from 'supertest';
import express from 'express';

import { connect, clearDatabase, closeDatabase } from '@utils/test-db';
import { userDetails } from '@utils/test-helpers';
import user from './user';

// TODO: Improvise later
const app = express();

app.use(express.json());
app.use('/', user);

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('User Routes', () => {
  it('Sign Up Route', async () => {
    const response = await request(app).post('/signup').send(userDetails);

    expect(response.statusCode).toBe(201);
  });
});
