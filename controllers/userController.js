const User = require('./../models/userModel');
const filtred = (obj, ...allowedFields) => {
  obje = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) obje[el] = obj[el];
  });
  return obje;
};
exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: { users },
  });
};
exports.getUser = (req, res) => {
  const user = User.findById(req.user.id);
  res.status(200).json({
    status: 'success',
    data: user,
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteMe = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};
exports.updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    throw new Error('the wrong way to update password !');

  const filtredBody = filtred(req.body, 'name', 'email');
  //we could use it because we arent updating sensetive data like password
  const user = await User.findByIdAndUpdate(req.user.id, filtredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};
