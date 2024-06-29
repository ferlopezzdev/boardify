import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define la interfaz para los datos de la sesión
interface SessionData {
  user: string | jwt.JwtPayload | null;
}

// Extiende el objeto Request de Express para incluir la propiedad session
declare module 'express-serve-static-core' {
  interface Request {
    session?: SessionData;
  }
}

// Middleware de autenticación
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (token) {
    try {
      // Verifica el token y obtiene los datos
      const data = jwt.verify(token, process.env.TOKEN as string);

      // Asigna los datos verificados a la sesión del usuario
      req.session.user = data;
    } catch (error) {

      // Si la verificación falla, establece la sesión del usuario en null
      req.session.user = null;
      console.error('Error verifying token:', error);
    }
  }
  
  next();
};

export default authMiddleware;
