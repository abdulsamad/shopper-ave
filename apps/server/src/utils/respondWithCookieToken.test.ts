import { faker } from '@faker-js/faker';
import { getMockRes } from '@jest-mock/express';

import { respondWithCookieToken } from './respondWithCookieToken';
import { userDetailsForAuth } from './test-helpers';

describe('Respond With cookie token', () => {
  it('respondWithCookieToken returns json', async () => {
    const { res } = getMockRes();

    const user = {
      ...userDetailsForAuth,
      forgotPasswordToken: faker.datatype.uuid(),
      forgotPasswordExpiry: (Date.now() + 120 * 60 * 1000).toString(),
      isValidPassword: () => true,
      getJwtToken: () => faker.datatype.uuid(),
      getForgotPasswordToken: () => faker.datatype.uuid(),
    };

    const response = respondWithCookieToken(user as any, res);

    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        token: expect.any(String),
        user: expect.any(Object),
      })
    );
  });
});
