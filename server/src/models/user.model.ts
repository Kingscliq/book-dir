import mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';

// TODO:
const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    favouriteBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],

  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
