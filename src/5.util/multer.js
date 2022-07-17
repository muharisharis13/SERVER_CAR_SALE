const multer = require("multer");

let maxSize = 1 * 1024 * 1024;

let storageFileProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.PATH_UPLOAD_PRODUCT);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

exports.uploadProductImg = multer({
  storage: storageFileProduct,
  limits: maxSize,
});
