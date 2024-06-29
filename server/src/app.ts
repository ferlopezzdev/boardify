import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT, CORS_ORIGIN } from './config/data.config';
import userEndpoints from './routes/user.routes';
import authEndpoints from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// Autorizar peticiones solo desde la URL indicada
app.use(cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

// Endpoint API - Usuarios
app.use('/api/users', userEndpoints);
app.use('/api/auth', authEndpoints);

app.listen(PORT, () => {
    console.log(`Servidor en: ${PORT}`);
});