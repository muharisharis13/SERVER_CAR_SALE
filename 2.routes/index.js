const { User } = require("./user");

exports.ApiRoutes = (app) => {
  app.use("/api/v1/user", User);
};
