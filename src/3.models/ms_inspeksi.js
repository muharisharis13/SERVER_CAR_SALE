const { INTEGER } = require("sequelize");
const { STRING } = require("sequelize");
const { db } = require("../4.database");

const ms_inspeksi = db.define(
  "ms_kategori_inspeksi",
  {
    nama_inspeksi: { type: STRING(255), allowNull: false },
    id_kategori: { type: INTEGER, allowNull: false },
  },
  {
    timestamp: true,
    freezeTableName : true,
    tableName : "ms_inspeksi"
  }
);

module.exports = ms_inspeksi;
