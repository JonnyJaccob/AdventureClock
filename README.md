# Adventure Clock
Una api para administrar un juego de aventureros.  
Adventure Clock es una api para administrar un juego de aventureros. Proporciona funcionalidades para manejar objetos, razas, atributos y más.

## Instalación
Para instalar Adventure Clock, simplemente ejecuta:

```bash
npm install adventure-clock
```
## Uso
A continuación, se presenta un ejemplo básico de cómo puedes utilizar Adventure Clock en tu aplicación:


```javascript
const adventureClock = require('adventure-clock');

// Obtener la lista de razas disponibles
const razasDisponibles = adventureClock.obtenerRazas();

console.log(`Razas disponibles: ${razasDisponibles.join(', ')}`);
console.log(`Aventurero creado: ${JSON.stringify(aventurero, null, 2)}`);
```
## Características
- Creación y administración de aventureros.
- Gestión de objetos y equipos.
- Obtención de atributos basados en parámetros específicos.
- ...

## Contribuir
¡Si quieres contribuir a Adventure Clock, eres bienvenido! Si encuentras errores o tienes sugerencias, por favor, abre un problema o envía una solicitud de extracción.

## Licencia
Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE.md para más detalles.


