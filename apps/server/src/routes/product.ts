import express from 'express';

import { addProduct, getAllProduct, adminGetAllProduct, getProduct, adminUpdateProduct } from '@controllers/product';
import { checkRole, isLoggenIn } from '@middlewares/user';

const router = express.Router();

/*
 * ### User ###
 */

router.route('/products').get(getAllProduct);
router.route('/product/:id').get(getProduct);

/*
 * ### ADMIN ###
 */

router.route('/admin/products').get(isLoggenIn, checkRole('admin'), adminGetAllProduct);
router.route('/admin/product').get(isLoggenIn, checkRole('admin'), getProduct);
router.route('/admin/product:id').get(isLoggenIn, checkRole('admin'), adminUpdateProduct);
router.route('/admin/product/add').post(isLoggenIn, checkRole('admin'), addProduct);

export default router;
