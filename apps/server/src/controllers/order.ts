import { Request, Response } from 'express';

import Order from '@models/order';
import Product from '@models/product';
import User from '@models/user';
import updateProductstock from '@utils/updateProductStock';

export const createOrder = async (req: Request, res: Response) => {
  const { shippingInfo, orderItems, paymentInfo, taxAmount, shippingAmount, totalAmount } =
    req.body;

  if (
    !shippingInfo ||
    !orderItems ||
    !totalAmount ||
    shippingAmount === undefined ||
    taxAmount === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, err: 'Order cannot be processed without all details' });
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

    await Promise.all(
      order.orderItems.map(async ({ product, quantity }) => {
        await updateProductstock(product, quantity);
      })
    );

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error();
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  if (!orderId) {
    return res.status(400).json({ success: false, err: 'Order ID is required to get an order' });
  }

  try {
    const order = await Order.findById(orderId).populate(
      'user',
      'name email photo.secure_url role'
    );

    if (!order) {
      return res.status(400).json({ success: false, err: 'Order ID is not valid' });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error();
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user?._id }).sort({ updatedAt: -1 });

    if (!orders) {
      return res.status(400).json({ success: false, err: `No orders found for ${req.user?.name}` });
    }

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error();
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

/*
 * ### ADMIN ###
 */

export const adminGetAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate({
      path: 'orderItems.product',
      select: 'name image',
    });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error();
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const adminStats = async (_req: Request, res: Response) => {
  try {
    const [orders, products, users] = await Promise.all([
      Order.find({}, 'totalAmount orderStatus orderItems'),
      Product.countDocuments(),
      User.countDocuments(),
    ]);
    const revenue = orders
      .filter((order) => order.orderStatus !== 'canceled')
      .reduce((total, order) => total + order.totalAmount, 0);
    const itemsOrdered = orders.reduce(
      (total, order) =>
        total +
        (order.orderStatus === 'canceled'
          ? 0
          : order.orderItems.reduce((items, item) => items + item.quantity, 0)),
      0
    );

    return res.status(200).json({ success: true, revenue, itemsOrdered, products, users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const adminUpdateOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const orderStatus = req.body.orderStatus;

  if (!orderStatus || !orderId) {
    return res
      .status(400)
      .json({ success: false, err: 'Order ID and status is required to update order' });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(400).json({ success: false, err: 'No order found with given ID' });
    }

    if (order.orderStatus === 'delivered') {
      return res.status(400).json({ success: false, err: 'Order is already delivered' });
    }

    if (orderStatus === 'canceled' && order.orderStatus !== 'canceled') {
      await Promise.all(
        order.orderItems.map(async ({ product, quantity }) => {
          await updateProductstock(product, quantity, true);
        })
      );
    }

    order.orderStatus = orderStatus;

    await order.save();

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error();
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const adminDeleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(400).json({ success: false, err: 'No order found with this order ID' });
    }

    if (order.orderStatus !== 'canceled' && order.orderStatus !== 'delivered') {
      await Promise.all(
        order.orderItems.map(async ({ product, quantity }) => {
          await updateProductstock(product, quantity, true);
        })
      );
    }

    const removedOrder = await order.deleteOne();

    // TODO: Increase stock quantity again
    // order.orderItems.map(async ({ product, quantity }) => {
    //   await Product.findByIdAndUpdate(
    //     product,
    //     {
    //       stock: quantity,
    //     },
    //     {
    //       new: true,
    //       runValidators: true,
    //       useFindAndModify: false,
    //     }
    //   );
    // });

    return res.status(200).json({
      success: true,
      order: removedOrder,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};
