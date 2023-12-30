const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const GroupDetails_db = sequelize.define('GroupDetails_db', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  groupName: {
    type: Sequelize.STRING,
    allowNull: false,

   
  },
  memberName: {
    type: Sequelize.TEXT, // or Sequelize.JSON
    allowNull: false,
    get: function () {
      // Parse the JSON string to return an array
      return JSON.parse(this.getDataValue('memberName'));
    },
    set: function (value) {
      // Convert the array to a JSON string before saving
      this.setDataValue('memberName', JSON.stringify(value));
    },
},
adminUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: false,
    
}
});




module.exports = GroupDetails_db;