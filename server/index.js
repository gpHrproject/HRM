const express = require("express");
const sequelize = require('./db/db');
const route = require('./router/router');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const User = require('./model/user');
const Attendance = require('./model/attendance');
const UserProfile = require('./model/userProfile');
const Blog = require('./model/blog');
const DayOffBooking = require('./model/dayOffBooking');
const PerformanceRating = require('./model/performanceRating');
const Report = require('./model/report');
// const isAuth = require("./middleware/isAuth");


app.use(express.json());
app.use(cors());
// app.use(isAuth('hr'));
app.use(route);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ force: false}); // Change this to "true" when You need to drop and change Tables (auto change)
  })//Keep it False if you are testing
  .then(() => {
    console.log('Models are synchronized with the database.');
    app.listen(PORT, function () {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
