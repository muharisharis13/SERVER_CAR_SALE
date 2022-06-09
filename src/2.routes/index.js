const { User } = require("./user");
const Admin = require("./admin");

exports.ApiRoutes = (app) => {
  app.use("/api/v1/user", User);
  app.use("/api/v1/admin", Admin);
  // app.use("/api/v1/user/auth", Auth);
};
