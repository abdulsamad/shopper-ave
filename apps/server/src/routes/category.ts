import express from 'express';

import { addCategory } from '@controllers/category';

const router = express.Router();

/*
 * ### ADMIN ###
 */

router.route('/admin/category/add').post(addCategory);

export default router;
