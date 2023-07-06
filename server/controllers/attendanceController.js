const Attendance = require('../model/attendance');

// Get all attendances
exports.getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll();
    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get an attendance by ID
exports.getAttendanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findByPk(id);
    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ error: 'Attendance not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Mark attendance
exports.markAttendance = async (req, res) => {
  const { date, status, user_id } = req.body;
  try {
    const attendance = await Attendance.create({ date, status, user_id });
    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update an attendance
exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { date, status, user_id } = req.body;
  try {
    const attendance = await Attendance.findByPk(id);
    if (attendance) {
      attendance.date = date;
      attendance.status = status;
      attendance.user_id = user_id;
      await attendance.save();
      res.json(attendance);
    } else {
      res.status(404).json({ error: 'Attendance not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete an attendance
exports.deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findByPk(id);
    if (attendance) {
      await attendance.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Attendance not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};
