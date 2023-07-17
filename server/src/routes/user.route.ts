import express from 'express';
import userController from '../controllers/user.controller';
import Protected from '../middlewares/auth.middleware';

const router = express.Router();

router.route('/').get(Protected, userController.fetchUsers);
router
  .route('/:id')
  .get(Protected, userController.fetchSingleUser)
  .patch(Protected, userController.updateUser)
  .delete(Protected, userController.deleteUser);

export default router;
