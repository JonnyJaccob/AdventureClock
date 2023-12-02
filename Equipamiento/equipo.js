// Equipamiento/equipo.js

const routerObjeto = require('express').Router();
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
        cobertura: "Pies",
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
routerObjeto.get('/', async (req, res) => {
    try {
        // Enviar la lista completa de equipamientos como respuesta
        res.json(listaEquipo);
    } catch (err) {
        // Manejo de errores si es necesario
        res.status(500).json({ mensaje: "Error al obtener la lista de equipamientos", tipo: "Error interno del servidor" });
    }
});

module.exports = {
    routerObjeto,
};