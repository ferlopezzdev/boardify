const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const routes = require('./api/auth.api')

// Configuración para recibir peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Autorizar peticiones
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
}));

// Rutas de las apis
app.use('/', routes);

app.listen(port, () => {
    console.log('Servidor en puerto:', port);
})