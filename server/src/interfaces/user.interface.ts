import { Document } from "mongoose";
export interface IUser extends Document{
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  active:boolean,
  favouriteBooks:[]
}
