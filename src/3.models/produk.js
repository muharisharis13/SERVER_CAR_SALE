const sequalize = require("sequelize");
const { db } = require("../4.database");

const produk = db.define(
  "product",
  {
    img_produk: { type: sequalize.STRING(255), allowNull: true },
    nama_penjual: { type: sequalize.STRING(255), allowNull: false },
    no_hp: { type: sequalize.INTEGER(255), allowNull: false },
    email: { type: sequalize.STRING(255), allowNull: false },
    merek: { type: sequalize.STRING(255), allowNull: false },
    model: { type: sequalize.STRING(255), allowNull: false },
    jenis_kendaraan: { type: sequalize.STRING(20), allowNull: false },
    bahan_bakar: { type: sequalize.STRING(20), allowNull: false },
    tahun: { type: sequalize.INTEGER(10), allowNull: false },
    tampil: {
      type: sequalize.ENUM("1", "0"),
      allowNull: false,
      defaultValue: "0",
    },
    harga: { type: sequalize.INTEGER(50), allowNull: false },
    status: { type: sequalize.ENUM("SELLING", "SOLD"), allowNull: false },
  },
  {
    timestamps: true,
  }
);

module.exports = produk;
