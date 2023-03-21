import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import crypto from 'crypto';

import User from '@models/user';
import { respondWithCookieToken } from '@utils/respondWithCookieToken';
import { mailHelper } from '@utils/email-helper';

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
      return res.status(400).json({ success: false, err: 'Name, email and password are required' });
    }

    const user = await User.create({
      name,
      email,
      password,
      photo: {
        id: result?.public_id,
        secure_url: result?.secure_url,
      },
    });

    return respondWithCookieToken(user, res, 201);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, err: 'Email and password are required' });
  }

  try {
    // Search user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ success: false, err: 'Please enter valid credentials ' });
    }

    // Validate password with models custom method
    const isPasswordCorrect = await user.isValidPassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, err: 'Please enter valid credentials ' });
    }

    return respondWithCookieToken(user, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
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
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  let user;

  try {
    user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, err: 'User not found' });
    }

    const forgotToken = user.getForgotPasswordToken();
    await user.save({ validateBeforeSave: false });

    const tokenUrl = `${req.protocol}://${req.hostname}/password/reset/${forgotToken}`;
    const message = `Copy paste this link in the URL and hit enter \n\n ${tokenUrl}`;

    await mailHelper({
      to: email,
      subject: `Shopper Ave - Password Reset Email`,
      text: message,
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (err) {
    // Reset forgot token and expiry in database (If sending email fails the forgot passsword token is still added to DB by user.getForgotPasswordToken method)
    if (user) {
      user.forgotPasswordToken = undefined;
      user.forgotPasswordExpiry = undefined;

      await user.save({ validateBeforeSave: false });
    }

    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const passwordReset = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    const encryToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      forgotPasswordToken: encryToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, err: 'Token is either invalid or expired' });
    }

    if (password && password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, err: 'Password and confirm password does not match' });
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    return respondWithCookieToken(user, res, 201);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
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
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user?._id;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ success: false, err: 'Both old and new password is required to update password' });
  }

  try {
    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new Error('User not available');
    }

    const isCorrectOldPassword = await user.isValidPassword(oldPassword);

    if (!isCorrectOldPassword) {
      return res.status(400).json({ success: false, err: 'Old password is incorrect' });
    }

    user.password = newPassword;

    await user.save();

    respondWithCookieToken(user, res, 201);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const file = req.files?.photo as UploadedFile;

  if (!name && !email && !file) {
    return res.status(400).json({ success: false, err: 'No data provided to update' });
  }

  // Updated data
  const updatedData: { [key: string]: string | object } = {
    name,
    email,
  };

  try {
    // Check is file is updated
    if (file) {
      const user = await User.findById(req.user?._id);

      if (user && user.photo?.id) {
        const imageId = user.photo.id;

        // Delete images on Cloudinary
        await cloudinary.uploader.destroy(imageId);

        // Upload the new image to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: 'users',
          width: 300,
          crop: 'scale',
        });

        updatedData.photo = {
          id: result.public_id,
          secure_url: result.secure_url,
        };
      }
    }

    const user = await User.findByIdAndUpdate(req.user?._id, updatedData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const addAddress = async (req: Request, res: Response) => {
  const { address, city, postalCode, state, country } = req.body;
  const userId = req.user?._id;

  if (!address || !city || !postalCode || !state || !country) {
    return res.status(400).json({
      success: false,
      err: 'Address, city, postal code, state, and country all are required',
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: { address, city, postalCode, state, country } } },
      { new: true }
    );

    if (!user) {
      throw new Error('User not available');
    }

    return res.status(201).json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const removeAddress = async (req: Request, res: Response) => {
  const { addressId } = req.params;
  const userId = req.user.id;

  if (!addressId) {
    return res
      .status(400)
      .json({ success: false, err: 'Address Id is required to remove address' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );

    if (!user) {
      throw new Error('User not available');
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

/*
 * ### ADMIN ###
 */

export const adminAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const adminUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, err: 'User ID is required to get the user' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ success: false, err: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const adminUpdateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email, role } = req.body;
  const file = req.files?.photo as UploadedFile;

  const updatedData: { [key: string]: string | object } = {
    name,
    email,
    role,
  };

  if (!userId) {
    return res.status(400).json({ success: false, err: 'User ID is required to update user' });
  }

  if (!name && !email && !role) {
    return res.status(400).json({
      success: false,
      err: 'Atleast one property (name, email, photo or role) is required to update data',
    });
  }

  try {
    // Check is file is updated
    if (file) {
      const user = await User.findById(userId);

      if (user && user.photo?.id) {
        const imageId = user.photo.id;

        // Delete images on Cloudinary
        await cloudinary.uploader.destroy(imageId);

        // Upload the new image to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: 'users',
          width: 300,
          crop: 'scale',
        });

        updatedData.photo = {
          id: result.public_id,
          secure_url: result.secure_url,
        };
      }
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
      useFindandModify: false,
    });

    if (!user) {
      return res.status(400).json({ success: false, err: 'No user found with this ID' });
    }

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const adminDeleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ success: false, err: 'User ID is requried to delete a user' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ success: false, err: 'No such user found' });
    }

    // Delete image from cloudinary
    const imageId = user.photo?.id;

    if (imageId) {
      await cloudinary.uploader.destroy(imageId);
    }

    await user.remove();

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const managerAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: 'user' });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};
