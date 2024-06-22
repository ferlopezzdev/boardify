const express = require('express');
const authRoutes = express.Router();
const { getAllWorkspaces } = require('../controllers/workspace.controller');

authRoutes.get('/workspace/:id', getAllWorkspaces);

module.exports = authRoutes;