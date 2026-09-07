import express from 'express';

import { addCategory, deleteCategory, getCategories } from '@controllers/category';
import { checkRole, isLoggedIn } from '@middlewares/user';

const router = express.Router();

router.route('/categories').get(getCategories);
router.route('/admin/categories').get(isLoggedIn, checkRole('admin'), getCategories);
router.route('/admin/category/add').post(isLoggedIn, checkRole('admin'), addCategory);
router.route('/admin/category/:id').delete(isLoggedIn, checkRole('admin'), deleteCategory);

export default router;
