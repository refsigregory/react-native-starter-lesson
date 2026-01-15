import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { UserRole, AuthTokenPayload } from '../types';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

const authService = new AuthService();

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'No token provided' });
      return;
    }

    const token = authHeader.substring(7);
    const payload = authService.verifyToken(token);

    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== UserRole.ADMIN) {
    res.status(403).json({ success: false, message: 'Admin access required' });
    return;
  }
  next();
};

export const authorizeEmployee = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== UserRole.EMPLOYEE) {
    res.status(403).json({ success: false, message: 'Employee access required' });
    return;
  }
  next();
};
