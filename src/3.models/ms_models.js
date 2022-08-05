const { STRING } = require("sequelize");
const { db } = require("../4.database");

const ms_models = db.define(
  "ms_models",
  {
    ms_models_name: { type: STRING, allowNull: false },
  },
  {
    timestamp: true,
    freezeTableName: true,
    tableName: "ms_models",
  }
);

module.exports = ms_models;
