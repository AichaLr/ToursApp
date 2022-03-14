const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeautures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// its a param  middleware  (the return exit the code if wedont use it the mddleware will send the response but it wll continue the code and execute next())
/*exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};
*/
/*exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};*/

exports.getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    //Execute the query

    const tours = await features.query;
    //one wayy to make filtering

    /*  const tours = await Tour.find({
      duration: 5,
      difficulty: 'easy',
    });
*/
    // console.log(queryObj);
    //second way to make filtering
    //    const tours = await Tour.find(req.query);
    //we did split the query an the tour so we can addd pagination  and other stuff

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.tourState = async (req, res) => {
  try {
    const state = await Tour.aggregate([
      { $match: { ratingAverage: { $gte: 4.5 } } },
      {
        $group: {
          //   _id: null,  we use null when we dont group the results
          _id: '$difficulty',
          num: { $sum: 1 },
          avgRating: { $avg: '$ratingAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
        },
      },
      //we use 1 for ascending
      {
        $sort: {
          avgPrice: 1,
        },
      },
      { $match: { _id: { $ne: 'easy' } } },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        state,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.monthlyPlane = async (req, res) => {
  try {
    const year = req.params.year;
    const plan = await Tour.aggregate([
      { $unwind: '$startDates' },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTour: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        //we gave 0 to every field we dont want to show it
        $project: { _id: 0 },
      },
      {
        $sort: { numTour: -1 },
      },
      {
        $limit: 6,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tourupdated = await Tour.findByIdAndUpdate(req.params.id, req.body, [
      { new: true, runValidators: true },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        tourupdated,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: 'deleted',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
