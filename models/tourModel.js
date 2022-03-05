const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
  },
  duration: {
    type: Number,
    required: [true, 'A tour  must have a duration'],
  },

  description: {
    type: String,
    required: [true, 'A tour  must have a description'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour  must have a maxsize'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour  must have a difficulty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 4.5,
  },
  price: { type: Number, required: [true, 'A tour must have a price'] },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, //remove all the whie space in the beginning and the endof the string
  },
  imageCover: {
    type: String,
    required: [true, 'A tour  must have an image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
