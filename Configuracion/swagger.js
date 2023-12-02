// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

const swaggerOptionsPath = path.join(__dirname, './swagger.json');
const swaggerOptionsData = fs.readFileSync(swaggerOptionsPath);
const swaggerOptions = JSON.parse(swaggerOptionsData);
const nuevaRuta1 = path.join(__dirname, '../Aventurero/informacion.js');
//const nuevaRuta2 = path.join(__dirname, '../Aventurero/informacion.js');

//swaggerOptions.apis.push(nuevaRuta1, nuevaRuta2);
swaggerOptions.apis.push(nuevaRuta1);

function setupSwagger(app, PORT) {
    swaggerOptions.definition.servers = [{ url: `http://localhost:${PORT}` }];
    //const jsonString = JSON.stringify(swaggerOptions, null, 2);
    //console.log(jsonString);

    const swaggerDocs = swaggerJSDoc(swaggerOptions);

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
}

module.exports = setupSwagger;