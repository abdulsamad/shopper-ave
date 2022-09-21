import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { connect, clearDatabase, closeDatabase } from '@config/testDB';
import { userDetails } from '@utils/test-helpers';
import User from './user';

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('User Model', () => {
  it('Create new user', async () => {
    const user = await User.create(userDetails);

    expect(user.name).toEqual(userDetails.name);
    expect(user.email).toEqual(userDetails.email);
  }),
    it('Name should not exceed length of 80 chars', async () => {
      let error;

      try {
        await User.create({ ...userDetails, name: faker.lorem.lines(81) });
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }),
    it('Password should be atleast 8 chars', async () => {
      let error;

      try {
        await User.create({ ...userDetails, password: '1234567' });
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
      const user = await User.create(userDetails);

      expect(user.isValidPassword(userDetails.password)).toBeTruthy();
    }),
    it('Generate JWT is working', async () => {
      const user = await User.create(userDetails);

      expect(user.getJwtToken()).toBeTruthy();
    }),
    it('Generating forgot password token is working', async () => {
      const user = await User.create(userDetails);

      expect(user.getForgotPasswordToken()).toBeTruthy();
    });
});
