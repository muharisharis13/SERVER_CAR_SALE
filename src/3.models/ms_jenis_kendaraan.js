const { STRING } = require("sequelize");
const { db } = require("../4.database");

const ms_jenis_kendaraan = db.define("ms_jenis_kendaraan", {
  name: { type: STRING(255), allowNull: false },
});

module.exports = ms_jenis_kendaraan;
