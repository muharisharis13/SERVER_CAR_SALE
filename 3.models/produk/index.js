const sequalize = require('sequelize');
const { db } = require('../../4.database');


const produk = db.define('product', {
    nama_penjual: { type: sequalize.STRING(255), allowNull: false},
    no_hp: { type: sequalize.INTEGER(255), allowNull: false },
    email: { type: sequalize.STRING(255), allowNull: false },
    merek: { type: sequalize.STRING(255), allowNull: false },
    model: { type: sequalize.STRING(255), allowNull: false },
}, {
    timestamps: true
});

exports.produk = produk;
