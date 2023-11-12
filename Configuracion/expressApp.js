// expressApp.js
const express = require('express');
const setupSwagger = require('./swagger');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8083;

// Establecer el puerto en la aplicación
app.set('port', PORT);

// Middleware para manejar JSON
app.use(express.json());

// Configuración de Swagger
setupSwagger(app, PORT);

// Rutas de Express

const informacionRouter = require(path.join(__dirname, '../Aventurero/informacion'));
app.use('/aventurero/informacion', informacionRouter);


// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal');
});

module.exports = app;
