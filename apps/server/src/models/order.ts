import mongoose from 'mongoose';
import validator from 'validator';

import { Order as IOrder } from '@types';

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        validator: [validator.isMobilePhone, 'Please enter a valid phone number'],
        required: true,
      },
      postalCode: {
        type: String,
        validator: [validator.isPostalCode, 'Please enter a valid postal code'],
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // mongoose.Schema.ObjectId for backwards compatibility
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    // Optional Metadata for payment
    paymentInfo: {
      id: {
        type: String,
      },
    },
    taxAmount: {
      type: Number,
      required: true,
    },
    shippingAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: 'processing',
      enum: {
        values: ['processing', 'dispatched', 'out_for_delivery', 'delivered', 'canceled'],
        message: 'Please pass a valid order status',
      },
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
