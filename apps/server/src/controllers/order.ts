import { Request, Response } from 'express';
import { Types } from 'mongoose';

import Order from '@models/order';
import Product from '@models/product';

export const createOrder = async (req: Request, res: Response) => {
  const { shippingInfo, orderItems, paymentInfo, taxAmount, shippingAmount, totalAmount } = req.body;

  if (!shippingInfo || !orderItems || !taxAmount || !shippingAmount || !totalAmount) {
    return res.status(400).json({ err: 'Order cannot be processed without all details' });
  }

  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      taxAmount,
      shippingAmount,
      totalAmount,
      user: req.user?._id,
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error();
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  if (!orderId) {
    return res.status(400).json({ err: 'Order ID is required to get an order' });
  }

  try {
    const order = await Order.findById(orderId).populate('user', 'name email photo.secure_url role');

    if (!order) {
      return res.status(400).json({ err: 'Order ID is not valid' });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error();
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user?._id });

    if (!orders) {
      return res.status(400).json({ err: `No orders found for ${req.user?.name}` });
    }

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error();
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

/*
 * ### ADMIN ###
 */

export const adminGetAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error();
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const adminUpdateOrder = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const orderStatus = req.body.orderStatus;

  if (!orderStatus || !orderId) {
    return res.status(400).json({ err: 'Order ID and status is required to update order' });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(400).json({ err: 'No order found with given ID' });
    }

    if (order.orderStatus === 'delivered') {
      return res.status(400).json({ err: 'Order is already delivered' });
    }

    order.orderStatus = orderStatus;

    // TODO: Check later for asynchronous concurrency issue
    order.orderItems.forEach(async ({ product, quantity }) => {
      await updateProductstock(product, quantity);
    });

    await order.save();

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error();
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

const updateProductstock = async (productId: Types.ObjectId, quantity: number) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const stock = product.stock;

    if (stock < quantity) {
      throw new Error('Product stock is less than required quanity');
    }

    product.stock = stock - quantity;

    await product.save({ validateBeforeSave: false });
  } catch (err) {
    console.error(err);
  }
};

export const adminDeleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(400).json({ err: 'No order found with provided ID' });
    }

    const removedOrder = await order.remove();

    return res.status(200).json({
      success: true,
      order: removedOrder,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};
