const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./user');

class DayOffBooking extends Model {}
DayOffBooking.init(
  {
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  { sequelize, modelName: 'dayOffBooking' }
);

DayOffBooking.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(DayOffBooking, { foreignKey: 'user_id' });

module.exports = DayOffBooking;
