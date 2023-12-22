const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Login_page = sequelize.define('Signup_db', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensures that the username is not an empty string
      len: [1, 255] // Limits the username length between 1 and 255 characters
    }
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false
    // You can add validation for the email as well if needed
  },
  phone_number: {
    type: Sequelize.STRING(20),
    allowNull: false,
    
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false
    // You can add validation for the password as well if needed
  },
});

module.exports = Login_page;

