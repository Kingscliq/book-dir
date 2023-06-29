import express from 'express'
import morgan from 'morgan'

import bookRouter from "./routes/bookRoute"

const app = express();

// Global MIDDLEWARES'
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body parser
app.use(express.json()); 

app.use(express.static(`${__dirname}/public`)); //for serving static files

app.use("/api/v1/books", bookRouter);


export default app
