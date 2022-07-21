const { user } = require("./user");
const produk = require("./produk");
const preSales = require("./preSales");
const status = require("./status");
const ms_jenis_kendaraan = require("./ms_jenis_kendaraan");
const ms_merek = require("./ms_merek");
const ms_kategori_inspeksi = require("./ms_kategori_inspeksi");
const ms_inspeksi = require("./ms_inspeksi");
const produk_inspeksi = require("./produk.inspkesi");
const produk_image = require("./produk.image");

module.exports = {
  user,
  produk,
  preSales,
  status,
  ms_jenis_kendaraan,
  ms_merek,
  ms_kategori_inspeksi,
  ms_inspeksi,
  produk_inspeksi,
  produk_image,
};
