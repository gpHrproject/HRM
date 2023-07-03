const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./user');

class Report extends Model {}
Report.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    submitted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    answered_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    answer_content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'report' }
);

Report.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Report, { foreignKey: 'user_id' });

module.exports = Report;
