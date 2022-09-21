import { Response } from 'express';

import { IUser } from '@models/user';

/**
 * Function to respond user with cookie and auth details for validation
 * @param user User from Database
 * @param res Response object form express
 * @returns cookie auth details as jsos
 */
export const respondWithCookieToken = (user: IUser, res: Response) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + (parseInt(process.env.COOKIE_TIME) || 3) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  // const { password, ...rest } = user._id;
  user.password = '🤨';

  return res.status(200).cookie('token', options).json({
    success: true,
    token,
    user,
  });
};
