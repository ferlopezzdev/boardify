const express = require('express');
const authRoutes = express.Router();
const { signin, signup } = require('../controllers/auth.controller');

authRoutes.post('/auth/signin', signin);
authRoutes.post('/auth/signup', signup);

module.exports = authRoutes;