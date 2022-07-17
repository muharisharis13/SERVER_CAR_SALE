const { STRING } = require("sequelize");
const { db } = require("../4.database");

const ms_kategori_inspeksi = db.define(
  "ms_kategori_inspeksi",
  {
    kategori: { type: STRING(255), allowNull: false },
  },
  {
    timestamp: true,
    freezeTableName : true,
    tableName : "ms_kategori_inspeksi"
  }
);

module.exports = ms_kategori_inspeksi;
