import express from 'express';

import { signup, login, logout, forgotPassword, passwordReset, getLoggedInUserDetails } from '@controllers/user';
import { isLoggenIn } from '@middlewares/user';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/password/reset/:token').post(passwordReset);
router.route('/userdashboard').get(isLoggenIn, getLoggedInUserDetails);

export default router;
