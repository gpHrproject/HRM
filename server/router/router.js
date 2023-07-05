const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');
const BlogController = require('../controllers/blogController');
const ReportController = require('../controllers/reportController');
const DayOffBookingController = require('../controllers/dayOffBookingController');
const AttendanceController = require('../controllers/attendanceController');
const PerformanceRatingController = require('../controllers/performanceRatingController');
const UserProfileController = require('../controllers/userProfileController');
// User routes
router.get('/users', UserController.getAllUsers);
 router.get('/users/:id', UserController.getUserById);
 router.post('/users', UserController.createUser);
 router.put('/users/:id', UserController.updateUser);
 router.delete('/users/:id', UserController.deleteUser);

 router.post('/register',UserController.register)
 router.post('/login',UserController.login)
// User profile routes
 router.get('/users/:id/profile', UserProfileController.getUserProfile);
 router.put('/users/:id/profile', UserProfileController.updateUserProfile);

// // Blog routes
// router.get('/blogs', BlogController.getAllBlogs);
// router.get('/blogs/:id', BlogController.getBlogById);
// router.post('/blogs', BlogController.createBlog);
// router.put('/blogs/:id', BlogController.updateBlog);
// router.delete('/blogs/:id', BlogController.deleteBlog);

// // Report routes
// router.get('/reports', ReportController.getAllReports);
// router.get('/reports/:id', ReportController.getReportById);
// router.post('/reports', ReportController.createReport);
// router.put('/reports/:id', ReportController.updateReport);
// router.delete('/reports/:id', ReportController.deleteReport);

// // Day Off Booking routes
// router.get('/day-off-bookings', DayOffBookingController.getAllDayOffBookings);
// router.get('/day-off-bookings/:id', DayOffBookingController.getDayOffBookingById);
// router.post('/day-off-bookings', DayOffBookingController.createDayOffBooking);
// router.put('/day-off-bookings/:id', DayOffBookingController.updateDayOffBooking);
// router.delete('/day-off-bookings/:id', DayOffBookingController.deleteDayOffBooking);

// // Attendance routes
// router.get('/attendances', AttendanceController.getAllAttendances);
// router.get('/attendances/:id', AttendanceController.getAttendanceById);
// router.post('/attendances', AttendanceController.markAttendance);
// router.put('/attendances/:id', AttendanceController.updateAttendance);
// router.delete('/attendances/:id', AttendanceController.deleteAttendance);

// // Performance Rating routes
// router.get('/performance-ratings', PerformanceRatingController.getAllPerformanceRatings);
// router.get('/performance-ratings/:id', PerformanceRatingController.getPerformanceRatingById);
// router.post('/performance-ratings', PerformanceRatingController.createPerformanceRating);
// router.put('/performance-ratings/:id', PerformanceRatingController.updatePerformanceRating);
// router.delete('/performance-ratings/:id', PerformanceRatingController.deletePerformanceRating);

module.exports = router;
