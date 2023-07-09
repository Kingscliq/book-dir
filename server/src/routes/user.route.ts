import express from 'express';
import userController from '../controllers/user.controller';
import isAuthorised from '../middlewares/auth.middleware';

const router = express.Router();

router.route('/').get(isAuthorised, userController.fetchUsers);
router
  .route('/:id')
  .get(isAuthorised, userController.fetchSingleUser)
  .patch(isAuthorised, userController.updateUser)
  .delete(isAuthorised, userController.deleteUser);

export default router;
