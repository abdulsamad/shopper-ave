import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

import User from '@models/user';
import { respondWithCookieToken } from '@utils/respondWithCookieToken';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  let result;

  if (req.files && req.files.photo) {
    const file = req.files.photo as UploadedFile;

    result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'users',
      height: 300,
      width: 300,
      crop: 'scale',
    });
  }

  try {
    if (!email || !name || !password) {
      return res.status(400).json({ err: 'Name, email and password are required' });
    }

    const user = await User.create({
      name,
      email,
      password,
      photo: {
        id: result?.public_id,
        secure_url: result?.url,
      },
    });

    return respondWithCookieToken(user, res, 201);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ err: 'Email and password are required' });
    }

    // Search user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ err: 'Please enter valid credentials ' });
    }

    // Validate password with models custom method
    const isPasswordCorrect = user.isValidPassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ err: 'Please enter valid credentials ' });
    }

    return respondWithCookieToken(user, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};
