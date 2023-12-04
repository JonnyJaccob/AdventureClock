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
 * Ruta para probar la conexión a la base de datos y ejecutar un método de prueba.
 * @swagger
 * /historia/test:
 *   get:
 *     summary: Prueba la conexión a la base de datos y ejecuta un método de prueba.
 *     tags:
 *       - historia
 *     responses:
 *       200:
 *         description: Conexión exitosa y resultado del método de prueba.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Conexión exitosa"
 *               resultado: 1
 *       500:
 *         description: Error al procesar la solicitud o conexión.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
// Ruta de prueba de conexión
routerConsulta.get('/test', async (req, res) => {
    try {
        // Crear una conexión a la base de datos
        const connection = await mysql.createConnection(dataDeBase);
        console.log(dataDeBase);
        // Ejecutar un método de prueba (puedes personalizar esto)
        const resultado = await connection.query('SELECT 1 as resultado');

        // Cerrar la conexión
        await connection.end();

        res.status(200).json({ mensaje: 'Conexión exitosa', resultado: resultado[0][0].resultado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error de conexión', tipo: error.message, sql: error.sqlMessage });
    }
});

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
 * Ruta para agregar una nueva persona al contexto de la historia.
 * @swagger
 * /historia/persona:
 *   post:
 *     summary: Agrega una nueva persona al contexto de la historia.
 *     tags:
 *       - historia
 *     parameters:
 *       - in: body
 *         name: persona
 *         description: Datos de la nueva persona.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             Nombres:
 *               type: string
 *               description: Nombre de la persona.
 *               example: "John"
 *             Apellidos:
 *               type: string
 *               description: Apellidos de la persona.
 *               example: "Doe"
 *             Raza:
 *               type: string
 *               description: Raza de la persona.
 *               example: "Humano"
 *             ptsVida:
 *               type: integer
 *               description: Puntos de vida de la persona.
 *               example: 1
 *             ptsFuerza:
 *               type: integer
 *               description: Puntos de fuerza de la persona.
 *               example: 1
 *             ptsDestreza:
 *               type: integer
 *               description: Puntos de destreza de la persona.
 *               example: 1
 *             ptsPoderDestreza:
 *               type: integer
 *               description: Puntos de poder de destreza de la persona.
 *               example: 1
 *             ptsPuntoMental:
 *               type: integer
 *               description: Puntos de punto mental de la persona.
 *               example: 1
 *             ptsAgilidad:
 *               type: integer
 *               description: Puntos de agilidad de la persona.
 *               example: 1
 *             ptsInteligencia:
 *               type: integer
 *               description: Puntos de inteligencia de la persona.
 *               example: 1
 *             ptsFe:
 *               type: integer
 *               description: Puntos de fe de la persona.
 *               example: 1
 *             ECabeza:
 *               type: string
 *               description: Equipo en la cabeza de la persona.
 *               example: "Capucha de novato"
 *             EPecho:
 *               type: string
 *               description: Equipo en el pecho de la persona.
 *               example: "Pechera de madera"
 *             EPiernas:
 *               type: string
 *               description: Equipo en las piernas de la persona.
 *               example: "Pantalones de madera"
 *             EPies:
 *               type: string
 *               description: Equipo en los pies de la persona.
 *               example: "Zapatos de cuero"
 *             APrimaria:
 *               type: string
 *               description: Arma primaria de la persona.
 *               example: "Espada corta de madera"
 *             ASecundaria:
 *               type: string
 *               description: Arma secundaria de la persona.
 *               example: "Escudo de madera"
 *             AAmbasManos:
 *               type: string
 *               description: Arma para ambas manos de la persona.
 *               example: "Hacha de metal"
 *     responses:
 *       201:
 *         description: Persona agregada con éxito.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Persona agregada con éxito"
 *       400:
 *         description: Datos de la persona no válidos.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Datos de la persona no válidos"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.post('/persona', async (req, res) => {
    try {
        const {
            Nombres, Apellidos, Raza, ptsVida, ptsFuerza, ptsDestreza, ptsPoderDestreza,
            ptsPuntoMental, ptsAgilidad, ptsInteligencia, ptsFe, ECabeza, EPecho, EPiernas,
            EPies, APrimaria, ASecundaria, AAmbasManos
        } = req.body;

        // Validar los datos de la persona
        if (!Nombres || !Apellidos || !Raza || isNaN(ptsVida) || isNaN(ptsFuerza) || isNaN(ptsDestreza)
            || isNaN(ptsPoderDestreza) || isNaN(ptsPuntoMental) || isNaN(ptsAgilidad) || isNaN(ptsInteligencia)
            || isNaN(ptsFe) || !ECabeza || !EPecho || !EPiernas || !EPies || !APrimaria || !ASecundaria || !AAmbasManos) {
            res.status(400).json({ mensaje: "Datos de la persona no válidos" });
            return;
        }

        const conexion = await mysql.createConnection(dataDeBase);
        const [result] = await conexion.query(
            'INSERT INTO persona (Nombres, Apellidos, Raza, ptsVida, ptsFuerza, ptsDestreza, ptsPoderDestreza, ' +
            'ptsPuntoMental, ptsAgilidad, ptsInteligencia, ptsFe, ECabeza, EPecho, EPiernas, EPies, ' +
            'APrimaria, ASecundaria, AAmbasManos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [Nombres, Apellidos, Raza, ptsVida, ptsFuerza, ptsDestreza, ptsPoderDestreza,
                ptsPuntoMental, ptsAgilidad, ptsInteligencia, ptsFe, ECabeza, EPecho, EPiernas, EPies,
                APrimaria, ASecundaria, AAmbasManos]
        );

        res.status(201).json({ mensaje: "Persona agregada con éxito" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
    }
});

/**
 * Ruta para actualizar una persona en el contexto de la historia.
 * @swagger
 * /historia/persona:
 *   put:
 *     summary: Actualiza los datos de una persona en el contexto de la historia.
 *     tags:
 *       - historia
 *     parameters:
 *       - in: body
 *         name: persona
 *         description: Datos actualizados de la persona.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ID:
 *               type: integer
 *               description: ID de la persona a actualizar.
 *               example: 1
 *             Nombres:
 *               type: string
 *               description: Nuevo nombre de la persona.
 *               example: "John"
 *             Apellidos:
 *               type: string
 *               description: Nuevos apellidos de la persona.
 *               example: "Doe"
 *             Raza:
 *               type: string
 *               description: Nueva raza de la persona.
 *               example: "Elfo"
 *             ptsVida:
 *               type: integer
 *               description: Nuevos puntos de vida de la persona.
 *               example: 10
 *             ptsFuerza:
 *               type: integer
 *               description: Nuevos puntos de fuerza de la persona.
 *               example: 5
 *             ptsDestreza:
 *               type: integer
 *               description: Nuevos puntos de destreza de la persona.
 *               example: 8
 *             ptsPoderDestreza:
 *               type: integer
 *               description: Nuevos puntos de poder de destreza de la persona.
 *               example: 3
 *             ptsPuntoMental:
 *               type: integer
 *               description: Nuevos puntos de punto mental de la persona.
 *               example: 15
 *             ptsAgilidad:
 *               type: integer
 *               description: Nuevos puntos de agilidad de la persona.
 *               example: 12
 *             ptsInteligencia:
 *               type: integer
 *               description: Nuevos puntos de inteligencia de la persona.
 *               example: 20
 *             ptsFe:
 *               type: integer
 *               description: Nuevos puntos de fe de la persona.
 *               example: 3
 *             ECabeza:
 *               type: string
 *               description: Nuevo equipo en la cabeza de la persona.
 *               example: "Casco de acero"
 *             EPecho:
 *               type: string
 *               description: Nuevo equipo en el pecho de la persona.
 *               example: "Armadura de cuero"
 *             EPiernas:
 *               type: string
 *               description: Nuevo equipo en las piernas de la persona.
 *               example: "Pantalones de tela"
 *             EPies:
 *               type: string
 *               description: Nuevo equipo en los pies de la persona.
 *               example: "Botas de cuero"
 *             APrimaria:
 *               type: string
 *               description: Nueva arma primaria de la persona.
 *               example: "Espada larga de acero"
 *             ASecundaria:
 *               type: string
 *               description: Nueva arma secundaria de la persona.
 *               example: "Escudo grande de madera"
 *             AAmbasManos:
 *               type: string
 *               description: Nueva arma para ambas manos de la persona.
 *               example: "Arco largo"
 *     responses:
 *       200:
 *         description: Persona actualizada con éxito.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Persona actualizada con éxito"
 *       400:
 *         description: Datos de la persona no válidos o faltantes.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Datos de la persona no válidos o faltantes"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.put('/persona', async (req, res) => {
    try {
        const {
            ID, Nombres, Apellidos, Raza, ptsVida, ptsFuerza, ptsDestreza, ptsPoderDestreza,
            ptsPuntoMental, ptsAgilidad, ptsInteligencia, ptsFe, ECabeza, EPecho, EPiernas,
            EPies, APrimaria, ASecundaria, AAmbasManos
        } = req.body;

        // Validar los datos de la persona
        if (!ID || !Nombres || !Apellidos || !Raza || isNaN(ptsVida) || isNaN(ptsFuerza) || isNaN(ptsDestreza)
            || isNaN(ptsPoderDestreza) || isNaN(ptsPuntoMental) || isNaN(ptsAgilidad) || isNaN(ptsInteligencia)
            || isNaN(ptsFe) || !ECabeza || !EPecho || !EPiernas || !EPies || !APrimaria || !ASecundaria || !AAmbasManos) {
            res.status(400).json({ mensaje: "Datos de la persona no válidos o faltantes" });
            return;
        }

        const conexion = await mysql.createConnection(dataDeBase);
        const [result] = await conexion.query(
            'UPDATE persona SET Nombres=?, Apellidos=?, Raza=?, ptsVida=?, ptsFuerza=?, ptsDestreza=?, ' +
            'ptsPoderDestreza=?, ptsPuntoMental=?, ptsAgilidad=?, ptsInteligencia=?, ptsFe=?, ECabeza=?, ' +
            'EPecho=?, EPiernas=?, EPies=?, APrimaria=?, ASecundaria=?, AAmbasManos=? WHERE ID=?',
            [Nombres, Apellidos, Raza, ptsVida, ptsFuerza, ptsDestreza, ptsPoderDestreza,
                ptsPuntoMental, ptsAgilidad,ptsInteligencia, ptsFe, ECabeza, EPecho, EPiernas, EPies,
                APrimaria, ASecundaria, AAmbasManos, ID]
            );
    
            if (result.affectedRows > 0) {
                res.status(200).json({ mensaje: "Persona actualizada con éxito" });
            } else {
                res.status(404).json({ mensaje: "Persona no encontrada" });
            }
        } catch (err) {
            res.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
        }
    });

/**
 * Ruta para actualizar parcialmente una persona en el contexto de la historia.
 * @swagger
 * /historia/persona:
 *   patch:
 *     summary: Actualiza parcialmente los datos de una persona en el contexto de la historia.
 *     tags:
 *       - historia
 *     parameters:
 *       - in: body
 *         name: persona
 *         description: Datos actualizados de la persona.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ID:
 *               type: integer
 *               description: ID de la persona a actualizar.
 *               example: 1
 *             Nombres:
 *               type: string
 *               description: Nuevo nombre de la persona.
 *               example: "John"
 *             Apellidos:
 *               type: string
 *               description: Nuevos apellidos de la persona.
 *               example: "Doe"
 *             Raza:
 *               type: string
 *               description: Nueva raza de la persona.
 *               example: "Elfo"
 *             ptsVida:
 *               type: integer
 *               description: Nuevos puntos de vida de la persona.
 *               example: 10
 *             ptsFuerza:
 *               type: integer
 *               description: Nuevos puntos de fuerza de la persona.
 *               example: 5
 *             ptsDestreza:
 *               type: integer
 *               description: Nuevos puntos de destreza de la persona.
 *               example: 8
 *             ptsPoderDestreza:
 *               type: integer
 *               description: Nuevos puntos de poder de destreza de la persona.
 *               example: 3
 *             ptsPuntoMental:
 *               type: integer
 *               description: Nuevos puntos de punto mental de la persona.
 *               example: 15
 *             ptsAgilidad:
 *               type: integer
 *               description: Nuevos puntos de agilidad de la persona.
 *               example: 12
 *             ptsInteligencia:
 *               type: integer
 *               description: Nuevos puntos de inteligencia de la persona.
 *               example: 20
 *             ptsFe:
 *               type: integer
 *               description: Nuevos puntos de fe de la persona.
 *               example: 3
 *             ECabeza:
 *               type: string
 *               description: Nuevo equipo en la cabeza de la persona.
 *               example: "Casco de acero"
 *             EPecho:
 *               type: string
 *               description: Nuevo equipo en el pecho de la persona.
 *               example: "Armadura de cuero"
 *             EPiernas:
 *               type: string
 *               description: Nuevo equipo en las piernas de la persona.
 *               example: "Pantalones de tela"
 *             EPies:
 *               type: string
 *               description: Nuevo equipo en los pies de la persona.
 *               example: "Botas de cuero"
 *             APrimaria:
 *               type: string
 *               description: Nueva arma primaria de la persona.
 *               example: "Espada larga de acero"
 *             ASecundaria:
 *               type: string
 *               description: Nueva arma secundaria de la persona.
 *               example: "Escudo grande de madera"
 *             AAmbasManos:
 *               type: string
 *               description: Nueva arma para ambas manos de la persona.
 *               example: "Arco largo"
 *     responses:
 *       200:
 *         description: Persona actualizada parcialmente con éxito.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Persona actualizada parcialmente con éxito"
 *       400:
 *         description: Datos de la persona no válidos o faltantes.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Datos de la persona no válidos o faltantes"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.patch('/persona', async (req, res) => {
    try {
        const { ID, ...updatedData } = req.body;

        // Validar los datos de la persona
        if (!ID) {
            res.status(400).json({ mensaje: "ID de la persona no proporcionado" });
            return;
        }

        const conexion = await mysql.createConnection(dataDeBase);

        // Obtener datos actuales de la persona
        const [currentData] = await conexion.query('SELECT * FROM persona WHERE ID = ?', [ID]);

        if (currentData.length === 0) {
            res.status(404).json({ mensaje: "Persona no encontrada" });
            return;
        }

        // Actualizar datos parcialmente
        const updatedFields = { ...currentData[0], ...updatedData };

        const [result] = await conexion.query(
            'UPDATE persona SET Nombres=?, Apellidos=?, Raza=?, ptsVida=?, ptsFuerza=?, ptsDestreza=?, ' +
            'ptsPoderDestreza=?, ptsPuntoMental=?, ptsAgilidad=?, ptsInteligencia=?, ptsFe=?, ECabeza=?, ' +
            'EPecho=?, EPiernas=?, EPies=?, APrimaria=?, ASecundaria=?, AAmbasManos=? WHERE ID=?',
            [updatedFields.Nombres, updatedFields.Apellidos, updatedFields.Raza, updatedFields.ptsVida,
                updatedFields.ptsFuerza, updatedFields.ptsDestreza, updatedFields.ptsPoderDestreza,
                updatedFields.ptsPuntoMental, updatedFields.ptsAgilidad, updatedFields.ptsInteligencia,
                updatedFields.ptsFe, updatedFields.ECabeza, updatedFields.EPecho, updatedFields.EPiernas,
                updatedFields.EPies, updatedFields.APrimaria, updatedFields.ASecundaria, updatedFields.AAmbasManos,
                ID]
        );

    if (result.affectedRows > 0) {
        res.status(200).json({ mensaje: "Persona actualizada parcialmente con éxito" });
    } else {
        res.status(404).json({ mensaje: "Persona no encontrada" });
    }
} catch (err) {
    res.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
}
});

/**
 * Ruta para eliminar una persona del contexto de la historia.
 * @swagger
 * /historia/persona:
 *   delete:
 *     summary: Elimina una persona del contexto de la historia.
 *     tags:
 *       - historia
 *     parameters:
 *       - in: body
 *         name: persona
 *         description: Datos de la persona a eliminar.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ID:
 *               type: integer
 *               description: ID de la persona a eliminar.
 *               example: 1
 *     responses:
 *       200:
 *         description: Persona eliminada con éxito.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Persona eliminada con éxito"
 *       404:
 *         description: Persona no encontrada.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Persona no encontrada"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.delete('/persona', async (req, res) => {
    try {
        const { ID } = req.body;

        // Validar que el ID sea proporcionado
        if (!ID) {
            res.status(400).json({ mensaje: "ID de la persona no proporcionado" });
            return;
        }

        const conexion = await mysql.createConnection(dataDeBase);
        const [result] = await conexion.query('DELETE FROM persona WHERE ID = ?', [ID]);

        if (result.affectedRows > 0) {
            res.status(200).json({ mensaje: "Persona eliminada con éxito" });
        } else {
            res.status(404).json({ mensaje: "Persona no encontrada" });
        }
    } catch (err) {
        res.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
    }
});


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
 * Ruta para agregar un objeto y guardarlo en la mochila de un aventurero.
 * @swagger
 * /historia/objeto:
 *   post:
 *     summary: Agrega un objeto y lo guarda en la mochila de un aventurero.
 *     tags:
 *       - historia
 *     parameters:
 *       - in: body
 *         name: objeto
 *         description: Datos del objeto a agregar.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_persona:
 *               type: integer
 *               description: ID de la persona (aventurero) a la que se le añadirá el objeto.
 *               example: 1
 *             nombre:
 *               type: string
 *               description: Nombre del objeto.
 *               example: "Espada mágica"
 *             nivel:
 *               type: integer
 *               description: Nivel del objeto.
 *               example: 3
 *             caracteristica:
 *               type: string
 *               description: Características especiales del objeto.
 *               example: "Incrementa la fuerza en 10 puntos"
 *             categoria:
 *               type: string
 *               description: Categoría del objeto.
 *               example: "Arma"
 *     responses:
 *       200:
 *         description: Objeto agregado y guardado en la mochila con éxito.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Objeto agregado a la mochila con éxito"
 *       400:
 *         description: Datos del objeto no válidos o faltantes.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Datos del objeto no válidos o faltantes"
 *       404:
 *         description: Persona no encontrada u objeto no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Persona no encontrada"  # o "Objeto no encontrado"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.post('/objeto/', async (req, res) => {
    try {
        const { id_persona, nombre, nivel, caracteristica, categoria } = req.body;

        // Validar la existencia de la persona
        const personaExistente = await validarExistenciaPersona(id_persona);
        if (!personaExistente) {
            res.status(404).json({ mensaje: "Persona no encontrada" });
            return;
        }
        let IDObjeto;
        // Validar la existencia del objeto
        const objetoExistente = await validarExistenciaObjeto(nombre, categoria, nivel);
        //console.log("Primer log",objetoExistente)
        if( objetoExistente == null){
            const conexion = await mysql.createConnection(dataDeBase);
            const result = await conexion.query(
                'INSERT INTO objeto (nombre, nivel, caracteristica, categoria) VALUES (?, ?, ?, ?)',
                [nombre, nivel, caracteristica, categoria]
            );
              
            //console.log("medio ", result);
            IDObjeto = result.insertId;
            //console.log("segundo ", IDObjeto);
            // Cerrar la conexión después de ejecutar la consulta
            await conexion.end();

        } else {
            IDObjeto = objetoExistente;
            //console.log("tercero ", IDObjeto);
        }

        // Agregar el objeto a la mochila
        await agregarObjetoAMochila(id_persona, IDObjeto);

        res.status(200).json({ mensaje: "Objeto agregado a la mochila con éxito" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
    }
});


const validarExistenciaPersona = async (idPersona) => {
    try {
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('SELECT * FROM persona WHERE ID = ?', [idPersona]);

        // Si hay al menos una fila, significa que la persona existe
        return rows.length > 0;
    } catch (error) {
        // Manejar el error aquí, podrías loguearlo o lanzar una excepción según tus necesidades
        console.error('Error al validar existencia de persona:', error);
        return false;
    }
};

const validarExistenciaObjeto = async (nombre, categoria, nivel) => {
    try {
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query(
            'SELECT * FROM objeto WHERE nombre = ? AND categoria = ? AND nivel = ?',
            [nombre, categoria, nivel]
        );

        // Si hay al menos una fila, significa que el objeto existe
        if (rows.length > 0) {
            // Devolver el id del objeto encontrado
            return rows[0].id;
        } else {
            // Si no se encuentra el objeto, devolver null
            return null;
        }
    } catch (error) {
        // Manejar el error aquí, podrías loguearlo o lanzar una excepción según tus necesidades
        console.error('Error al validar existencia de objeto:', error);
        return null;
    }
};
const agregarObjetoAMochila = async (idPersona, idObjeto) => {
    try {
        const conexion = await mysql.createConnection(dataDeBase);
        const [result] = await conexion.query(
            'INSERT INTO mochila (id_persona, id_objeto) VALUES (?, ?)',
            [idPersona, idObjeto]
        );

        // Cerrar la conexión después de ejecutar la consulta
        await conexion.end();

        if (result.affectedRows > 0) {
            console.log(`Objeto con ID ${idObjeto} agregado a la mochila de la persona con ID ${idPersona}`);
        } else {
            console.log(`No se pudo agregar el objeto a la mochila`);
        }
    } catch (error) {
        // Manejar el error aquí, podrías loguearlo o lanzar una excepción según tus necesidades
        console.error('Error al agregar objeto a la mochila:', error);
    }
};


/**
 * Ruta para actualizar un objeto en la mochila de un aventurero.
 * @swagger
 * /historia/objeto/{id}:
 *   put:
 *     summary: Actualiza un objeto en la mochila de un aventurero.
 *     tags:
 *       - historia
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del objeto en la mochila a actualizar.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: body
 *         name: objeto
 *         description: Datos actualizados del objeto.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               description: Nuevo nombre del objeto.
 *               example: "Espada mágica mejorada"
 *             nivel:
 *               type: integer
 *               description: Nuevo nivel del objeto.
 *               example: 4
 *             caracteristica:
 *               type: string
 *               description: Nuevas características especiales del objeto.
 *               example: "Incrementa la fuerza en 15 puntos"
 *     responses:
 *       200:
 *         description: Objeto actualizado en la mochila con éxito.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Objeto actualizado en la mochila con éxito"
 *       400:
 *         description: Datos del objeto no válidos o faltantes.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Datos del objeto no válidos o faltantes"
 *       404:
 *         description: Objeto no encontrado en la mochila.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Objeto no encontrado en la mochila"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.put('/objeto/:id', async (req, res) => {
    try {
        const idObjeto = req.params.id;
        const { nombre, nivel, caracteristica } = req.body;

        // Actualizar el objeto en la mochila
        await actualizarObjeto(idObjeto,nombre, nivel, caracteristica);

        res.status(200).json({ mensaje: "Objeto actualizado en la mochila con éxito" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
    }
});

const actualizarObjeto = async (idObjeto,nombre, nivel, caracteristica) => {
    try {
        const conexion = await mysql.createConnection(dataDeBase);
        const [result] = await conexion.query(
            'UPDATE objeto SET nivel=?, caracteristica=?, nombre=? WHERE nombre=?',
            [nivel, caracteristica, nombre,idObjeto]
        );

        // Cerrar la conexión después de ejecutar la consulta
        await conexion.end();

        if (result.affectedRows > 0) {
            console.log(`Objeto con nombre ${nombre} actualizado con éxito`);
        } else {
            console.log(`No se pudo encontrar el objeto con nombre ${nombre}`);
        }
    } catch (error) {
        // Manejar el error aquí, podrías loguearlo o lanzar una excepción según tus necesidades
        console.error('Error al actualizar objeto:', error);
    }
};

/**
 * Ruta para eliminar un objeto de la mochila de un aventurero y, si es necesario, borrar el objeto.
 * @swagger
 * /historia/objeto:
 *   delete:
 *     summary: Elimina un objeto de la mochila de un aventurero y, si es necesario, borra el objeto.
 *     tags:
 *       - historia
 *     parameters:
 *       - in: query
 *         name: id_objeto
 *         description: ID del objeto que se eliminará de la mochila.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Objeto eliminado de la mochila y, si es necesario, borrado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Objeto eliminado de la mochila con éxito"
 *       404:
 *         description: Objeto no encontrado o relación no existente.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Persona no encontrada"  # o "Objeto no encontrado"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.delete('/objeto', async (req, res) => {
    try {
        const { id_objeto } = req.query;

        // Validar la existencia del objeto y la relación en la mochila
        const objetoEnMochila = await verificarObjetoEnMochila(id_objeto);
        if (!objetoEnMochila) {
            res.status(404).json({ mensaje: "Objeto no encontrado en la mochila de la persona" });
            return;
        }

        // Eliminar el objeto y la relación en la mochila
        await borrarObjetoYRelacion(id_objeto);

        res.status(200).json({ mensaje: "Objeto eliminado de la mochila con éxito" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
    }
});
const verificarObjetoEnMochila = async (idObjeto) => {
    try {
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('SELECT * FROM mochila WHERE id_objeto = ?', [idObjeto]);

        // Si hay al menos una fila, significa que el objeto está en la mochila
        return rows.length > 0;
    } catch (error) {
        // Manejar el error aquí, podrías loguearlo o lanzar una excepción según tus necesidades
        console.error('Error al verificar objeto en mochila:', error);
        return false;
    }
};
const borrarObjetoYRelacion = async (idObjeto) => {
    try {
        // Verificar si el objeto está en la mochila antes de proceder
        const objetoEnMochila = await verificarObjetoEnMochila(idObjeto);
        if (!objetoEnMochila) {
            throw new Error("Objeto no encontrado en la mochila");
        }

        const conexion = await mysql.createConnection(dataDeBase);

        // Eliminar la relación entre la persona y el objeto en la mochila
        await conexion.query('DELETE FROM mochila WHERE id_objeto = ?', [idObjeto]);

        // Eliminar el objeto
        await conexion.query('DELETE FROM objeto WHERE id = ?', [idObjeto]);

        // Cerrar la conexión después de ejecutar las consultas
        await conexion.end();

        // Si llegamos aquí, ambas eliminaciones fueron exitosas
        return true;
    } catch (error) {
        console.error('Error al borrar objeto y relación:', error);
        // Puedes lanzar una excepción o devolver false según tus necesidades
        return false;
    }
};



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

/**
 * Ruta para borrar un objeto de la mochila en el contexto de la historia.
 * @swagger
 * /historia/mochila/{idObjeto}:
 *   delete:
 *     summary: Borra un objeto de la mochila en el contexto de la historia.
 *     tags:
 *       - historia
 *     parameters:
 *       - in: path
 *         name: idObjeto
 *         required: true
 *         description: ID del objeto que se va a borrar de la mochila.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Objeto eliminado de la mochila con éxito.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Objeto eliminado de la mochila con éxito"
 *       404:
 *         description: Objeto no encontrado en la mochila.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Objeto no encontrado en la mochila"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Error de conexión"
 *               tipo: "Mensaje de error específico"
 *               sql: "Mensaje SQL específico"
 */
routerConsulta.delete('/mochila/:idObjeto', async (req, res) => {
    try {
        const idObjeto = req.params.idObjeto;
        const conexion = await mysql.createConnection(dataDeBase);

        // Verificar si el objeto existe en la mochila antes de proceder
        const objetoEnMochila = await verificarExistenciaMochila(idObjeto);
        if (!objetoEnMochila) {
            res.status(404).json({ mensaje: "Objeto no encontrado en la mochila" });
            return;
        }

        // Eliminar la relación entre persona y objeto de la mochila
        await conexion.query('DELETE FROM mochila WHERE id_objeto = ?', [idObjeto]);

        // Cerrar la conexión después de ejecutar la consulta
        await conexion.end();

        res.status(200).json({ mensaje: "Objeto eliminado de la mochila con éxito" });
    } catch (err) {
        res.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
    }
});


const verificarExistenciaMochila = async (id) => {
    try {
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('SELECT * FROM mochila WHERE id_objeto = ?', [id]);
        
        // Si hay al menos una fila, significa que la mochila existe
        return rows.length > 0;
    } catch (error) {
        // Manejar el error aquí, podrías loguearlo o lanzar una excepción según tus necesidades
        console.error('Error al verificar existencia de mochila:', error);
        return false;
    }
};


module.exports = {
    routerConsulta,
};