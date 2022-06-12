const sequalize = require("sequelize");
const { db } = require("../4.database");

const status = db.define(
  "status",
  {
    status: { type: sequalize.STRING(100), allowNull: false },
  },
  {
    timestamps: false,
    freezeTableName : true,
    tableName:'status'
  }
);

module.exports = status;
