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

describe('Obtiene elementos aleatorios de diferentes categorías', () => {
    it('Devuelve elementos aleatorios con código de estado 200', (done) => {
        chai.request(app)
            .get('/equipo/random/2')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('array');
                done();
            });
    });

    it('Devuelve elementos aleatorios con propiedades específicas', (done) => {
        chai.request(app)
            .get('/equipo/random/2')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('array');

                // Añade más expectativas según las propiedades específicas que esperas en los elementos aleatorios
                if (res.body.length > 0) {
                    chai.expect(res.body[0]).to.have.property('id');
                    chai.expect(res.body[0]).to.have.property('nombre');
                    chai.expect(res.body[0]).to.have.property('cobertura');
                    chai.expect(res.body[0]).to.have.property('nivel');
                    chai.expect(res.body[0]).to.have.property('caracteristica');
                }

                done();
            });
    });
});

//Seccion aventurero/informacion
describe('Obtiene la lista completa de nombres y apellidos', () => {
    it('Devuelve la lista completa con código de estado 200', (done) => {
        chai.request(app)
            .get('/aventurero/informacion/nombre')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.body).to.have.property('nombres').that.is.an('array');
                chai.expect(res.body).to.have.property('apellidos').that.is.an('array');

                done();
            });
    });

    it('Devuelve la lista completa con propiedades específicas', (done) => {
        chai.request(app)
            .get('/aventurero/informacion/nombre')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.body).to.have.property('nombres').that.is.an('array');
                chai.expect(res.body).to.have.property('apellidos').that.is.an('array');


                // Añade más expectativas según las propiedades específicas que esperas en la lista
                if (res.body.length > 0) {
                    chai.expect(res.body[0]).to.have.property('nombre');
                    chai.expect(res.body[0]).to.have.property('apellido');
                }

                done();
            });
    });
});

describe('Asigna nombres y apellidos al azar', () => {
    it('Devuelve la información de una persona con nombres y apellidos asignados al azar con código de estado 200', (done) => {
        chai.request(app)
            .get('/aventurero/informacion/nombre/asignar')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('object'); // Asegúrate de que la respuesta sea un objeto
                chai.expect(res.body).to.have.property('nombre').that.is.a('string');
                chai.expect(res.body).to.have.property('apellido').that.is.a('string');
                done();
            });
    });
});

it('Devuelve la lista con razas específicas', (done) => {
    chai.request(app)
        .get('/aventurero/informacion/raza')
        .end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.be.an('array'); // Asegúrate de que la respuesta sea un array
            // Añade más expectativas según las razas específicas que esperas en la respuesta
            const razasEsperadas = [
                "Humano",
                "Enano",
                "Draconico",
                "Ogro",
                "Lagarto",
                "Minotaruo",
                "Nueva era",
                "Elfo",
                "Demoniaco",
                "Barbaro",
                "Gente escombro",
                "Intelectual",
                "Enano",
                "Hobbit",
                "No muerto",
                "Argentino"
            ];
            razasEsperadas.forEach(raza => {
                chai.expect(res.body).to.include(raza);
            });
            done();
        });
});

describe('Asignar una raza al azar o mediante un índice proporcionado', () => {
    it('Devuelve una raza al azar sin proporcionar un índice', (done) => {
        chai.request(app)
            .get('/aventurero/informacion/raza/asignar')
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('object'); // Asegúrate de que la respuesta sea un objeto
                chai.expect(res.body).to.have.property('raza').that.is.a('string');
                done();
            });
    });

    it('Devuelve una raza al proporcionar un índice válido', (done) => {
        const indiceValido = 2; // Puedes ajustar el índice según tu necesidad

        chai.request(app)
            .get(`/aventurero/informacion/raza/asignar?raza=${indiceValido}`)
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.body).to.have.property('raza').that.is.a('string');
                done();
            });
    });

    it('Devuelve un error 400 al proporcionar un índice inválido', (done) => {
        const indiceInvalido = 'invalido';

        chai.request(app)
            .get(`/aventurero/informacion/raza/asignar?raza=${indiceInvalido}`)
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.body).to.have.property('mensaje').that.is.a('string');
                chai.expect(res.body).to.have.property('tipo').that.is.a('string');
                done();
            });
    });
});

describe('Obtiene atributos basados en parámetros de nivel y tendencia', () => {
    it('Devuelve atributos generados exitosamente con código de estado 200', (done) => {
        const requestBody = {
            lvlMinimo: 1,
            lvlMaximo: 10,
            tendencia: 5
        };

        chai.request(app)
            .post('/aventurero/informacion/atributos/obtener')
            .send(requestBody)
            .end((err, res) => {
                // Verificar si hay errores durante la solicitud
                chai.expect(err).to.be.null;

                // Verificar el código de estado
                chai.expect(res).to.have.status(200);

                // Verificar el tipo y la estructura de la respuesta
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.body).to.include.all.keys(
                    'ptsVida', 'ptsFuerza', 'ptsDestreza', 'ptsPoderDestreza',
                    'ptsPuntoMental', 'ptsAgilidad', 'ptsInteligencia', 'ptsFe'
                );

                // Verificar que las propiedades de la respuesta son números
                for (const prop of Object.values(res.body)) {
                    chai.expect(prop).to.be.a('number');
                }

                done();
            });
    });

    it('Devuelve un error 400 para parámetros inválidos con código de estado 400', (done) => {
        const requestBody = {
            lvlMinimo: 'invalido',
            lvlMaximo: 10,
            tendencia: 5
        };

        chai.request(app)
            .post('/aventurero/informacion/atributos/obtener')
            .send(requestBody)
            .end((err, res) => {
                // Verificar el código de estado
                chai.expect(res).to.have.status(400);

                // Verificar el tipo y la estructura de la respuesta
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.body).to.include.all.keys('mensaje', 'tipo');

                // Verificar que las propiedades de la respuesta son strings
                for (const prop of Object.values(res.body)) {
                    chai.expect(prop).to.be.a('string');
                }

                done();
            });
    });
});

