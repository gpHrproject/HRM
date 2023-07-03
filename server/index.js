const express = require("express");
const sequelize = require('./db/db');
const User = require('./model/user');
const Attendance = require('./model/attendance');
const UserProfile = require('./model/userProfile');
const Blog = require('./model/blog');
const DayOffBooking = require('./model/dayOffBooking');
const PerformanceRating = require('./model/performanceRating');
const Report = require('./model/report');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ force: true }); // Synchronize the models with the database
  })
  .then(() => {
    console.log('Models are synchronized with the database.');
    app.listen(PORT, function () {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
