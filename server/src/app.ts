import express, { response } from 'express';
// import type { ErrorRequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express';

import morgan from 'morgan';
import AppError from './utils/appError';
import glogalErrorHandler from './controllers/error.controller'
import bookRouter from "./routes/book.route"

const app = express();

// Global MIDDLEWARES'
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body parser
app.use(express.json({ limit: '10kb' })); 

app.use(express.static(`${__dirname}/public`)); //for serving static files

app.use("/api/v1/books", bookRouter);

// Handling undefined routes
app.all("*", (req:Request, res:Response, next:NextFunction) => {
  

  // const err:any = new Error(`Can't find ${req.originalUrl} on this saver!`)
  // err.status = 'fail'
  // err.statusCode = 404
  next(new AppError(`Can't find ${req.originalUrl} on this saver!`,404))

})

// Global Error Handling
app.use(glogalErrorHandler) 

// (err:any,req:Request,res:Response,next:NextFunction) => {
//   err.statusCode = err.statusCode || 500
//   err.status = err.status || 'error'

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message
//   });
// }
export default app
