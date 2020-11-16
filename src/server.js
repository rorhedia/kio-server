const express = require("express");
const app     = express();
const cors    = require("cors");

const userRouter  = require("./routes/users");
const ideasRouter = require("./routes/ideas");
const coachesRouter = require("./routes/coaches");

app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/ideas", ideasRouter);
app.use("/coaches", coachesRouter);

/**
 * Test
 */
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

module.exports = app;
