import mongoose from 'mongoose';

import { Product as IProduct } from '@types';

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
      minlength: [3, 'Product name should be more than 3 characters'],
      maxlength: [240, 'Product name should not be more than 120 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      minlength: [1, 'Product price should be more the one digit'],
      maxlength: [7, 'Product price should not be more than a million'],
    },
    description: {
      type: String,
      minlength: [10, 'Product description should be more than 10 characters'],
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
      required: [true, 'Please provide a category'],
      maxlength: [40, 'Category length should be less than 40 characters'],
      enum: {
        values: ['t-shirt', 'electronics', 'hoodie'],
        message: 'Please pass a valid category',
      },
    },
    stock: {
      type: Number,
      required: [true, 'Please update your stock quantity'],
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand for clothing'],
    },
    ratings: {
      type: Number,
      maxlength: 1,
      enum: {
        values: [0, 1, 2, 3, 4, 5],
        message: 'Please pass a valid rating',
      },
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
