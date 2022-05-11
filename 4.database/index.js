const sequalize = require("sequelize");

exports.db = new sequalize("db_car_sale", "root", "", {
  dialect: "mysql",
  host: "localhost",
});
