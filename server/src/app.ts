import express from 'express';
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


export default app
