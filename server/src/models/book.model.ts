import mongoose from 'mongoose';
import { IBook } from './../interfaces/book.interface';

const bookSchema = new mongoose.Schema<IBook>(
  {
    name: {
      type: String,
      required: [true, 'A book must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A book name must have less or equal to 40 characters'],
      minlength: [10, 'A book name must have more or equal to 10 characters'],
    },
    authors: [String],
    ISBN: {
      type: String,
      required: [true, 'A book must have a unique  ISBN number '],
      unique: true,
    },
    summary: {
      type: String,
      required: [true, "A book must contain the summary of it's content"],
    },
    genre: {
      type: String,
      required: [true, 'A book must have a genre'],
      enum: {
        values: ['poetry', 'drama', 'prose'],
        message: 'genre is either poetry,drama or prose',
      },
    },
    tags: {
      type: String,
      required: [true, 'A book must have a tag'],
      enum: {
        values: [
          'sorrow',
          'regret',
          'pain',
          'comedy',
          'tragedy',
          'tragedy-comedy',
        ],
        message:
          'genre is either sorrow, regret, pain, comedy, tragedy.tragedy-comedy',
      },
    },
    image: {
      type: String,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val: number) => Math.round(val * 10) / 10, //4.6666,4.666,47,4.7
    },
  },
  { timestamps: true },
);

const Book = mongoose.model('Book', bookSchema);
export default Book;
