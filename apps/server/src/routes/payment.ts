import express from 'express';

import { isLoggedIn } from '@middlewares/user';
import { capturePayment, sendStripeKey } from '@controllers/payment';

const router = express.Router();

router.route('/payment/stripekey').get(isLoggedIn, sendStripeKey);

router.route('/payment/capturestripe').post(isLoggedIn, capturePayment);

export default router;
