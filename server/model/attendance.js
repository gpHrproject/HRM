const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./user');

class Attendance extends Model {}
Attendance.init(
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'attendance' }
);

Attendance.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Attendance, { foreignKey: 'user_id' });

module.exports = Attendance;
