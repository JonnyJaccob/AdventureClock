// Aventurero/informacion.js

const routerAventurero = require('express').Router();
const path = require('path');
const fs = require('fs');


// Obtener la ruta completa del archivo JSON
const nombresJsonPath = path.join(__dirname, 'Suplemento', 'Nombres.json');

// Variable para almacenar el contenido del archivo JSON
let nombresData = null;

// Middleware para cargar el JSON si aún no está cargado
const cargarJsonMiddleware = (req, res, next) => {
    if (!nombresData) {
        try {
            // Leer el contenido del archivo JSON
            nombresData = JSON.parse(fs.readFileSync(nombresJsonPath, 'utf-8'));
        } catch (err) {
            console.error('Error al cargar el JSON:', err.message);
            return res.status(500).send('Error interno del servidor');
        }
    }
    next();
};

/**
 * @swagger
 * /aventurero/informacion/nombre:
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
routerAventurero.get('/nombre',cargarJsonMiddleware, async (req, res) => {
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
 * /aventurero/informacion/nombre/asignar:
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
routerAventurero.get('/nombre/asignar',cargarJsonMiddleware , async (req, res) => {
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


const razas = [
    "Humano",
    "Enano",
    "Draconico",
    "Ogro",
    "Lagarto",
    "Minotaruo",
    "Nueva era",
    "Elfo",
    "Demoniaco",
    "Barbaro",
    "Gente escombro",
    "Intelectual",
    "Enano",
    "Hobbit",
    "No muerto",
    "Argentino"
]

/**
 * Ruta para obtener la lista completa de razas.
 * @swagger
 * /aventurero/informacion/raza:
 *   get:
 *     summary: Obtiene la lista completa de razas disponibles.
 *     tags:
 *       - aventurero
 *     responses:
 *       200:
 *         description: Devuelve la lista completa de razas.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 "Humano",
 *                 "Enano",
 *                 ...
 *                 "Argentino"
 *               ]
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error al obtener la lista"
 *               tipo: "Error interno del servidor"
 */
routerAventurero.get('/raza', async (req, res) => {
    try {
        // Enviar la lista completa como respuesta
        res.json(razas);
    } catch (err) {
        // Manejo de errores si es necesario
        res.status(500).json({ mensaje: "Error al obtener la lista", tipo: err.message });
    }
});

/**
 * Ruta para asignar una raza al azar o mediante un índice proporcionado.
 * @swagger
 * /aventurero/informacion/raza/asignar:
 *   get:
 *     summary: Asigna una raza al azar o mediante un índice proporcionado.
 *     tags:
 *       - aventurero
 *     parameters:
 *       - in: query
 *         name: raza
 *         description: Índice de la raza deseada. (Opcional)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Devuelve la raza asignada.
 *         content:
 *           application/json:
 *             example:
 *               raza: "Humano"
 *       400:
 *         description: Índice de raza no válido.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Índice de raza no válido"
 *               tipo: "Solicitud inválida"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error al procesar la solicitud"
 *               tipo: "Error interno del servidor"
 */
routerAventurero.get('/raza/asignar', async (req, res) => {
    try {
        // Obtener el parámetro de la raza de la solicitud
        const razaElegida = req.query.raza;

        // Verificar si se proporcionó una raza y si es válida
        if (razaElegida !== undefined) {
            const indiceRaza = parseInt(razaElegida);

            // Verificar si el índice es un número válido y está dentro del rango del array
            if (!isNaN(indiceRaza) && indiceRaza >= 0 && indiceRaza < razas.length) {
                res.json({ raza: razas[indiceRaza] });
            } else {
                res.status(400).json({ mensaje: "Índice de raza no válido", tipo: "Solicitud inválida" });
            }
        } else {
            // Si no se proporciona una raza, obtener una al azar
            const razaAleatoria = razas[Math.floor(Math.random() * razas.length)];
            res.json({ raza: razaAleatoria });
        }
    } catch (err) {
        res.status(500).json({ mensaje: "Error al procesar la solicitud", tipo: "Error interno del servidor" });
    }
});


/**
 * Ruta para obtener atributos de un aventurero basados en parámetros de nivel y tendencia.
 * @swagger
 * /aventurero/informacion/atributos/obtener:
 *   get:
 *     summary: Obtiene los atributos de un aventurero basados en parámetros de nivel y tendencia.
 *     tags:
 *       - aventurero
 *     parameters:
 *       - in: query
 *         name: lvlMinimo
 *         description: Nivel mínimo del aventurero.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: lvlMaximo
 *         description: Nivel máximo del aventurero.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: tendencia
 *         description: Tendencia del aventurero (entre 1 y 10).
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Devuelve los atributos calculados del aventurero.
 *         content:
 *           application/json:
 *             example:
 *               ptsVida: 100,
 *               ptsFuerza: 20,
 *               ptsDestreza: 15,
 *               ptsPoderDestreza: 10,
 *               ptsPuntoMental: 25,
 *               ptsAgilidad: 18,
 *               ptsInteligencia: 30,
 *               ptsFe: 5
 *       400:
 *         description: Parámetros de solicitud inválidos.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Parámetros inválidos"
 *               tipo: "Solicitud inválida"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error interno del servidor"
 *               tipo: "Error interno del servidor"
 */
routerAventurero.get('/atributos/obtener', cargarJsonMiddleware, async (req, res) => {
    try {
        const lvlMinimo = parseInt(req.query.lvlMinimo);
        const lvlMaximo = parseInt(req.query.lvlMaximo);
        const tendencia = parseInt(req.query.tendencia);

        if (!isNaN(lvlMinimo) && !isNaN(lvlMaximo) && !isNaN(tendencia) && tendencia > 0 && tendencia <= 10) {
            const [ptsVida, ptsFuerza, ptsDestreza, ptsPoderDestreza, ptsPuntoMental, ptsAgilidad, ptsInteligencia, ptsFe] =
                Array(8).fill(0).map(() => calcularValorConTendencia(lvlMinimo, lvlMaximo, tendencia));

            res.status(200).json({
                ptsVida,
                ptsFuerza,
                ptsDestreza,
                ptsPoderDestreza,
                ptsPuntoMental,
                ptsAgilidad,
                ptsInteligencia,
                ptsFe
            });
        } else {
            res.status(400).json({ mensaje: "Parámetros inválidos", tipo: "Solicitud inválida" });
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        res.status(500).json({ mensaje: "Error interno del servidor", tipo: "Error interno del servidor" });
    }
});



/**
 * Obtiene la lista completa de nombres y apellidos.
 * @returns {Array} Lista completa de nombres y apellidos.
 * @throws {Error} Error al cargar el JSON.
 */
const getListaNombres = () => {
    if (!nombresData) {
        try {
            // Leer el contenido del archivo JSON si aún no está cargado
            nombresData = JSON.parse(fs.readFileSync(nombresJsonPath, 'utf-8'));
        } catch (err) {
            console.error('Error al cargar el JSON:', err.message);
            return null;
        }
    }
    return nombresData;
};

/**
 * Asigna nombres y apellidos al azar a una persona.
 * @returns {Object} Información de una persona con nombres y apellidos asignados al azar.
 * @throws {Error} Error al asignar nombres y apellidos al azar.
 */
const asignarNombresAzar = () => {
    try {
        // Asignar nombres y apellidos al azar
        const nombreAleatorio = nombresData.nombres[Math.floor(Math.random() * nombresData.nombres.length)];
        const apellidoAleatorio = nombresData.apellidos[Math.floor(Math.random() * nombresData.apellidos.length)];

        // Devolver la persona generada al azar
        return { nombre: nombreAleatorio, apellido: apellidoAleatorio };
    } catch (err) {
        console.error('Error al asignar nombres y apellidos al azar:', err.message);
        throw new Error('Error al asignar nombres y apellidos al azar');
    }
};

function calcularValorConTendencia(min, max, tendencia) {
    const rango = max - min + 1;
    const ajuste = ((rango / 10) * tendencia) || 0;
    
    const valorBase = Math.floor(Math.random() * rango) + min;
    return Math.floor(valorBase + ajuste);
}
routerAventurero.get('*', (req, res) => {
    res.status(404).json({ mensaje: "Ruta Aventurero/Informacion no encontrada xxx", tipo: "No encontrado xxx" });
});
module.exports = {
    routerAventurero,
    getListaNombres,
    asignarNombresAzar,
};
  
