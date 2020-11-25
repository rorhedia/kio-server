const User = require("../models/users");
const jwt = require("../lib/jwt");

const auth = async (user) => {
  const { email } = user;

  let result = await User.findOne({ email }).exec();

  if (!!result === false) {
    result = await User.create(user);
  }

  let jsonwebtoken = jwt.sign({ id: result._id });
  let id = result._id;

  return {
    ...user,
    id,
    jsonwebtoken,
  };
};

const getUserById = async (id) => await User.findById({ _id: id }).exec();

const getAllUsers = async () => await User.find().exec();

module.exports = {
  auth,
  getUserById,
  getAllUsers,
};
