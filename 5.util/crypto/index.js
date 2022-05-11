const crypto = require("crypto");

const hashPassword = (data) => {
  return crypto.createHash("md5").update(data).digest("hex");
};

module.exports = {
  hashPassword,
};
