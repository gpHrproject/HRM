const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./user');

class PerformanceRating extends Model {}
PerformanceRating.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'performanceRating' }
);

PerformanceRating.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(PerformanceRating, { foreignKey: 'user_id' });

module.exports = PerformanceRating;
