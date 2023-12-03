// Objeto/objetos.js

const routerObjeto = require('express').Router();
const path = require('path');
const fs = require('fs');

const listaInventario = [
    {
        id: 1,
        nombre: 'Botella de curacion',
        nivel: 1,
        caracteristica: 'Botella de vidrio con líquido rojo',
        categoria: 'Curacion'
    },
    {
        id: 2,
        nombre: 'Espada magica',
        nivel: 3,
        caracteristica: 'Hoja brillante con poderes magicos',
        categoria: 'Arma'
    },
    {
        id: 3,
        nombre: 'Pocion de invisibilidad',
        nivel: 2,
        caracteristica: 'Liquido transparente que otorga invisibilidad temporal',
        categoria: 'Pocion'
    },
    {
        id: 4,
        nombre: 'Libro antiguo',
        nivel: 1,
        caracteristica: 'Contiene conocimientos antiguos y secretos oscuros',
        categoria: 'Miscelaneo'
    },
    {
        id: 5,
        nombre: 'Botella de curacion',
        nivel: 2,
        caracteristica: 'Botella de vidrio con líquido morado',
        categoria: 'Curacion'
    },
    {
        id: 6,
        nombre: 'Botella de curacion',
        nivel: 3,
        caracteristica: 'Botella de vidrio con líquido azul',
        categoria: 'Curacion'
    },
    {
        id: 7,
        nombre: 'Sello de curacion',
        nivel: 4,
        caracteristica: 'Un pedazo de papel enrollado cuyo contenido son simbolos magicos',
        categoria: 'Curacion'
    },
];

/**
 * @swagger
 * /objeto:
 *   get:
 *     summary: Obtiene la lista completa de objetos en el inventario.
 *     tags:
 *       - objeto
 *     responses:
 *       200:
 *         description: Devuelve la lista completa de objetos en el inventario.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   id: 1,
 *                   nombre: "Botella de curacion",
 *                   nivel: 1,
 *                   caracteristica: "Botella de vidrio con líquido rojo",
 *                   categoria: "Curacion"
 *                 },
 *                 {
 *                   id: 2,
 *                   nombre: "Espada magica",
 *                   nivel: 3,
 *                   caracteristica: "Hoja brillante con poderes mágicos",
 *                   categoria: "Arma"
 *                 },
 *                 // Otros objetos...
 *               ]
 *       500:
 *         description: Error al obtener la lista completa.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error al obtener la lista"
 *               tipo: "Error interno del servidor"
 */
routerObjeto.get('/', async (req, res) => {
    try {
        // Enviar la lista completa como respuesta
        res.json(listaInventario);
    } catch (err) {
        // Manejo de errores si es necesario
        res.status(500).json({ error: true, mensaje: "Error al obtener la lista", tipo: err.message });
    }
});


/**
 * @swagger
 * /objeto/{id}:
 *   get:
 *     summary: Obtiene un objeto específico por su ID.
 *     tags:
 *       - objeto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del objeto que se desea obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Devuelve el objeto correspondiente al ID proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nombre: "Botella de curacion"
 *               nivel: 1
 *               caracteristica: "Botella de vidrio con líquido rojo"
 *               categoria: "Curacion"
 *       404:
 *         description: Objeto no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Objeto no encontrado"
 *               tipo: "No encontrado"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error al obtener el objeto"
 *               tipo: "Error interno del servidor"
 */
routerObjeto.get('/:id', async (req, res) => {
    try {
        const objectId = parseInt(req.params.id);

        // Buscar el objeto en la listaInventario por su ID
        const objetoEncontrado = listaInventario.find(objeto => objeto.id === objectId);

        if (objetoEncontrado) {
            res.json(objetoEncontrado);
        } else {
            // Si no se encuentra el objeto, devolver un código 404
            res.status(404).json({ mensaje: "Objeto no encontrado", tipo: "No encontrado" });
        }
    } catch (err) {
        // Manejo de errores si es necesario
        res.status(500).json({ error: true, mensaje: "Error al obtener el objeto", tipo: "Error interno del servidor" });
    }
});

/**
 * @swagger
 * /objeto/buscar/{nombre}:
 *   get:
 *     summary: Busca un objeto por su nombre.
 *     tags:
 *       - objeto
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre del objeto que se desea buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devuelve el objeto correspondiente al nombre proporcionado.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nombre: "Botella de curacion"
 *               nivel: 1
 *               caracteristica: "Botella de vidrio con líquido rojo"
 *               categoria: "Curacion"
 *       404:
 *         description: Objeto no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Objeto no encontrado"
 *               tipo: "No encontrado"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error al obtener el objeto"
 *               tipo: "Error interno del servidor"
 */
routerObjeto.get('/buscar/:nombre', async (req, res) => {
    try {
        const nombreObjeto = req.params.nombre;
        // Buscar el objeto en la listaInventario por su nombre
        const objetosEncontrados = listaInventario.filter(objeto => objeto.nombre.includes(nombreObjeto));

        if (objetosEncontrados.length > 0) {
            res.json(objetosEncontrados);
        } else {
            // Si no se encuentra ningún objeto, devolver un código 404
            res.status(405).json({ mensaje: `-Objeto ${nombreObjeto} no encontrado`, tipo: `-No ${nombreObjeto} Encontrado` });
        }
    } catch (err) {
        // Manejo de errores si es necesario
        res.status(500).json({error: true, mensaje: "Error al obtener el objeto", tipo: "Error interno del servidor" });
    }
});

/**
 * @swagger
 * /objeto/filtrar/{param}:
 *   get:
 *     summary: Filtra objetos por categoría y/o nivel.
 *     tags:
 *       - objeto
 *     parameters:
 *       - in: path
 *         name: param
 *         description: Parámetro para filtrar objetos. Puede ser una categoría (cadena) o un nivel (entero).
 *         schema:
 *           type: string | integer
 *     responses:
 *       200:
 *         description: Devuelve la lista de objetos filtrada por categoría y/o nivel.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 { "id": 1, "nombre": "Botella de curacion", "nivel": 1, "caracteristica": "Botella de vidrio con líquido rojo", "categoria": "Curacion" },
 *                 { "id": 2, "nombre": "Espada afilada", "nivel": 2, "caracteristica": "Espada de acero afilada", "categoria": "Arma" }
 *               ]
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error al obtener la lista de objetos"
 *               tipo: "Error interno del servidor"
 */
routerObjeto.get('/filtrar/:param', async (req, res) => {
    try {
        const param = req.params.param;
        let objetosFiltrados = listaInventario;

        if (!isNaN(param)) {
            const nivel = parseInt(param);
            objetosFiltrados = objetosFiltrados.filter(objeto => objeto.nivel === nivel);

        }else if(typeof req.params.param === "string"){
            //console.log("Stringd")
            objetosFiltrados = objetosFiltrados.filter(objeto => objeto.categoria === param);
        }else{
            res.status(405).json({ mensaje: "Error al reconocer el parametro", tipo: "Error en la colocacion de la ruta" });
        }
        
        res.json(objetosFiltrados);
    } catch (err) {
        // Manejo de errores si es necesario
        res.status(500).json({ error: true, mensaje: "Error al obtener la lista de objetos", tipo: "Error interno del servidor" });
    }
});

routerObjeto.get('*', (req, res) => {
    res.status(404).json({ error: true, mensaje: "Ruta Objeto no encontrada xxx", tipo: "No encontrado xxx" });
});


module.exports = {
    routerObjeto,
};