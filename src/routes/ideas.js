const express = require("express");
const router = express.Router();

const { createIdea, getAllIdeas, getIdeasById } = require("../usecases/ideas");

// Middlewares
const { formValidation, auth } = require("../middlewares/ideas");

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

router.get("/", auth, async (req, resp) => {
  try {
    const response = await getAllIdeas();

    resp.json({
      status: "success",
      response: {
        data: response,
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

router.get("/:id", auth, async (req, resp) => {
  try {
    const { id } = req.params;
    const response = await getIdeasById(id);

    resp.json({
      status: "success",
      response: {
        id: response,
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
