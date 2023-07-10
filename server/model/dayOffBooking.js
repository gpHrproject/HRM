const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./user');

class DayOffBooking extends Model {}

DayOffBooking.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
     
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
  },
  { sequelize, modelName: 'DayOffBooking' }
);

DayOffBooking.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(DayOffBooking, { foreignKey: 'user_id' });

module.exports = DayOffBooking;
