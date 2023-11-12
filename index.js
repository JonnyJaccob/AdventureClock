//index.js
const app = require('./Configuracion/expressApp');

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor express escuchando en el puerto ${app.get('port')}`);
});