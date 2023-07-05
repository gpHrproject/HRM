const DayOffBooking = require("../model/dayOffBooking.js");

const DayOffBookingController = {
  async createDayOffBooking(req, res) {
    const { start_date, end_date, status,user_id } = req.body;
    try {
      const dayOffBooking = await DayOffBooking.create({start_date, end_date, status,user_id });
      res.status(200).json({ message: 'Day off booking created successfully', data: dayOffBooking });
    } catch (error) {
      console.error('Error creating day off booking:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAllDayOffBookings(req, res) {
    try {
      const dayOffBookings = await DayOffBooking.findAll();
      res.status(200).json({ data: dayOffBookings });
    } catch (error) {
      console.error('Error retrieving day off bookings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  async getDayOffBookingById(req, res) {
    const { id } = req.params;
    try {
      const dayOffBooking = await DayOffBooking.findByPk(id);
      if (!dayOffBooking) {
        return res.status(404).json({ error: 'Day off booking not found' });
      }
      res.status(200).json({ data: dayOffBooking });
    } catch (error) {
      console.error('Error retrieving day off booking:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  async updateDayOffBooking(req, res) {
    const { id } = req.params;
    const { start_date, end_date, status } = req.body;
    try {
      const dayOffBooking = await DayOffBooking.findByPk(id);
      if (!dayOffBooking) {
        return res.status(404).json({ error: 'Day off booking not found' });
      }
      dayOffBooking.start_date = start_date;
      dayOffBooking.end_date = end_date;
      dayOffBooking.status = status;
      await dayOffBooking.save();
      res.status(200).json({ message: 'Day off booking updated successfully', data: dayOffBooking });
    } catch (error) {
      console.error('Error updating day off booking:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  async deleteDayOffBooking(req, res) {
    const { id } = req.params;
    try {
      const dayOffBooking = await DayOffBooking.findByPk(id);
      if (!dayOffBooking) {
        return res.status(404).json({ error: 'Day off booking not found' });
      }
      await dayOffBooking.destroy();
      res.status(200).json({ message: 'Day off booking deleted successfully' });
    } catch (error) {
      console.error('Error deleting day off booking:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = DayOffBookingController;
