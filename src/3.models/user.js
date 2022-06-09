const sequalize = include("sequelize");
const { db } = include("/src/4.database");

const user = db.define(
  "user",
  {
    email: { type: sequalize.STRING(100), allowNull: false, unique: true },
    password: { type: sequalize.STRING, allowNull: false },
    tel: { type: sequalize.INTEGER(15), allowNull: false },
    name: { type: sequalize.STRING(100), allowNull: false },
    role: { type: sequalize.STRING(100), allowNull: false },
  },
  {
    timestamps: true,
  }
);

exports.user = user;
