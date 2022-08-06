const  sequalize = require("sequelize");
const { db } = require("../4.database");

const { INTEGER, DATE, ENUM } = sequalize;

const preBuy = db.define(
    "pre_buy",
    {
      id_produk: { type: INTEGER, allowNull: false },
      id_user: { type: INTEGER, allowNull: false },
      status: {
        type: ENUM("PENDING", "SCHEDULE", "SOLD"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      inspection_date: { type: DATE, allowNull: true },
    },
    {
      timestamps: true,
      freezeTableName : true
    }
  );
  
  module.exports = preBuy;