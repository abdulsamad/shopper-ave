import express from 'express';

import { signup, login, logout, forgotPassword, passwordReset } from '@controllers/user';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/password/reset/:token').post(passwordReset);

export default router;
