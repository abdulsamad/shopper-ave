import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '@models/user';

export const isLoggenIn = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ err: 'Please login to access this page' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById((decoded as any).id);

    // Append user object to request.user
    // Added types for req.user in /env.d.ts
    req.user = user as any;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ err: "You're unauthorized to access this page" });
  }
};
