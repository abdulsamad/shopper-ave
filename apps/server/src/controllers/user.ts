import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import crypto from 'crypto';

import User from '@models/user';
import { respondWithCookieToken } from '@utils/respondWithCookieToken';
import { mailerHelper } from '@utils/email-helper';

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

  if (!email || !password) {
    return res.status(400).json({ err: 'Email and password are required' });
  }

  try {
    // Search user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ err: 'Please enter valid credentials ' });
    }

    // Validate password with models custom method
    const isPasswordCorrect = await user.isValidPassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ err: 'Please enter valid credentials ' });
    }

    return respondWithCookieToken(user, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Delete cookie
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Logout Success',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  let user;

  try {
    user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ err: 'User not found' });
    }

    const forgotToken = user.getForgotPasswordToken();
    await user.save({ validateBeforeSave: false });

    const tokenUrl = `${req.protocol}://${req.hostname}/password/reset/${forgotToken}`;
    const message = `Copy paste this link in the URL and hit enter \n\n ${tokenUrl}`;

    await mailerHelper({
      to: email,
      subject: `Shopper Ave - Password Reset Email`,
      text: message,
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (err) {
    // Reset forgot token and expiry in database
    if (user) {
      user.forgotPasswordToken = undefined;
      user.forgotPasswordExpiry = undefined;

      await user.save({ validateBeforeSave: false });
    }

    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const passwordReset = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    const encryToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ forgotPasswordToken: encryToken, forgotPasswordExpiry: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ err: 'Token is either invalid or expired' });
    }

    if (password && password !== confirmPassword) {
      return res.status(400).json({ err: 'Password and confirm password does not match' });
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    return respondWithCookieToken(user, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};

export const getLoggedInUserDetails = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({ err: 'Something went wrong' });
  }
};
