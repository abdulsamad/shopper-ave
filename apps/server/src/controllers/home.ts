import { Request, Response } from 'express';

export const welcome = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Welcome to the Shopper Ave API',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};
