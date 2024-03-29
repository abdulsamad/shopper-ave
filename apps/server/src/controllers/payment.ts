import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

// Load stripe
const stripe = new Stripe(process.env.STRIPE_SECRET, {
  appInfo: { name: 'Shopper Ave' },
  apiVersion: '2022-11-15',
});

export const sendStripeKey = (req: Request, res: Response) => {
  try {
    const key = process.env.STRIPE_API_KEY;

    return res.status(200).json({
      success: true,
      key,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const capturePayment = async (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ success: false, err: 'Amount is required for payment' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount.toFixed(2)) * 100,
      currency: 'INR',

      // Optional metadata for payment on stripe
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });

    return res.status(201).json({
      success: true,
      client_secret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};
