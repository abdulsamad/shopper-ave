import { Request, Response } from 'express';

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
    const order = await Order.findById(orderId);

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
