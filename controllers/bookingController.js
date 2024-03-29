const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const Factory = require('./handlerFactory');

exports.getCheckoutSession = async (req, res, next) => {
  //1 get the tour
  const tour = await Tour.findById(req.params.id);
  //2create checkout session
  /*  console.log(stripe);
  console.log(stripe.checkout); */

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: ` ${req.protocol}://${req.get('host')}/login`,
    success_url: `http://localhost:3000?tour=${req.params.id}&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });
  //3 send it to the client
  res.status(200).json({
    status: 'success',
    session,
  });
};

exports.createCheckout = async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) {
    return next();
  }
  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
};

exports.saveBooking = Factory.createOne(Booking);
exports.getBooking = Factory.getOne(Booking);
exports.updateBooking = Factory.updateOne(Booking);
exports.deleteBooking = Factory.deleteOne(Booking);
exports.getAllBookings = Factory.getAll(Booking);
