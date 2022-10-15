import express from 'express';

import { addProduct, getAllProduct } from '@controllers/product';
import { checkRole, isLoggenIn } from '@middlewares/user';

const router = express.Router();

/*
 * ### User ###
 */

router.route('/products').get(isLoggenIn, getAllProduct);

/*
 * ### ADMIN ###
 */

router.route('/admin/product/add').post(isLoggenIn, checkRole('admin'), addProduct);

export default router;