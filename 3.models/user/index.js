const sequalize = require('sequelize');
const { db } = require('../../4.database');


exports.user = db.define('user', {
  email : {type: sequalize.STRING(100), allowNull:false,unique:true},
  password : {type: sequalize.STRING, allowNull:false},
  tel :{type: sequalize.NUMBER(15),allowNull:false},
  name : {type : sequalize.STRING(100),allowNull:false},
  role : {type: sequalize.STRING, allowNull:false},
},{
  timestamps : true
})
