import { Request, Response } from 'express';

export const welcome = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Shopper Ave API',
  });
};
