require("dotenv").config();

const dbConnect = require("./src/lib/db");
const server    = require("./src/server");

dbConnect()
  .then(() => {
    server.listen(process.env.SERVER_PORT);
    console.log("DB Connect - Server is listening");
  })
  .catch((err) => {
    console.log(err.message);
  });
