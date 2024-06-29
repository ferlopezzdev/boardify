import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import { PORT, CORS_ORIGIN } from './config/data.config';

// Importación de middlewares
import authMiddleware from './middlewares/authMiddleware';

// Importación de endpoints
import userEndpoints from './routes/user.routes';
import authEndpoints from './routes/auth.routes';

const app = express();

// Configuración de middlewares
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(express.urlencoded({ extended: true }));

// Establecer un punto de origen en el servidor (API)
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

// Establecer endpoints
app.use('/api/users', authMiddleware ,userEndpoints); // API de usuario
app.use('/api/auth', authEndpoints); // API de autenticación

app.listen(PORT, () => {
  console.log(`Servidor en: ${PORT}`);
});
