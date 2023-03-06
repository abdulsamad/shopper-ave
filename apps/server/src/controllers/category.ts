import { Request, Response } from 'express';

export const addCategory = (req: Request, res: Response) => {
  const { name } = req.body;

  const category = name;

  try {
    return res.status(201).json({
      success: true,
      category,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Something went wrong' });
  }
};
