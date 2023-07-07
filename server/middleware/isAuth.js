const jwt = require('jsonwebtoken');

const isAuth = (requiredRole) => (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid bearer token' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    const payload = jwt.verify(token, 'your-secret-key');

    // Check  role 
    if (requiredRole !== 'any' && payload.role !== requiredRole) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Check user ID from the token 
    if (payload.id !== req.params.id) {
      return res.status(403).json({ error: 'Unauthorized access to user profile' });
    }

    // Pass the payload to the next middleware
    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = isAuth;
