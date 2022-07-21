const multer = require("multer");

let maxSize = 1 * 1024 * 1024;

let storageFile = (path) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });
};

exports.uploadProductImg = multer({
  storage: storageFile(process.env.PATH_UPLOAD_PRODUCT),
  limits: maxSize,
});
