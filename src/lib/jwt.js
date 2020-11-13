const jwt            = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const sign = (payload = {}) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

const verify = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  ...jwt,
  sign,
  verify,
};
