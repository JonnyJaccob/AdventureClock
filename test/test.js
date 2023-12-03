const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const app = require(path.join(__dirname, '../Configuracion/expressApp')); // Cambia esta ruta por la ubicación real de tu aplicación express
const expect = chai.expect;
//npm run test y index
chai.use(chaiHttp);

//Seccion Objeto
describe("Obtener la lista completa de objetos", () => {
    it("Prueba método GET", (done) => {
        chai.request(app)
            .get("/objeto")
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array'); // Asegura que la respuesta sea un array
                // Agrega más expectativas según tu estructura de datos esperada
                done();
            });
    });
});
describe("Obtener un objeto por ID", () => {
    it("Devuelve un objeto existente por ID", (done) => {
        const objetoExistente = { // Asegúrate de que este objeto exista en tu listaInventario
            id: 1,
            nombre: 'Botella de curacion',
            nivel: 1,
            caracteristica: 'Botella de vidrio con líquido rojo',
            categoria: 'Curacion'
        };

        chai.request(app)
            .get(`/objeto/${objetoExistente.id}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.eql(objetoExistente);
                done();
            });
    });

    it("Devuelve un error 404 para un objeto no existente", (done) => {
        const idObjetoNoExistente = 999; // Asegúrate de que este ID no exista en tu listaInventario

        chai.request(app)
            .get(`/objeto/${idObjetoNoExistente}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body).to.eql({ mensaje: "Objeto no encontrado", tipo: "No encontrado" });
                done();
            });
    });

    it("Devuelve un error 404 para una solicitud con ID no encontrado", (done) => {
        const idNoEncontrado = "no_existe"; // Un ID que no existe en la lista
    
        chai.request(app)
            .get(`/objeto/${idNoEncontrado}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body).to.eql({ mensaje: "Objeto no encontrado", tipo: "No encontrado" });
                done();
            });
    });
});
describe("Buscar un objeto por nombre", () => {
    it("Devuelve objetos existentes por nombre", (done) => {
        const nombreObjetoExistente = "Botella"; // Asegúrate de que haya objetos en tu listaInventario que incluyan este nombre

        chai.request(app)
            .get(`/objeto/buscar/${nombreObjetoExistente}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array'); // Asegura que la respuesta sea un array
                // Agrega más expectativas según tu estructura de datos esperada
                done();
            });
    });

    it("Devuelve un error 405 para un nombre de objeto no encontrado", (done) => {
        const nombreObjetoNoExistente = "ObjetoNoExistente"; // Asegúrate de que no haya objetos en tu listaInventario con este nombre

        chai.request(app)
            .get(`/objeto/buscar/${nombreObjetoNoExistente}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(405);
                expect(res.body).to.eql({ mensaje: `-Objeto ${nombreObjetoNoExistente} no encontrado`, tipo: `-No ${nombreObjetoNoExistente} Encontrado` });
                done();
            });
    });

    it("Devuelve un error 405 para una solicitud con nombre no encontrado", (done) => {
        const nombreNoEncontrado = "no_existe"; // Un nombre que no existe en la lista
    
        chai.request(app)
            .get(`/objeto/buscar/${nombreNoEncontrado}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(405);
                expect(res.body).to.eql({ mensaje: `-Objeto ${nombreNoEncontrado} no encontrado`, tipo: `-No ${nombreNoEncontrado} Encontrado` });
                done();
            });
    });
});

describe("Busca un objeto por nivel o categoria", () => {
    // Prueba para filtrar por nivel
    it("Devuelve objetos filtrados por nivel", (done) => {
        const nivel = 1;

        chai.request(app)
            .get(`/objeto/filtrar/${nivel}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').that.is.not.empty;
                done();
            });
    });

    // Prueba para filtrar por categoría
    it("Devuelve objetos filtrados por categoría", (done) => {
        const categoria = "Curacion";

        chai.request(app)
            .get(`/objeto/filtrar/${categoria}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').that.is.not.empty;
                done();
            });
    });

    // Prueba para filtrar por cadena (parámetro no válido)
    it("Devuelve un error 200 para una solicitud con parametro no encontrado en la lista", (done) => {
        const parametroNoValido = "no_valido";

        chai.request(app)
            .get(`/objeto/filtrar/${parametroNoValido}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.eql([]);
                done();
            });
    });

    // Prueba para una solicitud con parámetro vacío
    it("Devuelve un error 404 para una solicitud con parámetro vacío", (done) => {
        const parametroVacio = "";

        chai.request(app)
            .get(`/objeto/filtrar/${parametroVacio}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });
});

//Seccion Equipo
describe('Busca una lista de equipos', () => {
    it('Devuelve una lista de equipamientos con código de estado 200', (done) => {
        chai.request(app)
            .get('/equipo')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('array'); // Asegúrate de que la respuesta sea un array de equipamientos
                done();
            });
    });

    it('Devuelve una lista de equipamientos con propiedades específicas', (done) => {
        chai.request(app)
            .get('/equipo')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('array'); // Asegúrate de que la respuesta sea un array de equipamientos
                // Añade más expectativas según las propiedades específicas que esperas en un equipamiento
                chai.expect(res.body[0]).to.have.property('id');
                chai.expect(res.body[0]).to.have.property('nombre');
                chai.expect(res.body[0]).to.have.property('cobertura');
                chai.expect(res.body[0]).to.have.property('nivel');
                chai.expect(res.body[0]).to.have.property('caracteristica');
                done();
            });
    });
});



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
