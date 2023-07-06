const jwt = require('jsonwebtoken');

const isAuth = (requiredRole) => (req, res, next) => {
  // Get the bearer token from the request headers
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid bearer token' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    // Verify token 
    const payload = jwt.verify(token, 'your-secret-key');

    //  is authorized
     if (requiredRole !== 'any' && payload.role !== requiredRole) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (payload.id !== req.params.id) {
      return res.status(403).json({ error: 'Unauthorized access to user profile' });
    }

    // Pass it to the  middleware 
    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = isAuth;
