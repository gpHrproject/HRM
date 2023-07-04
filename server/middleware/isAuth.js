// Check role
const isAuth = (role) => (req, res, next) => {
    
    if (!req.user || req.user.role !== role) {
      console.log('Unauthorized');
      return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
  };
  
module.exports = isAuth;
  