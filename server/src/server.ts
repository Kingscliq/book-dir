import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv'
import app from './app'

dotenv.config({ path: "./config.env" }); 

const DB = process.env.DATABASE!.replace(
    "<password>",
    process.env.DATABASE_PASSWORD!
  );
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then((con) => {
      console.log("Db connection successful");
    });

const port = 4000;
const server = app.listen(port, () => {
  console.log(`App running in port ${port}...`);
});


