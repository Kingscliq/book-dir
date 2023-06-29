import mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const User = new mongoose.Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

export default User;
