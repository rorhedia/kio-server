const mongoose = require("mongoose");

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

module.exports = () =>
  mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
