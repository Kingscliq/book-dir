import { normalize } from './../utils/helpers';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';
import * as argon from 'argon2';
import * as JWT from 'jsonwebtoken';

// Signup User
const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const password = await argon.hash(req.body.password);
    let email = normalize(req.body.email);

    const exists = await User.findOne({ email });

    if (exists?.email) {
      return next(new AppError(`User ${email} already exists`, 400));
    } else if (exists?.username) {
      return next(
        new AppError(`User ${req.body.username} already exists`, 400),
      );
    }

    const user: Partial<IUser> = {
      email: email,
      password: password,
      username: req.body.username,
    };

    const created = await User.create(user);

    const { username, firstName, lastName, email: userEmail } = created;

    if (!created) {
      return next(new AppError(`Error creating user! Please try again`, 400));
    } else {
      res.status(201).json({
        status: 'success',
        data: {
          user: { username, firstName, lastName, userEmail },
        },
      });
    }
  },
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username: name, password } = req.body;

    const user = await User.findOne({ username: name });
    if (user) {
      const passwordMatch = await argon.verify(user.password, password);
      if (!passwordMatch) {
        return next(new AppError(`Incorrect username or Password`, 400));
      }
    } else {
      return next(new AppError(`Input valid credentials`, 400));
    }

    const accessToken = JWT.sign(user, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });

    const { username, firstName, email, lastName } = user;
    return res.status(200).json({
      status: 'OK',
      data: {
        user: { username, firstName, lastName, email, accessToken },
      },
    });
  },
);

export default { signup, login };
