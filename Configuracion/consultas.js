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