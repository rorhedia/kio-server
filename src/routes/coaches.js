const express = require("express");
const router = express.Router();

const { createCoach, getCoaches } = require("../usecases/coaches");

// Middlewares
const { formValidation } = require("../middlewares/coaches");
const { auth } = require("../middlewares/auth");

router.use(auth);

// Routes
router.post("/", formValidation, async (req, resp) => {
  try {
    const coach = req.body;
    const response = await createCoach(coach);

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

router.get("/", async (req, resp) => {
  try {
    const coaches = await getCoaches();

    resp.status(201).json({
      status: "success",
      response: {
        coaches,
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
