const sequalize = require("sequelize");
const { db } = require("../4.database");

const { STRING, INTEGER, DATE, ENUM } = sequalize;

const preSales = db.define(
  "pre_sales",
  {
    merek: { type: STRING, allowNull: false },
    model: { type: STRING, allowNull: false },
    name: { type: STRING, allowNull: false },
    tel: { type: STRING, allowNull: false },
    email: { type: STRING, allowNull: false },
    id_user: { type: INTEGER, allowNull: false },
    status: {
      type: ENUM("PENDING", "SCHEDULE", "APPROVE", "DONE"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    inspection_date: { type: DATE, allowNull: true },
  },
  {
    timestamps: true,
  }
);

module.exports = preSales;
