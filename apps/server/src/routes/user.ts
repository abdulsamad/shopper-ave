import express from 'express';

import {
  signup,
  login,
  logout,
  forgotPassword,
  passwordReset,
  getLoggedInUserDetails,
  changePassword,
  updateUser,
  adminAllUsers,
} from '@controllers/user';
import { checkRole, isLoggenIn } from '@middlewares/user';

const router = express.Router();

/*
 * ### User ###
 */

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/password/reset/:token').post(passwordReset);
router.route('/dashboard').get(isLoggenIn, getLoggedInUserDetails);
router.route('/password/update').post(isLoggenIn, changePassword);
router.route('/dashboard/update').post(isLoggenIn, updateUser);

/*
 * ### ADMIN ###
 */

router.route('/admin/users').get(isLoggenIn, checkRole('admin'), adminAllUsers);

export default router;
