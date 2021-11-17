var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost");
const mysql = require("mysql");
var moment = require("moment");

console.log("Waiting for data...");

// se crea la conexión a mysql
const connection = mysql.createPool({
  connectionLimit: 500,
  host: "ec2-50-19-200-189.compute-1.amazonaws.com",
  user: "root",
  password: "", //el password de ingreso a mysql
  database: "smartmio",
  port: 3306,
});

client.on("connect", function () {
  client.subscribe("topico1", function (err) {
    if (err) {
      console.log("error en la subscripcion");
    }
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  let json1 = JSON.parse(message.toString());
  json1["fechaHora"] = moment().format(json1["fechaHora"]);
  console.log(json1);

  console.log(json1.variables[0]["pasajeros"]);

  //client.publish('topico2', 'mensaje recibido')
  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      //throw error; //en caso de error en la conexion
    } else {
      console.log("Conexion correcta.");
      let value1 = String(json1.variables[0]["pasajeros"]);
      let value2 = String(json1.variables[0]["estacion"]);
      let variables = `${value1}-${value2}`;
      tempConn.query(
        "INSERT INTO datosNodo VALUES(null, ?, ?,?,?)",
        [json1.id_mio_node, variables, json1.alerta, json1.fechaHora],
        function (error, result) {
          //se ejecuta la inserción
          if (error) {
            throw error;
            console.log("error al ejecutar el query");
          } else {
            tempConn.release();
            console.log("datos almacenados"); //mensaje de respuesta en consola
          }
          //client.end()  //si se habilita esta opción el servicio termina
        }
      );
    }
  });
});
