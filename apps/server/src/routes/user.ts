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
  managerAllUsers,
  adminUser,
  adminUpdateUser,
  adminDeleteUser,
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
router
  .route('/admin/user/:id')
  .get(isLoggenIn, checkRole('admin'), adminUser)
  .put(isLoggenIn, checkRole('admin'), adminUpdateUser)
  .delete(isLoggenIn, checkRole('admin'), adminDeleteUser);

// Manager
router.route('/manager/users').get(isLoggenIn, checkRole('manager'), managerAllUsers);

export default router;
