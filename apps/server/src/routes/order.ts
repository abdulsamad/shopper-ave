import express from 'express';

import {
  adminDeleteOrder,
  adminGetAllOrders,
  adminUpdateOrder,
  createOrder,
  getOrder,
  getUserOrders,
} from '@controllers/order';
import { isLoggedIn, checkRole } from '@middlewares/user';

const router = express.Router();

router.route('/order/create').post(isLoggedIn, createOrder);
router.route('/order/myorder').get(isLoggedIn, getUserOrders);
router.route('/order/:id').get(isLoggedIn, getOrder);

/*
 * ### ADMIN ###
 */

router.route('/admin/orders').get(isLoggedIn, checkRole('admin'), adminGetAllOrders);
router
  .route('/admin/order/:id')
  .put(isLoggedIn, checkRole('admin'), adminUpdateOrder)
  .delete(isLoggedIn, checkRole('admin'), adminDeleteOrder);

export default router;
