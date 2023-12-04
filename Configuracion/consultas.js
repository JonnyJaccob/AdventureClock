const routerConsulta = require('express').Router();
const path = require('path');
const fs = require('fs');
var mysql = require('mysql2/promise');

const dataDeBase = {
    host: process.env.HOSTNAME || 'localhost', 
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'adventure'
}

/**
 * Ruta para obtener información de todas las personas en el contexto de la historia.
 * @swagger
 * /historia/persona:
 *   get:
 *     summary: Obtiene información de todas las personas en el contexto de la historia.
 *     tags:
 *       - historia
 *     responses:
 *       200:
 *         description: Devuelve un array con la información de todas las personas.
 *         content:
 *           application/json:
 *             example:
 *               - ID: 1
 *                 Nombres: "John"
 *                 Apellidos: "Doe"
 *                 Raza: "Humano"
 *                 ptsVida: 1
 *                 ptsFuerza: 1
 *                 ptsDestreza: 1
 *                 ptsPoderDestreza: 1
 *                 ptsPuntoMental: 1
 *                 ptsAgilidad: 1
 *                 ptsInteligencia: 1
 *                 ptsFe: 1
 *                 ECabeza: "Capucha de novato"
 *                 EPecho: "Pechera de madera"
 *                 EPiernas: "Pantalones de madera"
 *                 EPies: "Zapatos de cuero"
 *                 EEspalda: "Capa comun"
 *                 APrimaria: "Espada corta de madera"
 *                 ASecundaria: "Escudo de madera"
 *                 AAmbasManos: "Hacha de metal"
 *       404:
 *         description: No se encontraron personas en el contexto de la historia.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Personas en el contexto de la historia está vacío"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.get('/persona/',async (req,res) =>{
    try{
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('select * from persona');
        if(rows.length == 0){
            res.status(404);
            res.json({mensaje:"Personas esta vacio"})
        }else{
            res.json(rows);
        }
    }catch(err){
        res.status(500).json({mensaje: "Error de conexion",tipo: err.message, sql : err.sqlMessage})
    }
})

/**
 * Ruta para obtener información de todos los objetos en el contexto de la historia.
 * @swagger
 * /historia/objeto:
 *   get:
 *     summary: Obtiene información de todos los objetos en el contexto de la historia.
 *     tags:
 *       - historia
 *     responses:
 *       200:
 *         description: Devuelve un array con la información de todos los objetos.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nombre: "Botella de curacion"
 *                 nivel: 1
 *                 caracteristica: "Botella de vidrio con líquido rojo"
 *                 categoria: "Curacion"
 *       404:
 *         description: No se encontraron objetos en el contexto de la historia.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Objetos en el contexto de la historia está vacío"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.get('/objeto/',async (req,res) =>{
    try{
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('select * from objeto');
        if(rows.length == 0){
            res.status(404);
            res.json({mensaje:"Objetos esta vacio"})
        }else{
            res.json(rows);
        }
    }catch(err){
        res.status(500).json({mensaje: "Error de conexion",tipo: err.message, sql : err.sqlMessage})
    }
})

/**
 * Ruta para obtener información de las mochilas en el contexto de la historia.
 * @swagger
 * /historia/mochila:
 *   get:
 *     summary: Obtiene información de las mochilas en el contexto de la historia.
 *     tags:
 *       - historia
 *     responses:
 *       200:
 *         description: Devuelve un array con la información de las mochilas.
 *         content:
 *           application/json:
 *             example:
 *               - id_persona: 1
 *                 id_objeto: 1
 *       404:
 *         description: No se encontraron mochilas en el contexto de la historia.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "No hay mochilas en el contexto de la historia"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.get('/mochila/',async (req,res) =>{
    try{
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('select * from mochila');
        if(rows.length == 0){
            res.status(404);
            res.json({mensaje:"No hay mochilas"})
        }else{
            res.json(rows);
        }
    }catch(err){
        res.status(500).json({mensaje: "Error de conexion",tipo: err.message, sql : err.sqlMessage})
    }
})

module.exports = {
    routerConsulta,
};