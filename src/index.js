var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://172.31.29.249");
var moment = require("moment");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://172.31.29.249:27017/";

console.log("Waiting for data...");

client.on("connect", function () {
  client.subscribe("topico1", function (err) {
    if (err) {
      console.log("error en la subscripcion");
    }
  });
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
