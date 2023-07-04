const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./user');

class UserProfile extends Model {}
UserProfile.init(
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'userProfile' }
);

UserProfile.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(UserProfile, { foreignKey: 'user_id' });

module.exports = UserProfile;
