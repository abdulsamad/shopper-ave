import express from 'express';

import { createOrder, getOrder, getUserOrders } from '@controllers/order';
import { isLoggedIn, checkRole } from '@middlewares/user';

const router = express.Router();

router.route('/order/create').post(isLoggedIn, createOrder);
router.route('/order/myorder').get(isLoggedIn, getUserOrders);
router.route('/order/:id').get(isLoggedIn, getOrder);

export default router;
