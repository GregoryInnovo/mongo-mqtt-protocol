const express = require("express"); //se indica que se requiere express
const app = express(); // se inicia express y se instancia en una constante de nombre app.
const morgan = require("morgan"); //se indica que se requiere morgan

const datosNodoMongo = require("./rutas/datosNodoMongo.js");
// settings
app.set("port", 3000); //se define el puerto en el cual va a funcionar el servidro

// Utilities
app.use(morgan("dev")); //se indica que se va a usar morgan en modo dev
app.use(express.json()); //se indica que se va a usar la funcionalidad para manejo de json de express

//Routes
app.use(datosNodoMongo);

//Start server
app.listen(app.get("port"), () => {
  console.log(`Servidor funcionando en ${app.get("port")}`);
}); //se inicia el servidor en el puerto definido y se pone un mensaje en la consola.
