const { STRING } = require("sequelize");
const { db } = require("../4.database");

const ms_merek = db.define(
  "ms_merek",
  {
    name: { type: STRING(255), allowNull: false },
  },
  {
    timestamp: true,
  }
);

module.exports = ms_merek;
