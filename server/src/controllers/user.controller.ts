import { normalize } from './../utils/helpers';
import { Request, Response, NextFunction } from 'express';
import Book from './../models/book.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';
import * as argon from 'argon2';

// Signup User
const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const password = await argon.hash(req.body.password);
    let email = normalize(req.body.email);
    const exists = await User.findOne({ email });

    if (exists) {
      return next(new AppError(`User ${email} already exists`, 400));
    }

    const user: Partial<IUser> = {
      email: email,
      password: password,
      username: req.body.username,
    };

    const created = await User.create(user);

    if (!created) {
      return next(new AppError(`Error creating user! Please try again`, 400));
    } else {
      res.status(201).json({
        status: 'success',
        data: {
          book: created,
        },
      });
    }
    console.log(req.body);
  },
);

export default { signup };
