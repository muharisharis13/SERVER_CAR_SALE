const fs = require("fs");
const { responseJson } = require("../5.util");

exports.deleteFile = (res, path) => {
  try {
    fs.unlinkSync(path);
  } catch (error) {
    responseJson(res, "Gagal Hapus File Img", 400);
  }
};
