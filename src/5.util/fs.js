const fs = require("fs");
const { responseJson } = require("../5.util");

exports.deleteFile = (res, path) => {
  try {
    fs.unlinkSync(path);
  } catch (error) {
    responseJson(res, "Gagal Hapus File Img", 500);
  }
};

exports.existingFiles = (res, path) => {
  try {
    return fs.existsSync(path);
  } catch (error) {
    responseJson(res, "Error Internal !", 500);
  }
  return;
};
