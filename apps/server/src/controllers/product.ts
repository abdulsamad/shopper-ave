import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

import Product from '@models/product';
import WhereClause from '@utils/whereClause';

export const addProduct = async (req: Request, res: Response) => {
  // Images
  const files = req.files;

  if (!files) {
    return res.status(400).json({ err: 'Image is required for a product' });
  }

  const photos = files.photos as UploadedFile[];

  if (!photos) {
    return res.status(400).json({ err: 'Atleast one image is required for a product' });
  }

  try {
    const imagesArray = [];

    if (files) {
      // TODO: Refactor with promise.all to improve performance
      // Upload and save the images
      for (let i = 0; i < photos.length; i++) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(photos[i].tempFilePath, {
          folder: process.env.PRODUCT_FOLDER_NAME,
        });

        imagesArray.push({
          id: public_id,
          secure_url: secure_url,
        });
      }
    }

    req.body.photos = imagesArray;
    req.body.user = req.user?._id;

    const product = await Product.create(req.body);

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  const query = req.query;

  try {
    const resultPerPage = 6;
    const totalProducts = await Product.countDocuments();

    // ! Add explicit types for Whereclause class
    let products: any = new WhereClause(Product.find(), query).search().filter();

    const filteredProductNumber = products.length;

    products.pager(resultPerPage);
    products = await products.base;

    return res.status(200).json({
      success: true,
      products,
      filteredProductNumber,
      totalProducts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ err: 'Product ID is required to get a product' });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ err: `No product found with ${productId} ID` });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const addReview = async (req: Request, res: Response) => {
  const { rating, comment, productId } = req.body;

  if (!rating && !comment && !productId) {
    return res.status(400).json({ err: 'Rating, comment and product ID are required to add a review' });
  }

  if (!req.user) {
    return res.status(401).json({ err: 'User is not logged in' });
  }

  try {
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(500).json({ err: 'Product not available' });
    }

    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user?._id);

    if (alreadyReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user?._id) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }

    // Rating
    product.ratings = product.reviews.reduce((acc, value) => value.rating + acc, 0) / product.reviews.length;

    // Save
    await product.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

/*
 * ### ADMIN ###
 */

export const adminUpdateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ err: 'Product ID is required to update a product' });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ err: `No product found with ${productId} ID` });
    }

    // Images
    const files = req.files;
    const imagesArray = [];

    if (files) {
      const photos = files.photos as UploadedFile[];

      if (!photos) {
        return res.status(400).json({ err: 'Atleast one image is required for a product' });
      }

      // Destroy the exisiting images
      for (let i = 0; i < product.photos.length; i++) {
        await cloudinary.uploader.destroy(product.photos[i].id);
      }

      // TODO: Refactor with promise.all to improve performance
      // Upload and save the images
      for (let i = 0; i < photos.length; i++) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(photos[i].tempFilePath, {
          folder: process.env.PRODUCT_FOLDER_NAME,
        });

        imagesArray.push({
          id: public_id,
          secure_url: secure_url,
        });
      }
    }

    req.body.photos = imagesArray;

    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const adminDeleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ err: 'Product ID is required to update a product' });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ err: `No product found with ${productId} ID` });
    }

    // Destroy the exisiting images
    for (const photo of product.photos) {
      await cloudinary.uploader.destroy(photo.id);
    }

    const deletedProduct = await product.remove();

    return res.status(200).json({
      success: true,
      product: deletedProduct,
      message: 'Product was deleted',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const adminGetAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};
