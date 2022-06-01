const { User } = require("./user");
const { Auth } = require("./auth");
const utils = require("../5.util")


const checkToken = utils.token.checkToken


exports.ApiRoutes = (app) => {
  app.use("/api/v1/user", checkToken,User);
  app.use("/api/v1/auth/user",Auth)
};

