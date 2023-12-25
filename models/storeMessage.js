const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const StoreMessage_page = sequelize.define('StoreMessage_db', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
   
  },
  Username:{
    type:Sequelize.STRING,
    allowNull:false,
  }
});

module.exports = StoreMessage_page;