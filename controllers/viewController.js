const Tour = require('../models/tourModel');
const User = require('../models/userModel');

exports.getOverview = async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  console.log(tours.length);
  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
};

exports.getTour = async (req, res) => {
  // 1) Get tour data from collection
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  res.status(200).render('tour', {
    title: 'Tour Details',
    tour,
  });
};
