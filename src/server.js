const express = require("express");
const app = express();
const cors = require("cors");

const userRouter = require("./routes/users");

app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRouter);

/**
 * Testt
 */
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

module.exports = app;
