import mongoose from 'mongoose';

import { IUser } from '@models/user';
import { Product as IProduct } from '@types';

// export interface IProduct extends Product {
//   //
// }

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
      maxlength: [120, 'Product name should not be more than 120 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      maxlength: [7, 'Product price should not be more than a million'],
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    photos: [
      {
        id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please select a valid category'],
      enum: {
        values: ['T-Shirt', 'Electronics', 'Hoodie'],
        message: 'Please select a valid category',
      },
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand for clothing'],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
