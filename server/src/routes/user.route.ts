import express from 'express';
import userController from '../controllers/user.controller';
import authController from '../controllers/auth.controller';
import Protected from '../middlewares/auth.middleware';

const router = express.Router();
// router.use(authController.protect);

router.route('/').get(Protected, userController.fetchUsers);

// router.delete("/deleteMe", userController.deleteMe);
// router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  userController.updateMe
);


router.route('/').get(Protected, userController.fetchUsers);
router
  .route('/:id')
  .get(Protected, userController.fetchSingleUser)
  // .patch(Protected, userController.updateUser)
  .delete(Protected, userController.deleteUser);

export default router;
