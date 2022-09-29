import express from 'express';

import {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetails,
  changePassword,
} from '@controllers/user';
import { isLoggenIn } from '@middlewares/user';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/password/reset/:token').post(passwordReset);
router.route('/dashboard').get(isLoggenIn, getLoggedInUserDetails);
router.route('/password/update').post(isLoggenIn, changePassword);

export default router;
