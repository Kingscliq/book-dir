import { Request, Response, NextFunction } from 'express';
import Book from './../models/book.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

// get one book
const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
// create book
const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      authors,
      ISBN,
      summary,
      genre,
      tags,
      image,
      numberOfRatings,
      ratingAverage,
    } = req.body;
    const newBook = await Book.create({
      name,
      authors,
      ISBN,
      summary,
      genre,
      tags,
      image,
      numberOfRatings,
      ratingAverage,
    });
    res.status(201).json({
      status: 'success',
      data: {
        book: newBook,
      },
    });
  },
);

export default { signup, getUsers };
