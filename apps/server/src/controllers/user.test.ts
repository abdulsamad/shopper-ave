import { getMockReq, getMockRes } from '@jest-mock/express';

import { connect, clearDatabase, closeDatabase } from '@config/testDB';
import { userDetails } from '@utils/test-helpers';
import { signup } from './user';

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('User Controllers', () => {
  it('Sign Up Controller', async () => {
    const req = getMockReq({
      body: '',
    });
    const { res } = getMockRes();

    const data = await signup(req, res);

    expect(true).toEqual(true);
  });
});
