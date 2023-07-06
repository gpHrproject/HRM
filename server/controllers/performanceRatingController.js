const PerformanceRating = require('../model/performanceRating');

// Get all performance ratings
exports.getAllPerformanceRatings = async (req, res) => {
  try {
    const performanceRatings = await PerformanceRating.findAll();
    res.json(performanceRatings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get a performance rating by ID
exports.getPerformanceRatingById = async (req, res) => {
  const { id } = req.params;
  try {
    const performanceRating = await PerformanceRating.findByPk(id);
    if (performanceRating) {
      res.json(performanceRating);
    } else {
      res.status(404).json({ error: 'Performance rating not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Create a performance rating
exports.createPerformanceRating = async (req, res) => {
  const { rating, comments, user_id } = req.body;
  try {
    const performanceRating = await PerformanceRating.create({ rating, comments, user_id });
    res.status(201).json(performanceRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update a performance rating
exports.updatePerformanceRating = async (req, res) => {
  const { id } = req.params;
  const { rating, comments, user_id } = req.body;
  try {
    const performanceRating = await PerformanceRating.findByPk(id);
    if (performanceRating) {
      performanceRating.rating = rating;
      performanceRating.comments = comments;
      performanceRating.user_id = user_id;
      await performanceRating.save();
      res.json(performanceRating);
    } else {
      res.status(404).json({ error: 'Performance rating not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a performance rating
exports.deletePerformanceRating = async (req, res) => {
  const { id } = req.params;
  try {
    const performanceRating = await PerformanceRating.findByPk(id);
    if (performanceRating) {
      await performanceRating.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Performance rating not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};
