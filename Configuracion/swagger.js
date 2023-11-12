// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');

function setupSwagger(app, PORT) {
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API Adventure Clock',
                version: '1.0.1',
            },
            servers: [{ url: `http://localhost:${PORT}` }],
        },
        apis: [
            `${path.join(__dirname, '../Aventurero/informacion.js')}`
        ],
    };

    const swaggerDocs = swaggerJSDoc(swaggerOptions);

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
}

module.exports = setupSwagger;