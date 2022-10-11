const Review = require('./../models/reviewModel');

exports.getAllReviews = async (req, res) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    data: { reviews },
  });
};

exports.saveReview = async (req, res) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.tour) req.body.tour = req.params.tourId;

  const reviewSaved = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { review: reviewSaved },
  });
};
