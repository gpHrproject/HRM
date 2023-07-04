const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'hr'), 
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;
