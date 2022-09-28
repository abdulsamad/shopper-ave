import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { connect, clearDatabase, closeDatabase } from '@utils/test-db';
import { userDetailsForAuth } from '@utils/test-helpers';

import User from './user';

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('User Model', () => {
  it('Create new user', async () => {
    const user = await User.create(userDetailsForAuth);

    expect(user.name).toEqual(userDetailsForAuth.name);
    expect(user.email).toEqual(userDetailsForAuth.email);
  }),
    it('Name should not exceed length of 80 chars', async () => {
      let error;

      try {
        await User.create({ ...userDetailsForAuth, name: faker.lorem.lines(81) });
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }),
    it('Password should be atleast 8 chars', async () => {
      let error;

      try {
        await User.create({ ...userDetailsForAuth, password: '1234567' });
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }),
    it('Should throw error if password/email/name is undefined', async () => {
      let error;

      try {
        await User.create({});
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }),
    it('Password is validated with isValidPassword method', async () => {
      const user = await User.create(userDetailsForAuth);

      expect(user.isValidPassword(userDetailsForAuth.password)).toBeTruthy();
    }),
    it('Generate JWT is working', async () => {
      const user = await User.create(userDetailsForAuth);

      expect(user.getJwtToken()).toBeTruthy();
    }),
    it('Generating forgot password token is working', async () => {
      const user = await User.create(userDetailsForAuth);

      expect(user.getForgotPasswordToken()).toBeTruthy();
    });
});
