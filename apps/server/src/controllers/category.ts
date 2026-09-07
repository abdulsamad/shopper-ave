import { Request, Response } from 'express';
import Category from '@models/category';

export const addCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, err: 'Category name is required' });
  }

  try {
    const category = await Category.create({ name: name.trim() });
    return res.status(201).json({ success: true, category });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.status(200).json({ success: true, categories });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) return res.status(404).json({ success: false, err: 'Category not found' });
    return res.status(200).json({ success: true, category });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err: 'Something went wrong' });
  }
};
