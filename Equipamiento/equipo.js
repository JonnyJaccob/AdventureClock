// Equipamiento/equipo.js

const routerEquipo = require('express').Router();
const path = require('path');
const fs = require('fs');

const listaEquipo = [
    {
        id: 1,
        nombre: 'Capucha de novato',
        cobertura: "Cabeza",
        nivel: 1,
        caracteristica: 'Pedazo de cuero simple'
    },
    {
        id: 2,
        nombre: 'Capucha de principiante',
        cobertura: "Cabeza",
        nivel: 2,
        caracteristica: 'Cuero curado tejido por artesanos'
    },
    {
        id: 3,
        nombre: 'Capucha de experto',
        cobertura: "Cabeza",
        nivel: 3,
        caracteristica: 'Cuero de animales exoticos fabricado por un maestro'
    },
    {
        id: 4,
        nombre: 'Casco de madera',
        cobertura: "Cabeza",
        nivel: 1,
        caracteristica: 'Madera tallada de arboles simples para la cabeza'
    },
    {
        id: 5,
        nombre: 'Pechera de madera',
        cobertura: "Pecho",
        nivel: 1,
        caracteristica: 'Madera tallada de arboles simples para el pecho'
    },
    {
        id: 6,
        nombre: 'Pantalones de madera',
        cobertura: "Piernas",
        nivel: 1,
        caracteristica: 'Madera tallada de arboles simples para las piernas'
    },
    {
        id: 7,
        nombre: 'Zapatos de cuero',
        cobertura: "Pies",
        nivel: 1,
        caracteristica: 'Cuero simple para los pies'
    },
    {
        id: 8,
        nombre: 'Capa comun',
        cobertura: "Espalda",
        nivel: 1,
        caracteristica: 'Un pedazo de tela que puedes poner en tu espalda'
    },
    {
        id: 8,
        nombre: 'Espada corta de madera',
        cobertura: "Principal",
        nivel: 1,
        caracteristica: 'Madera tallada en forma de espada'
    },
    {
        id: 9,
        nombre: 'Escudo de madera',
        cobertura: "Secundario",
        nivel: 1,
        caracteristica: 'Madera tallada en forma de escudo'
    },
    {
        id: 10,
        nombre: 'Hacha de metal',
        cobertura: "Ambas manos",
        nivel: 2,
        caracteristica: 'Un hacha larga hecha de metal'
    },
];

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todos los equipamientos disponibles.
 *     tags:
 *       - equipamiento
 *     responses:
 *       200:
 *         description: Devuelve la lista de todos los equipamientos.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "id": 1, "nombre": "Capucha de novato", "cobertura": "Cabeza", "nivel": 1, "caracteristica": "Pedazo de cuero simple" },
 *                 { "id": 2, "nombre": "Capucha de principiante", "cobertura": "Cabeza", "nivel": 2, "caracteristica": "Cuero curado tejido por artesanos" },
 *                 // Otros equipamientos...
 *               ]
 *       500:
 *         description: Error al obtener la lista de equipamientos.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error al obtener la lista de equipamientos"
 *               tipo: "Error interno del servidor"
 */
routerEquipo.get('/', async (req, res) => {
    try {
        // Enviar la lista completa de equipamientos como respuesta
        res.json(listaEquipo);
    } catch (err) {
        // Manejo de errores si es necesario
        res.status(500).json({ mensaje: "Error al obtener la lista de equipamientos", tipo: "Error interno del servidor" });
    }
});

/**
 * @swagger
 * /equipo/random/{nivel}:
 *   get:
 *     summary: Obtiene elementos aleatorios de diferentes categorías según el nivel proporcionado.
 *     tags:
 *       - equipo
 *     parameters:
 *       - in: path
 *         name: nivel
 *         required: true
 *         description: Nivel máximo para filtrar elementos aleatorios.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Devuelve elementos aleatorios de diferentes categorías.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "id": 1, "nombre": "Espada de Fuego", "nivel": 2, "caracteristica": "Espada con llamas ardientes", "cobertura": "Ataque" },
 *                 { "id": 3, "nombre": "Escudo Resistente", "nivel": 1, "caracteristica": "Escudo de alta resistencia", "cobertura": "Defensa" }
 *               ]
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error al obtener los objetos aleatorios"
 *               tipo: "Error interno del servidor"
 */
routerEquipo.get('/random/:nivel', async (req, res) => {
    try {
        const nivelMaximo = parseInt(req.params.nivel);

        const categorias = new Set();
        const equiposAleatorios = [];

        // Filtrar las categorías disponibles
        listaEquipo.forEach(equipo => {
            if (equipo.nivel <= nivelMaximo) {
                categorias.add(equipo.cobertura);
            }
        });

        // Obtener un elemento aleatorio de cada categoría
        categorias.forEach(categoria => {
            const elementosCategoria = listaEquipo.filter(equipo => equipo.cobertura === categoria && equipo.nivel <= nivelMaximo);
            if (elementosCategoria.length > 0) {
                const elementoAleatorio = elementosCategoria[Math.floor(Math.random() * elementosCategoria.length)];
                equiposAleatorios.push(elementoAleatorio);
            }
        });

        res.json(equiposAleatorios);
    } catch (err) {
        // Manejo de errores si es necesario
        res.status(500).json({ mensaje: "Error al obtener los objetos aleatorios", tipo: "Error interno del servidor" });
    }
});

routerEquipo.get('*', (req, res) => {
    res.status(404).json({ mensaje: "Ruta Equipo no encontrada xxx", tipo: "No encontrado xxx" });
});

module.exports = {
    routerEquipo,
};