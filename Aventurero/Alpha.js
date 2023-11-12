// Aventurero/informacion.js

const router = require('express').Router();
var mysql = require('mysql2/promise');
require('dotenv').config();

const dataDeBase = {
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASS || '',
    database: process.env.DB || 'ejemplo'
};

/**
 * @swagger
 * /empleado:
 *   tags:
 *     - empleados
 *   get:
 *     description: Obtiene una lista de todos los empleados.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: El ID del empleado.
 *     responses:
 *       200:
 *         description: Regresa una lista de todos los empleados.
 */
router.get('/',async (req,res) =>{
    try{
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('select * from ejemplo.nombre ');
        if(rows.length == 0){
            res.status(404);
            res.json({mensaje:"Usuario no existe"})
        }else{
            res.json(rows);
        }
    }catch(err){
        res.status(500).json({mensaje: "Error de conexion",tipo: err.message, sql : err.sqlMessage})
    }
})


module.exports = router;