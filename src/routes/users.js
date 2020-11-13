const express = require("express");
const router = express.Router();

const { auth } = require("../usecases/users");

// Middlewares
const { authValidation } = require("../middlewares/users");

// Routes
router.post("/", authValidation, async (req, resp) => {
  try {
    const user = req.body;
    let result = await auth(user);

    resp.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    resp.json({
      status: "error",
      err: error.message,
    });
  }
});

module.exports = router;
