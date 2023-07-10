import mongoose from 'mongoose';
import { IReview } from './../interfaces/review.interface';
const reviewSchema = new mongoose.Schema<IReview>(
    {
      comment: {
        type: String,
        required: [true, "Review can not be empty"],
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
  
      //   parent referencing
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Review must belong to a book."],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Review must belong to a user."],
      },
    },
    { timestamps: true },
    
  );

  const Review = mongoose.model('Review', reviewSchema);
export default Review;