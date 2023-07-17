import mongoose from 'mongoose';
import Book from "./../models/book.model"
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

// creating indexes so that a USER can only write one review on a book
reviewSchema.index({ book: 1, user: 1 }, { unique: true });
  const Review = mongoose.model('Review', reviewSchema);

  // static function (because we want to calculate the value a field in our schema) and this function is available in the model
// we want to calculate the average rating of a particular tour
reviewSchema.statics.calcAverageRatings = async function (bookId) {
  // console.log(bookId);
  const stats = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: "$book",
        nRating: { $sum: 1 },
        aveRating: { $avg: "$rating" },
      },
    },
  ]);
  // console.log(stats);

  // persisting the results (nRatings and AveRatings) to the required field in the productmodel
  if (stats.length > 0) {
    await Book.findByIdAndUpdate(bookId, {
      numberOfRatings: stats[0].nRating,
      ratingAverage: stats[0].aveRating,
    });
  } else {
    await Book.findByIdAndUpdate(bookId, {
      numberOfRatings: 0,
      ratingAverage: 4.5,
    });
  }
};

// // calling the calcAverageRatins static function
// the calAverageRating function will be called after a new document created is being saved to the database
// reviewSchema.post("save", function () {
//   // this points to the current review
//   this.constructor.calcAverageRatings(this.book); // remeber that book stores the  id of the current book we are writing review for 
// });

// // for deleting and updating review
// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.findOne();
//   console.log(this.r);
//   next();
// });

// // at this point we have gotten the document(book) we want
// // we can now pass to "post" because we want the code below to happen run when we save document in the database
// // we use this.r becasue it is the variable holding the current document(book) and the document(book) contains the id of the current book we want update or delete its review

// reviewSchema.post(/^findOneAnd/, async function () {
//   await this.r.constructor.calcAverageRatings(this.r.book); //this is an async function because this.r above is an async function
// });
export default Review;