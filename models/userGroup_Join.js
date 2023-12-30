const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const userGroup_db = sequelize.define('userGroup_Join_db', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Usermessage:
  {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Username:
  {
    type: Sequelize.STRING,
    allowNull: false,
  },
  groupname:
  {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = userGroup_db;