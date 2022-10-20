import { connect, clearDatabase, closeDatabase } from '@utils/test-db';
import { productDetails, userDetailsForAuth } from '@utils/test-helpers';

import Product from './product';
import User from './user';

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('Product Model', () => {
  it('Create new product', async () => {
    const user = await User.create(userDetailsForAuth);
    const dummyProductDetails = productDetails(user._id);

    const product = await Product.create(dummyProductDetails);

    expect(product.name).toEqual(dummyProductDetails.name);
    expect(product.description).toBe(dummyProductDetails.description);
    expect(product.photos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          secure_url: expect.any(String),
        }),
      ])
    );
    expect(product.category).toEqual(dummyProductDetails.category);
    expect(product.stock).toEqual(dummyProductDetails.stock);
    expect(product.brand).toEqual(dummyProductDetails.brand);
    expect(product.user).toEqual(dummyProductDetails.user);
  });
});
