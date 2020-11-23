const express = require("express");
const router = express.Router();
var passport = require("passport");

const { URLBASE_CLIENT } = process.env;

router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    try {
      res.redirect(`${URLBASE_CLIENT}/ideas`);
    } catch (error) {
      res.status(400).json({
        status: "error",
        response: {
          name: "ClientError",
          message: error.message,
          path: "",
        },
      });
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(URLBASE_CLIENT);
});

module.exports = router;
