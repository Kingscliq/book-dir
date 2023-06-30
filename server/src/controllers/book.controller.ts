import { Request, Response, NextFunction } from 'express';
import Book from './../models/book.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

// get one book
const getAllBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await Book.find();
    res.status(200).json({
      status: 'success',
      result: books.length,

      data: {
        books: books,
      },
    });
  },
);

// create book
const createBook = catchAsync(
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

// get one book
const getBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findById(req.params.id);
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
        book: book,
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
