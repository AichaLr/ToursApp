/* eslint-disable */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookiePareser = require('cookie-parser');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const viewRouter = require('./routes/viewRoute');
const reviewRouter = require('./routes/reviewRoute');
const bookingRouter = require('./routes/bookingRoute');
const compression = require('compression');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookiePareser());
app.use(compression());
//in the middleware we should always write the next() or we could be stuck and culdnt send a response to the client
// the middleware order in the code is important f its on top its executing on every req but if its after a request it will not be executed  because when caaling a requ(i mean a function like get all) and we get a esponse we actually end the req response cycle
/* app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
}); */

// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.use('/', viewRouter);
module.exports = app;
