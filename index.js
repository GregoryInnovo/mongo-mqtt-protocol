var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost");
const mysql = require("mongodb");
var moment = require("moment");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

client.on("connect", function () {
  console.log("CONECCTION 1");
  client.subscribe("topico1", function (err) {
    if (err) {
      console.log("error en la subscripcion");
    }
  });
  console.log("CONECCTION 2");
});

client.on("message", function (topic, message) {
  // message is Buffer
  //   json1 = JSON.parse(message.toString());
  let obj = JSON.parse(message.toString());
  obj["fechaHora"] = moment().format(obj["fechaHora"]);
  console.log(obj);

  //client.publish('topico2', 'mensaje recibido')
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("MioDatos");
    dbo.collection("datosNodo").insertOne(obj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

  //client.end()  //si se habilita esta opción el servicio termina
});