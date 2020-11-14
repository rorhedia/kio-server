const express = require("express");
const router = express.Router();

const { createIdea } = require("../usecases/ideas");

// Middlewares
const { formValidation } = require("../middlewares/ideas");

// Routes
router.post("/", formValidation, async (req, resp) => {
  try {
    const idea = req.body;
    const response = await createIdea(idea);

    resp.status(201).json({
      status: "success",
      response: {
        id: response.id,
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
});

module.exports = router;
