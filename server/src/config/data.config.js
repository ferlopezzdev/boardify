// Cargar variables de entorno
require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN || false,
  },
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  token: process.env.TOKEN,
};

module.exports = config;