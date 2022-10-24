import mongoose from 'mongoose';

import { connect, clearDatabase, closeDatabase } from '@utils/test-db';
import { orderDetails, productDetails, userDetailsForAuth } from '@utils/test-helpers';

import Order from './order';
import Product from './product';
import User from './user';

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe('Product Model', () => {
  it('Order Should not be created without all details', async () => {
    const user = await User.create(userDetailsForAuth);
    const dummyProductDetails = productDetails(user._id);
    const product = await Product.create(dummyProductDetails);
    const dummyOrderDetails = orderDetails({ userId: user._id, productId: product._id });

    let error;

    try {
      await Order.create({ ...dummyOrderDetails, shippingInfo: undefined });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
  }),
    it('Create new order', async () => {
      const user = await User.create(userDetailsForAuth);
      const dummyProductDetails = productDetails(user._id);
      const product = await Product.create(dummyProductDetails);
      const dummyOrderDetails = orderDetails({ userId: user._id, productId: product._id });
      const order = await Order.create(dummyOrderDetails);

      expect(order.shippingInfo).toEqual(expect.objectContaining(dummyOrderDetails.shippingInfo));
      expect(order.user).toEqual(dummyOrderDetails.user);
      expect(order.orderItems).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            quantity: expect.any(Number),
            price: expect.any(Number),
            image: expect.any(String),
            product: product._id,
          }),
        ])
      );
      expect(order.paymentInfo).toEqual(expect.objectContaining({ id: expect.any(String) }));
      expect(order.taxAmount).toEqual(dummyOrderDetails.taxAmount);
      expect(order.shippingAmount).toEqual(dummyOrderDetails.shippingAmount);
      expect(order.totalAmount).toEqual(dummyOrderDetails.totalAmount);
      expect(order.orderStatus).toEqual(dummyOrderDetails.orderStatus);
    });
});
