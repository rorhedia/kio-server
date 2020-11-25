const express = require("express");
const router = express.Router();

const upload = require("../lib/s3");
const singleUploadImage = upload.single("image");
const singleUploadFile = upload.single("file");
const singleUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);

const {
  createIdea,
  getAllIdeas,
  getIdeasByUser,
  getIdeasById,
  updateStatus,
  deleteIdea,
} = require("../usecases/ideas");

// Middlewares
const { formValidation } = require("../middlewares/ideas");
const { auth } = require("../middlewares/auth");

router.use(auth);

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

router.post("/upload-image", async (req, res) => {
  singleUploadImage(req, res, async (err) => {
    try {
      res.json({
        success: true,
        data: {
          url: req.file.location,
          name: req.file.originalname,
        },
      });
    } catch (error) {
      res.status(400);
      res.json({
        success: false,
        message: error.message,
      });
    }
  });
});

router.post("/upload-file", async (req, res) => {
  singleUploadFile(req, res, async (err) => {
    try {
      res.json({
        success: true,
        data: {
          url: req.file.location,
          name: req.file.originalname,
        },
      });
    } catch (error) {
      res.status(400);
      res.json({
        success: false,
        message: error.message,
      });
    }
  });
});

router.post("/upload", (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) throw err;

    try {
      const image = req.files.image[0].location;
      const imagename = req.files.image[0].originalname;

      const file = req.files.file[0].location;
      const filename = req.files.file[0].originalname;

      res.json({
        success: true,
        data: {
          image: {
            url: image,
            name: imagename,
          },
          file: {
            url: file,
            name: filename,
          },
        },
      });
    } catch (error) {
      res.status(400);
      res.json({
        success: false,
        message: error.message,
      });
    }
  });
});

router.get("/", async (req, resp) => {
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

router.get("/user/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const response = await getIdeasByUser(id);

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

router.get("/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    const response = await getIdeasById(id);

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

router.patch("/:id/update", async (req, resp) => {
  try {
    let data = req.body;
    let id = req.params.id;
    let response = await updateStatus(id, data);

    resp.json({
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

router.patch("/:id/delete", async (req, resp) => {
  try {
    let data = req.body;
    let id = req.params.id;
    let response = await deleteIdea(id, data);

    resp.json({
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
