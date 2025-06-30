import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
  id: number;
}
export const authenticateToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    response.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    request.userId = payload.id;
    next();
  } catch (err) {
    response.status(403).json({ message: 'Invalid token' });
    return;
  }
};
