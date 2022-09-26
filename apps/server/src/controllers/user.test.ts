import { getMockReq, getMockRes } from '@jest-mock/express';

import { connect, clearDatabase, closeDatabase } from '@utils/test-db';
import { userDetails } from '@utils/test-helpers';

import { signup } from './user';

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('User Controllers', () => {
  it('User signs up with new account', async () => {
    const req = getMockReq({ body: userDetails });
    const { res } = getMockRes();

    await signup(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: expect.any(Boolean),
        token: expect.any(String),
        user: expect.objectContaining({
          name: userDetails.name,
          email: userDetails.email,
        }),
      })
    );
  }),
    it('Send error response on database error', async () => {
      // Trigger server error by passing short password (Less then 8 chars)
      const req = getMockReq({ body: { ...userDetails, password: '123456' } });
      const { res } = getMockRes();

      await signup(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          err: expect.any(String),
        })
      );
    }),
    it('Signup failed when required params are not provided', async () => {
      const req = getMockReq({ body: {} });
      const { res } = getMockRes();

      await signup(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          err: expect.any(String),
        })
      );
    });
});
