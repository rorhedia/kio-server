const express = require("express");
const router = express.Router();
const passport = require("passport");
const { authValidation } = require("../middlewares/users");
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
      req.session.user = req.session._ctx.user;

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
  req.session = null;
  req.logout();
  res.redirect(URLBASE_CLIENT);
});

module.exports = router;
