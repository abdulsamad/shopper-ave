import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { User } from 'shared-types';

export interface IUser extends User {
  isValidPassword: (receivedPassword: string) => Promise<boolean>;
  getJwtToken: () => void;
  getForgotPasswordToken: () => string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      minlength: [3, 'Name should be more than 3 characters'],
      maxlength: [80, 'Name should be under 80 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      validator: [validator.isEmail, 'Please enter email in correct format'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      // validator: [validator.isStrongPassword, 'Please enter a strong password'],
      minLength: [8, 'Password should be atleast 8 characters'],
      select: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: {
        values: ['user', 'admin', 'manager'],
        message: 'Please pass a valid role',
      },
    },
    photo: {
      id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

// Encrypt password before save
UserSchema.pre('save', async function (next) {
  /* istanbul ignore next */
  // Return next if password is not modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

// Validate the password
UserSchema.methods.isValidPassword = async function (receivedPassword: string) {
  return await bcrypt.compare(receivedPassword, this.password);
};

// Generate and return JWT
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// Generate forgot password token
UserSchema.methods.getForgotPasswordToken = function () {
  const token = crypto.randomBytes(20).toString('hex');

  // Gettings a hash - make sure to get a hash on backend
  this.forgotPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  // Time of token
  this.forgotPasswordExpiry = Date.now() + 120 * 60 * 1000;

  return token;
};

export default mongoose.model('User', UserSchema);
