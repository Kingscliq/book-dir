import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.route('/').get(userController.fetchUsers);
router.route('/:id').get(userController.fetchSingleUser);

export default router;
