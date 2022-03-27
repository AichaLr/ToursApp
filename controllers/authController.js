const crypto = require('crypto');
const { promisify } = require('util');
const User = require('./../models/userModel');

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  res.status(200).json({
    status: 'success',
    data: {
      newUser,
    },
  });
  //  createSendToken(newUser, 201, res);
};
