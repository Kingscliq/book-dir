import { normalize } from './../utils/helpers';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

import User from '../models/user.model';

// Signup User
const fetchUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryObj = { ...req.query };
    const excludedFields: string[] = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((exfields) => delete queryObj[exfields]);

    // advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let users = User.find(JSON.parse(queryStr), '-password');

    // SORTING
    if (req.query.sort) {
      const sortBy = (req.query.sort as any).split(',').join(' ');
      users = users.sort(sortBy);
    }

    // FIELD LIMITING
    if (req.query.fields) {
      const fields = (req.query.fields as any).split(',').join(' ');
      users = users.select(fields);
    } else {
      users.select('-__v');
    }

    // PAGINATION
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 100;
    const skip: number = (page - 1) * limit;
    users = users.skip(skip).limit(limit);

    if (req.query.page) {
      const numBooks = await User.estimatedDocumentCount();
      if (skip >= numBooks) {
        return next(new AppError('The page you request does not exist', 404));
      }
    }

    // executing the query
    const response = await users;

    res.status(200).json({
      status: 'success',
      result: response?.length,
      data: {
        users: response,
      },
    });
  },
);
const fetchSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
  },
);

export default { fetchUsers, fetchSingleUser };
