const { User } = require("./user");
const { Auth } = require("./auth");


exports.ApiRoutes = (app) => {
  app.use("/api/v1/user",User);
  app.use("/api/v1/auth/user",Auth);
};

