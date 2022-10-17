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
import { checkRole, isLoggedIn } from '@middlewares/user';

const router = express.Router();

/*
 * ### User ###
 */

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/password/reset/:token').post(passwordReset);
router.route('/dashboard').get(isLoggedIn, getLoggedInUserDetails);
router.route('/password/update').post(isLoggedIn, changePassword);
router.route('/dashboard/update').post(isLoggedIn, updateUser);

/*
 * ### ADMIN ###
 */

router.route('/admin/users').get(isLoggedIn, checkRole('admin'), adminAllUsers);
router
  .route('/admin/user/:id')
  .get(isLoggedIn, checkRole('admin'), adminUser)
  .put(isLoggedIn, checkRole('admin'), adminUpdateUser)
  .delete(isLoggedIn, checkRole('admin'), adminDeleteUser);

// Manager
router.route('/manager/users').get(isLoggedIn, checkRole('manager'), managerAllUsers);

export default router;
