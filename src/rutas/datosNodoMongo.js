const { Router } = require("express");
const router = Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

router.get("/nodos", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("MioDatos");
    dbo
      .collection("datosNodo")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          throw err;
        } else {
          console.log(result);
          res.json(result);
        }
        db.close();
      });
  });
});

router.get("/nodos/:nodo", (req, res) => {
  let id = req.params.nodo; //recogemos el parámetro enviado en la url
  let dataJson;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("MioDatos");
    var query = { "id-mio-node": id };

    // console.log(query);
    dbo
      .collection("datosNodo")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
        db.close();
      });
  });
});

// router.post("/datosm", (req, res) => {
//   console.log(req.body);
//   var json2 = req.body;

//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("CaliDatos");
//     dbo.collection("datosNodo").insertOne(json2, function (err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });
//   res.send("dato insertado");
// });

module.exports = router;
