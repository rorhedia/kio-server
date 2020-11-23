const express = require("express");
const router = express.Router();

const { auth, getAllUsers } = require("../usecases/users");

// Middlewares
// const { authValidation } = require("../middlewares/users");

// Routes
// router.post("/", authValidation, async (req, resp) => {
//   try {
//     const user = req.body;
//     let response = await auth(user);

//     resp.status(201).json({
//       status: "success",
//       response: {
//         id: response,
//       },
//     });
//   } catch (error) {
//     resp.status(400).json({
//       status: "error",
//       response: {
//         name: "ClientError",
//         message: error.message,
//         path: "",
//       },
//     });
//   }
// });

router.get("/", async (req, resp) => {
  try {
    let response = await getAllUsers();

    resp.status(200).json({
      status: "success",
      response,
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
