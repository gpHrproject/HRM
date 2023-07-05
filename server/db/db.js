const Sequelize = require('sequelize');

const sequelize = new Sequelize('hrm', 'root', 'yacine251203**', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  sync:false,
});

sequelize.query("CREATE DATABASE IF NOT EXISTS `hrm`;") // Create the database if it doesn't exist
  .then(() => {
  })
  .catch((error) => {
    console.error('Unable to create the database:', error);
    sequelize.close(); // Close the connection in case of an error
  });

module.exports = sequelize;
