import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Middleware to protect routes by verifying JWT
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token and decode user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request, excluding password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found. Authorization denied.' });
      }

      next();
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return res.status(401).json({ message: 'Invalid token. Authorization denied.' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided. Authorization denied.' });
  }
};

// Middleware for role-based access control
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Role '${req.user?.role || 'unknown'}' is not authorized.`,
      });
    }
    next();
  };
};
