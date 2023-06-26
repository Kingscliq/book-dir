// import express, { Request, Response } from 'express';

// const app = express();
// const PORT = 4040;

// app.get('/api', (req: Request, res: Response) => {
//   return res.send('Hello Ekene');
// });

// app.listen(PORT, () => console.log(`Server Started! as ${PORT} `));

import express from 'express'
import morgan from 'morgan'



const app = express();


// Global MIDDLEWARES'
// develepment login
//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// body parser
app.use(express.json({ limit: "10kb" })); 

app.use(express.static(`${__dirname}/public`)); //for serving static files


export default app
