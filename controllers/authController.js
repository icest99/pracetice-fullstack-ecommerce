const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');
const CustomError = require('../errors');

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  const isFirstAccount = await User.countDocuments({}) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({
    name, email, password, role,
  });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send('Login User');
};

const logout = async (req, res) => {
  res.send('Logout User');
};

module.exports = {
  register, login, logout,
};
