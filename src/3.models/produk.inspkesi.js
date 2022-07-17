const { INTEGER, STRING, ENUM } = require("sequelize");
const { db } = require("../4.database");

const produk_inspeksi = db.define(
  "produk_inspeksi",
  {
    id_inspeksi: { type: INTEGER, allowNull: false },
    id_produk: {
      type: INTEGER,
      allowNull: false,
      references: "products", // table name / models
      referencesKey: "id", // id column from primary key models
    },
    status: {
      type: ENUM("1", "0"),
      allowNull: false,
      defaultValue: "1",
    },
    image: { type: STRING(255), allowNull: true },
  },
  {
    timestamp: true,
    freezeTableName: true,
    tableName: "produk_inspeksi",
  }
);

module.exports = produk_inspeksi;
