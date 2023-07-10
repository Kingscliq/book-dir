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
    const { id } = req.params;

    const user = await User.findById(id, '-password');
  
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        users: user,
      },
    });
  },
);

// TODO:
/**
 *  1. Restrict Access to Editing certain fields from the db [username, email]
 *  2. Convert update endpoint to form Data
 *  3. Add Role based Authentication
 *  */

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
// TODO:user should not use this route for updating username, password and email
    const payload = req.body;
    const user = await User.findByIdAndUpdate(id, { ...payload }); // TODO: how can we control the values that go into the DB for updatng user record
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.status(201).json({
      status: 'success',
      message: 'User updated successfully',
    });
  },
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
// TODO: 

/**
 * 1. We need not to delete a user bu change the active key to false
 * 2. Implement a function to exclude inactive users when fetching all users
 * 3. Add active to true by default on the user model
 */
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  },
);

export default { fetchUsers, fetchSingleUser, deleteUser, updateUser };
