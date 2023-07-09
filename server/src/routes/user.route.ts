import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.route('/').post(userController.signup);
router.route('/').post(userController.signup);
router.route('/').post(userController.signup);

export default router;
