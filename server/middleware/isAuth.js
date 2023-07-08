const jwt = require('jsonwebtoken');

const isAuth = (requiredRole) => (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid bearer token' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    const payload = jwt.verify(token, 'your-secret-key');

    // Check the role
    if (requiredRole !== 'any' && payload.role !== requiredRole) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Convert req.params.id to a number
    const profileId = parseInt(req.params.id);

    // Allow access to user's own profile for all roles
    if (payload.userId === profileId) {
      req.user = payload;
      return next();
    }

    // Allow HR role to access any user's profile
    if (payload.role === 'hr') {
      req.user = payload;
      return next();
    }

    return res.status(403).json({ error: 'Unauthorized access to user profile' });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = isAuth;
