require("dotenv").config();

const dbConnect = require("./src/lib/db");
const server = require("./src/server");

const port = process.env.PORT || 3000;

dbConnect()
  .then(() => {
    server.listen(port);
    console.log("DB Connect - Server is listening");
  })
  .catch((err) => {
    console.log(err.message);
  });
