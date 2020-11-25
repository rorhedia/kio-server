const jwt = require("../lib/jwt");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    jwt.verify(authorization);

    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      response: {
        name: error.name,
        message: error.message,
        path: "",
      },
    });
  }
};

module.exports = { auth };
