const Review = require('./../models/reviewModel');

exports.getAllReviews = async (req, res) => {
  console.log('heelooo from reviews');
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    data: { reviews },
  });
};

exports.saveReview = async (req, res) => {
  const reviewSaved = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { review: reviewSaved },
  });
};
