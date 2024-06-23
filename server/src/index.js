const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');
const workspacesRoutes = require('./routes/workspaces.routes');
const config = require('./config/data.config');

// Configuración para recibir peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Autorizar peticiones solo desde la URL indicada
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

// Rutas de las apis
app.use('/', authRoutes);
app.use('/', workspacesRoutes);

const PORT = config.port;

app.listen(PORT, () => {
    console.log('Servidor en puerto:', PORT);
})