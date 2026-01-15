import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', error);

  if (error.message === 'Invalid credentials') {
    res.status(401).json({ success: false, message: error.message });
    return;
  }

  if (error.message.includes('already exists') || error.message.includes('not found')) {
    res.status(400).json({ success: false, message: error.message });
    return;
  }

  if (error.message.includes('Unauthorized')) {
    res.status(403).json({ success: false, message: error.message });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: error.message }),
  });
};

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
};
