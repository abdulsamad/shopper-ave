import { Types } from 'mongoose';

import Product from '@models/product';

/**
 * Update Product's stock quantity in the database
 * @param productId Product's MongoDB ObjectId
 * @param quantity Product's quantity
 * @param increment Whether product stock should increment or decrement
 */
export const updateProductstock = async (productId: Types.ObjectId, quantity: number, increment = false) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const stock = product.stock;

    if (increment) {
      // Increment the stock quantity (e.g Order is canceled)
      product.stock = stock + quantity;
    } else {
      // Decrement the stock quantity (e.g Order is created)
      if (stock < quantity) {
        throw new Error('Product stock is less than required quanity');
      }

      product.stock = stock - quantity;
    }

    await product.save({ validateBeforeSave: false });
  } catch (err) {
    console.error(err);
  }
};

export default updateProductstock;
