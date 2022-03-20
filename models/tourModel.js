const slugify = require('slugify');
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour  must have a duration'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'A tour  must have a description'],
    },
    secretTour: {
      type: Boolean,
      default: false,
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
      select: false,
    },
    startDates: [Date],
  }, //thats mean when we output the result as object or as json the virtuals will show
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//we use a regular function here (not an arrown one because we need to use this keyword which is not available in arrow functions)
//virtual attributes are not persisted in the database
tourSchema.virtual('durationPerWeek').get(function () {
  return this.duration / 7;
});

//middleware(hooks) for mongoose document middleware which is called pre save hook or pre save middleware whic is exucted
//its exucted before the object is saved to the database and it will only work for create and save

tourSchema.pre('save', function (next) {
  //this here it refer to the object that we are saving
  this.slug = slugify(this.name, { lower: true });
  //if we dont call the next we will be stuck here
  next();
});
tourSchema.pre('save', function (next) {
  console.log('we are saving ......');
  //if we dont call the next we will be stuck here
  next();
});
//the post midlleware mean the after middleware will have access not only to the next parameter but also to the finished saved doc
tourSchema.post('save', function (doc, next) {
  const document = doc.slug;
  console.log(document);
  //if we dont call the next we will be stuck here
  next();
});

//here is a query middleware which will get us just the items that are not secret
tourSchema.pre('find', function (next) {
  this.find({ secretTour: { $ne: true } });

  //if we dont call the next we will be stuck here
  next();
});

//we are using a regular expression to execute this middleware for all the methodes that begin with find
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  //if we dont call the next we will be stuck here
  next();
});
tourSchema.post(/^find/, function (docs, next) {
  console.log(`the query take .. ${Date.now() - this.start} milliseconds`);
  console.log(docs);
  //if we dont call the next we will be stuck here
  next();
});
//fat models thin controller talk !!(mean upload models as much as possible of bussiness logic and less for the controller)
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
//schema object canhave another attribute which is in this case objects of options
