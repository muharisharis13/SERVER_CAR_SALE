const { STRING } = require("sequelize");
const { db } = require("../4.database");

const ms_bahan_bakar = db.define(
  "ms_bahan_bakar",
  {
    ms_bahan_bakar_name: { type: STRING, allowNull: false },
  },
  {
    timestamp: true,
    freezeTableName: true,
    tableName: "ms_bahan_bakar",
  }
);

module.exports = ms_bahan_bakar;
