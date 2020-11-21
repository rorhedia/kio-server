const express = require("express");
const router = express.Router();
var passport = require("passport");

router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, resp) => {
    // resp.redirect("http://localhost:4000/");
    try {
      resp.status(201).json({
        status: "success",
        response: {
          user: req.user,
        },
      });
    } catch (error) {
      resp.status(400).json({
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
  res.send(req.user);
});

module.exports = router;
