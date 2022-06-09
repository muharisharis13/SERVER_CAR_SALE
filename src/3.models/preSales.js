const sequalize = require("sequelize");
const { db } = require("../4.database");

const { STRING, INTEGER } = sequalize;

const preSales = db.define(
  "pre_sales",
  {
    merek: { type: STRING, allowNull: false },
    model: { type: STRING, allowNull: false },
    name: { type: STRING, allowNull: false },
    tel: { type: STRING, allowNull: false },
    email: { type: STRING, allowNull: false },
    id_user: { type: INTEGER, allowNull: false },
    status: { type: STRING, allowNull: false, defaultValue: "PENDING" },
  },
  {
    timestamps: true,
  }
);

module.exports = preSales;
