const express = require('express');
const workspaceRoutes = express.Router();
const { getAllWorkspaces, addWorkspace, deleteWorkspace, updateWorkspace } = require('../controllers/workspace.controller');

workspaceRoutes.get('/workspace/:id', getAllWorkspaces);
workspaceRoutes.post('/workspace/create', addWorkspace);
workspaceRoutes.delete('/workspace/:id', deleteWorkspace);
workspaceRoutes.patch('/workspace/:id', updateWorkspace); // Ruta para actualizar un grupo de trabajo

module.exports = workspaceRoutes;
