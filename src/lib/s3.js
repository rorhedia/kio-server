const AWS      = require("aws-sdk");
const multer   = require("multer");
const multerS3 = require("multer-s3");

const {
  AWS_ACCES_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
} = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCES_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

const s3Config = new AWS.S3({
  accessKeyId: AWS_ACCES_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
  bucket: AWS_BUCKET_NAME,
});

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: AWS_BUCKET_NAME,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: multerS3Config,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = upload;
