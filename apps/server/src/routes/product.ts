import express from 'express';

import {
  addProduct,
  getAllProduct,
  adminGetAllProduct,
  getProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  addReview,
  deleteReview,
  getProductReview,
} from '@controllers/product';
import { checkRole, isLoggedIn } from '@middlewares/user';

const router = express.Router();

/*
 * ### User ###
 */

router.route('/products').get(getAllProduct);
router.route('/product/review').put(isLoggedIn, addReview).delete(isLoggedIn, deleteReview);
router.route('/product/reviews').get(getProductReview);
router.route('/product/:id').get(getProduct);

/*
 * ### ADMIN ###
 */

router.route('/admin/products').get(isLoggedIn, checkRole('admin'), adminGetAllProduct);
router
  .route('/admin/product/:id')
  .get(isLoggedIn, checkRole('admin'), getProduct)
  .put(isLoggedIn, checkRole('admin'), adminUpdateProduct)
  .delete(isLoggedIn, checkRole('admin'), adminDeleteProduct);
router.route('/admin/product/add').post(isLoggedIn, checkRole('admin'), addProduct);

export default router;
