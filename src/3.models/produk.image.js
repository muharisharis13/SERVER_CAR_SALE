const { STRING, INTEGER } = require("sequelize");
const { db } = require("../4.database");

const produk_image = db.define(
  "produk_image",
  {
    id_produk: { type: INTEGER, allowNull: false },
    image_produk: { type: STRING, allowNull: false },
  },
  {
    timestamp: true,
    freezeTableName: true,
    tableName: "produk_image",
  }
);

module.exports = produk_image;
