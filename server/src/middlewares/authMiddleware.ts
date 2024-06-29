import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface SessionData {
  user: string | jwt.JwtPayload | null;
}

declare module 'express-serve-static-core' {
  interface Request {
    session?: SessionData;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (token) {
    try {
      const data = jwt.verify(token, process.env.TOKEN as string);
      req.session.user = data;
    } catch (error) {
      req.session.user = null;
      console.error('Error verifying token:', error);
    }
  }

  next();
};

export default authMiddleware;
