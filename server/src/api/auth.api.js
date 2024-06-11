const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');

router.post('/auth/login', login);
router.post('/auth/register', register);

module.exports = router;