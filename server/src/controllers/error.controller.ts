import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { Error } from '../types';

const sendErrorDev = (err: Error, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: Error, res: Response) => {
  // known errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // unknown errors
  } else {
    // logging the error to the console so that it will be visible in the longs of the hosting platform
    console.error('Error', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

export = (err: Error, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') sendErrorProd(err, res);
};
