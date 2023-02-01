const createTokenUser = (user) => ({
  name: user.name,
  // eslint-disable-next-line no-underscore-dangle
  userId: user._id,
  role: user.role,
});

module.exports = createTokenUser;
