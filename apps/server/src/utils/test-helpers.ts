import { faker } from '@faker-js/faker';

import { User } from '@types';

/* istanbul ignore file */
export const user: User = {
  __v: 0,
  _id: faker.database.mongodbObjectId(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  password: '🤨',
  role: 'user',
  createdAt: '2022-09-26T05:53:07.739Z',
  updatedAt: '2022-09-26T05:53:07.739Z',
};

export const userDetailsForAuth = {
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  photo: {
    id: faker.datatype.uuid(),
    secure_url: faker.internet.url(),
  },
};

export const productDetails = (
  userId: string
): {
  name: string;
  price: number;
  description: string;
  photos: {
    id: string;
    secure_url: string;
  }[];
  category: string;
  stock: number;
  brand: string;
  user: string;
} => ({
  name: faker.commerce.product(),
  price: Number(faker.commerce.price(999, 99999)),
  description: faker.commerce.productDescription(),
  photos: [
    {
      id: faker.datatype.uuid(),
      secure_url: faker.image.imageUrl(),
    },
  ],
  category: 'hoodie',
  stock: 40,
  brand: 'Nike',
  user: userId,
});

export const orderDetails = ({ userId, productId }: { userId: string; productId: string }) => ({
  shippingInfo: {
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    phoneNo: faker.phone.number(),
    postalCode: faker.address.zipCodeByState('Ontario'),
    state: faker.address.state(),
    country: faker.address.country(),
  },
  user: userId,
  orderItems: [
    {
      name: faker.commerce.productName(),
      quantity: faker.datatype.number({ max: 5 }),
      image: faker.image.imageUrl(),
      price: faker.commerce.price(),
      product: productId,
    },
  ],
  paymentInfo: {
    id: faker.datatype.uuid,
  },
  taxAmount: faker.datatype.number({ max: 40 }),
  shippingAmount: faker.datatype.number({ max: 40 }),
  totalAmount: faker.datatype.number({ max: 40 }),
  orderStatus: 'processing',
});

export const userSuccessObj = {
  success: true,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzEzZTQzY2FjNTdkN2E4M2JjN2MxMCIsImlhdCI6MTY2NDE3MTU4NywiZXhwIjoxNjY0Nzc2Mzg3fQ.EYBTuXXBfFG3SXTGnE5zKQ1M1x-R1F_7liVivlNAXYo',
  user,
};
