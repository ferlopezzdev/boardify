import dotenv from 'dotenv';
dotenv.config();

export const {
    PORT,
    CORS_ORIGIN = 'http://localhost:5173',
    DB_USER,
    DB_HOST,
    DB_PASSWORD,
    DB_DATABASE
} = process.env;