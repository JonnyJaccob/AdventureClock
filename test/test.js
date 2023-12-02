const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const app = require(path.join(__dirname, '../Configuracion/expressApp')); // Cambia esta ruta por la ubicación real de tu aplicación express
const expect = chai.expect;
//npm run test y index
chai.use(chaiHttp);

describe("Obtener la lista de nombres", () => {
    it("Prueba método GET", (done) => {
        chai.request(app)
            .get("/aventurero/informacion/nombre")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object'); // Asegura que la respuesta sea un objeto
                expect(res.body.nombres).to.be.an('array'); // Asegura que 'nombres' sea un array
                // Agrega más expectativas según tu estructura de datos esperada
                done();
            });
    });
});
