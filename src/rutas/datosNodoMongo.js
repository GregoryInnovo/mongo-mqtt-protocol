const { Router } = require("express");
const router = Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://ec2-54-90-171-212.compute-1.amazonaws.com:27017/";

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
  // get the params node from the url
  let id = req.params.nodo;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    // access to the database
    var dbo = db.db("MioDatos");
    // form the query
    var query = { "id-mio-node": id };

    // console.log(query);

    // get the last element by dayTime order by DESC
    dbo
      .collection("datosNodo")
      .find(query)
      .sort({ fechaHora: -1 })
      .limit(1)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        // return the json and status code
        res.json(result);
        db.close();
      });
  });
});

router.get("/nodos/alert/:nodo", (req, res) => {
  // get the params node from the url
  let id = req.params.nodo;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    // access to the database
    var dbo = db.db("MioDatos");
    // query and specific that the document need value alert
    var query = {
      "id-mio-node": id,
      alerta: { $regex: "La capacidad maxima ha sido superada" },
    };

    // console.log(query);

    // get the last element that have an alert by dayTime order by DESC
    dbo
      .collection("datosNodo")
      .find(query)
      .sort({ fechaHora: -1 })
      .limit(1)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        // return the json and status code
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
