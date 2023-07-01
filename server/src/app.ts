import express, { response } from 'express';
import { Request, Response, NextFunction } from 'express';

import morgan from 'morgan';

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

app.all("*", (req:Request, res:Response, next:NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message:`Can't find ${req.originalUrl} on this saver`
  });
})


export default app
