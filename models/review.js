const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      ma: 5,
      required: [true, 'Please provide rating'],
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review'],
      maxlength: 500,
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

// user can only leave one review per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);
