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
    const imageArray = [];

    if (files) {
      for (let i = 0; i < photos.length; i++) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(photos[i].tempFilePath, {
          folder: 'products',
        });

        imageArray.push({
          id: public_id,
          secure_url: secure_url,
        });
      }
    }

    req.body.photos = imageArray;
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

export const adminGetAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};
