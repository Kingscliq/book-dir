import { Request, Response, NextFunction } from 'express';
import Review from './../models/review.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';


// get All review
const getAllReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await Review.find()

    res.status(200).json({
      status: 'success',
      result: reviews.length,

      data: {
        reviews: reviews,
      },
    });
  },
);

// create review
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

// get one review
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

// update review
const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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
        review,
      },
    });
  },
);

// delete review
const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return next(
        new AppError(
          `message:No review with this ID:${req.params.id} found`,
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

export default { createReview, getReview, updateReview, deleteReview, getAllReviews };
