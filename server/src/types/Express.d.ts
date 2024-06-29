import 'express';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    session?: {
      user: string | JwtPayload | null;
    };
  }
}
