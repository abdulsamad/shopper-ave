import { faker } from '@faker-js/faker';

import { IUser } from '@models/user';

/* istanbul ignore file */
export const userDetails: IUser = {
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  role: 'user',
  photo: {
    id: faker.datatype.uuid(),
    secure_url: faker.internet.url(),
  },
  forgotPasswordToken: faker.datatype.uuid(),
  forgotPasswordExpiry: (Date.now() + 120 * 60 * 1000).toString(),
  isValidPassword: () => true,
  getJwtToken: () => faker.datatype.uuid(),
  getForgotPasswordToken: () => faker.datatype.uuid(),
};

export const userSuccessObj = {
  success: true,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzEzZTQzY2FjNTdkN2E4M2JjN2MxMCIsImlhdCI6MTY2NDE3MTU4NywiZXhwIjoxNjY0Nzc2Mzg3fQ.EYBTuXXBfFG3SXTGnE5zKQ1M1x-R1F_7liVivlNAXYo',
  user: {
    __v: 0,
    _id: faker.database.mongodbObjectId(),
    email: faker.internet.email(),
    name: faker.name.fullName(),
    password: '🤨',
    role: 'user',
    createdAt: '2022-09-26T05:53:07.739Z',
    updatedAt: '2022-09-26T05:53:07.739Z',
  },
};
