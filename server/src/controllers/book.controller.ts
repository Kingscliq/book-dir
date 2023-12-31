import { Request, Response, NextFunction } from 'express';
import Book from './../models/book.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';


// get one book
const getAllBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // filtering the query
    const queryObj = {...req.query}
    const excludedFields:string[] = ['page','limit','sort','fields']
    excludedFields.forEach(exfields => delete queryObj[exfields])

  // advanced filtering
  let queryStr = JSON.stringify(queryObj)
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    // const books = await Book.find(queryObj);
    let query =  Book.find(JSON.parse(queryStr));

      // SORTING
    if(req.query.sort){
      const sortBy = (req.query.sort as any).split(',').join(" ")
      query = query.sort(sortBy)
    }else{
      query.sort('-createdAt')
    }

    // FIELD LIMITING

    if(req.query.fields){
      const fields = (req.query.fields as any).split(',').join(" ")
      query = query.select(fields)
    }
    else{
      query.select('-__v')
    }

      // PAGINATION
      const page:number = Number(req.query.page) || 1
      const limit:number = Number(req.query.limit) || 100
      const skip:number = (page - 1) * limit
      query = query.skip(skip).limit(limit)
      
      if(req.query.page){
        const numBooks = await Book.estimatedDocumentCount()
        if(skip >= numBooks){
          return next(new AppError(
            "The page you request does not exist",
            404,
          ),)
        }
      }

    // executing the query
    const books = await query

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
