const express = require("express");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const ideasRouter = require("./routes/ideas");
const coachesRouter = require("./routes/coaches");

const { COOKIE_KEY } = process.env;

app.use(cors());
app.use(express.json());

app.use(
  cookieSession({
    // milliseconds of a day
    maxAge: 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/ideas", ideasRouter);
app.use("/coaches", coachesRouter);
// 
/**
 * Test
 */
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

module.exports = app;
