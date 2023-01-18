const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid: missing token');
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid: invalid token');
  }
};

// return callback, because we invoke the authorizePermission functions inside the userRoutes.js.
// So the function lack req,res and next. so we have to return callback
const authorizePermissions = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new CustomError.UnauthenticatedError(
      'Unauthorized to access this route',
    );
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
