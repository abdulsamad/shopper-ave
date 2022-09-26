import { faker } from '@faker-js/faker';
import { getMockRes } from '@jest-mock/express';

import { respondWithCookieToken } from './respondWithCookieToken';
import { userDetails } from './test-helpers';

describe('Respond With cookie token', () => {
  it('respondWithCookieToken returns json', async () => {
    const { res } = getMockRes();

    const response = respondWithCookieToken(
      {
        ...userDetails,
        forgotPasswordToken: faker.datatype.uuid(),
        forgotPasswordExpiry: (Date.now() + 120 * 60 * 1000).toString(),
        isValidPassword: () => true,
        getJwtToken: () => faker.datatype.uuid(),
        getForgotPasswordToken: () => faker.datatype.uuid(),
      },
      res
    );

    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        token: expect.any(String),
        user: expect.any(Object),
      })
    );
  });
});
