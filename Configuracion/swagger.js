// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const { SwaggerTheme } = require('swagger-themes');
const redoc = require('redoc-express');

const cors = require('cors');


const theme = new SwaggerTheme('v3');

const options = {
    explorer: true,
    customCss: theme.getBuffer('dark')
};


const swaggerOptionsPath = path.join(__dirname, './swagger.json');
const swaggerOptionsData = fs.readFileSync(swaggerOptionsPath);
const defObj = JSON.parse(swaggerOptionsData);

defObj.info = defObj.info || {};
const readmePath = path.join(__dirname, '../README.md');
const read = fs.readFileSync(readmePath, { encoding: 'utf8', flag: 'r' });
defObj.info.description = read;

const nuevaRuta1 = path.join(__dirname, '../Aventurero/informacion.js');
const nuevaRuta2 = path.join(__dirname, '../Objeto/objetos.js');
const nuevaRuta3 = path.join(__dirname, '../Equipamiento/equipo.js');
const nuevaRuta4 = path.join(__dirname, './consultas.js');

const swaggerOptions = {
    definition: defObj,
    apis: [nuevaRuta1, nuevaRuta2, nuevaRuta3, nuevaRuta4],
    schemes: ["http", "https"],
};
//swaggerOptions.apis.push(nuevaRuta1);

function setupSwagger(app, PORT) {
    swaggerOptions.definition.servers = [{ url: `${ process.env.URL || 'localhost'}` }];
    //const jsonString = JSON.stringify(swaggerOptions, null, 2);
    //console.log(jsonString);

    const swaggerDocs = swaggerJSDoc(swaggerOptions);

    app.use('/api-docs',cors() ,swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));

    app.use("/api-docs-json",(req, res) =>{
        res.json(swaggerDocs)
    })

    app.get(
        '/api-docs-redoc',
        cors(), // Agregar el middleware cors aquí
        redoc({
          title: 'API Docs',
          specUrl: '/api-docs-json',
          nonce: '', // <= it is optional,we can omit this key and value
          // we are now start supporting the redocOptions object
          // you can omit the options object if you don't need it
          // https://redocly.com/docs/api-reference-docs/configuration/functionality/
          redocOptions: {
            theme: {
              colors: {
                primary: {
                  main: '#6EC5AB'
                }
              },
              typography: {
                fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
                fontSize: '15px',
                lineHeight: '1.5',
                code: {
                  code: '#87E8C7',
                  backgroundColor: '#4D4D4E'
                }
              },
              menu: {
                backgroundColor: '#ffffff'
              }
            }
          }
        })
      );
}

module.exports = setupSwagger;