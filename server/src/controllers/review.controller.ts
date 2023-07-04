import { Request, Response, NextFunction } from 'express';
import Review from './../models/review.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';


// get one book
const getAllReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await Review.find()

    res.status(200).json({
      status: 'success',
      result: reviews.length,

      data: {
        books: reviews,
      },
    });
  },
);

// create book
const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      comment,
      rating,
      book,
      user,
    } = req.body;
    const newReview = await Review.create({
      comment,
      rating,
      book,
      user,
    });
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview,
      },
    });
  },
);

// get one book
const getReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(
        new AppError(
          `message:No review with this ID:${req.params.id} found`,
          404,
        ),
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        review: review,
      },
    });
  },
);

// update book
const updateBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return next(
        new AppError(
          `message:No book with this ID:${req.params.id} found`,
          404,
        ),
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        book,
      },
    });
  },
);

// delete book
const deleteBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return next(
        new AppError(
          `message:No book with this ID:${req.params.id} found`,
          404,
        ),
      );
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);

export default { createBook, getBook, updateBook, deleteBook, getAllBook };
