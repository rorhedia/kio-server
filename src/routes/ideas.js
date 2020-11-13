const express = require("express");
const router = express.Router();

// Middlewares
const { formValidation } = require("../middlewares/ideas");

// Routes
router.post("/", formValidation, (req, resp) => {
  try {
    const idea = req.body;

    resp.json({
      status: "success",
      data: idea,
    });
  } catch (error) {
    resp.json({
      status: "error",
      err: error.message,
    });
  }
});

module.exports = router;
