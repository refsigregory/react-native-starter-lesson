import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

// Custom morgan token for response time
morgan.token('response-time-ms', (_req: Request, res: Response) => {
  const responseTime = res.getHeader('X-Response-Time');
  return responseTime ? `${responseTime}ms` : '-';
});

// Request logging middleware
export const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    skip: (req: Request) => req.url === '/health',
  }
);

// Response time middleware
export const responseTime = (_req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Store the original res.end function
  const originalEnd = res.end.bind(res);

  // Override res.end to calculate response time before sending
  res.end = function(chunk?: any, encoding?: any, callback?: any) {
    const duration = Date.now() - start;
    res.setHeader('X-Response-Time', duration);
    return originalEnd(chunk, encoding, callback);
  } as any;

  next();
};
