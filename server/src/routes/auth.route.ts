import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

export default router;
