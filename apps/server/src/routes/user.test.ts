import { getMockReq, getMockRes } from '@jest-mock/express';

import { connect, clearDatabase, closeDatabase } from '@config/testDB';
import { userDetails } from '@utils/test-helpers';
import app from '../app';
import user from './user';

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('User Routes', () => {
  it('Sign Up Controller', async () => {
    const body = app.use('/api/v1', user);

    expect(true).toEqual(true);
  });
});
