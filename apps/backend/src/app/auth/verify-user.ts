import jwt from 'jsonwebtoken';
import { env } from 'process';

const verifyUser = (req, res, next) => {
  // checks if its initial verify or verify after user action
  if (req.originalUrl.includes('/ping')) {
    const token = req.cookies.token;
    if (!token) return next();
    const user = extractUserFromToken(token);
    req.user = user;
    next();
  } else {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
      }

      const user = extractUserFromToken(token);
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = user;
    } catch (err) {
      console.error('Error during verifying user:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
    next();
  }
};

const extractUserFromToken = (token: string) => {
  try {
    // Decode and extract user data from payload
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      userName: string;
      userEmail: string;
    };

    return {
      userId: decoded.userId,
      userName: decoded.userName,
      userEmail: decoded.userEmail,
    };
  } catch {
    return null;
  }
};

export default verifyUser;
