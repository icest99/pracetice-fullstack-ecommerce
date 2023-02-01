const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) => {
  //   console.log(requestUser);
  //   console.log(resourceUserId);
  //   console.log(typeof resourceUserId);
  if (
    requestUser.role === 'admin' ||
    requestUser.userId === resourceUserId.toString()
  )
    return; // if role is admin, proceeds to next function

  throw new CustomError.UnauthenticatedError(
    'Not authorized to access this route'
  );
};

module.exports = {
  checkPermissions,
};
