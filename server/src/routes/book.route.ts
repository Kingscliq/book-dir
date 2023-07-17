import express from 'express';
import bookController from '../controllers/book.controller';

const router = express.Router();

// router
//   .route("/add-to-favouriteBook")
//   .patch( bookController.addToFavouriteBooks);


router
  .route('/')
  .get(bookController.getAllBook)
  .post(bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

export default router;
