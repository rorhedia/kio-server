const User = require("../models/users");
const jwt = require("../lib/jwt");

const auth = async (user) => {
  const { email } = user;

  let result = await User.findOne({ email }).exec();

  if (!!result === false) {
    result = await User.create(user);
  }

  let jsonwebtoken = jwt.sign({ id: result._id });

  return {
    ...user,
    jsonwebtoken,
  };
};

module.exports = {
  auth,
};
