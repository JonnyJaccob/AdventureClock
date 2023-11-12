// Aventurero/informacion.js

const router = require('express').Router();
const path = require('path');
const fs = require('fs');


// Obtener la ruta completa del archivo JSON
const nombresJsonPath = path.join(__dirname, 'Suplemento', 'Nombres.json');

// Leer el contenido del archivo JSON
const nombresData = JSON.parse(fs.readFileSync(nombresJsonPath, 'utf-8'));

/**
 * @swagger
 * /aventurero/informacion:
 *   get:
 *     summary: Obtiene la lista completa de nombres y apellidos.
 *     tags:
 *       - aventurero
 *     responses:
 *       200:
 *         description: Devuelve la lista completa de nombres y apellidos.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "nombre": "John", "apellido": "Doe" },
 *                 { "nombre": "Jane", "apellido": "Smith" },
 *                 // Otros nombres y apellidos...
 *               ]
 *       500:
 *         description: Error al obtener la lista completa.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error al obtener la lista completa"
 *               tipo: "Error interno del servidor"
 */
router.get('/', async (req, res) => {
    try {
        // Enviar la lista completa como respuesta
        res.json(nombresData);
    } catch (err) {
        // Manejo de errores si es necesario
        res.status(500).json({ mensaje: "Error al obtener la lista", tipo: err.message });
    }
});

/**
 * @swagger
 * /aventurero/informacion/asignar:
 *   get:
 *     summary: Asigna nombres y apellidos al azar a una persona.
 *     tags:
 *       - aventurero
 *     responses:
 *       200:
 *         description: Devuelve la información de una persona con nombres y apellidos asignados al azar.
 *         content:
 *           application/json:
 *             example:
 *               nombre: "John"
 *               apellido: "Doe"
 *       500:
 *         description: Error al asignar nombres y apellidos al azar.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error al asignar nombres y apellidos al azar"
 *               tipo: "Error interno del servidor"
 */
router.get('/asignar', async (req, res) => {
    var data = nombresData
    try {
        // Asignar nombres y apellidos al azar
        const nombreAleatorio = data.nombres[Math.floor(Math.random() * data.nombres.length)];
        const apellidoAleatorio = data.apellidos[Math.floor(Math.random() * data.apellidos.length)];

        // Enviar la persona generada al azar como respuesta
        res.json({ nombre: nombreAleatorio, apellido: apellidoAleatorio });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener la persona al azar", tipo: err.message });
    }
});


module.exports = router;
