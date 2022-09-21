import { faker } from '@faker-js/faker';

export const userDetails = {
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
};
