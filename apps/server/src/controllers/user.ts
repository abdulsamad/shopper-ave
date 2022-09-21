import { Request, Response } from 'express';

import User from '@models/user';
import { respondWithCookieToken } from '@utils/respondWithCookieToken';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ err: 'Name, email and password are required' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return respondWithCookieToken(user, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong!' });
  }
};
