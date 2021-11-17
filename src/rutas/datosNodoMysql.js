const { Router } = require("express");
const router = Router();
const mysql = require("mysql");

// se crea la conexión a mysql
const connection = mysql.createPool({
  connectionLimit: 500,
  host: "ec2-50-19-200-189.compute-1.amazonaws.com",
  user: "root",
  password: "", //el password de ingreso a mysql
  database: "smartmio",
  port: 3306,
});

//function get en la ruta /datos, que trae todos los datos almacenados en la tabla

router.get("/nodos", (req, res) => {
  let json1 = {}; //variable para almacenar cada registro que se lea, en formato json
  let arreglo = []; //variable para almacenar todos los datos, en formato arreglo de json

  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log("Conexion correcta.");
      //ejecución de la consulta
      tempConn.query("SELECT * FROM datosNodo", function (error, result) {
        let resultado = result; //se almacena el resultado de la consulta en la variable resultado
        if (error) {
          throw error;
          res.send("error en la ejecución del query");
        } else {
          tempConn.release(); //se librea la conexión
          for (i = 0; i < resultado.length; i++) {
            //se lee el resultado y se arma el json
            // json1 = {
            //   id_Calle: resultado[i].id_Calle,
            //   slot: resultado[i].slot,
            //   estado: resultado[i].estado,
            //   fechaHora: resultado[i].fechaHora,
            //   fk_data: resultado[i].fk_data,
            // };
            json1 = {
              id: resultado[i].id,
              id_mio_node: resultado[i].id_mio_node,
              variables: resultado[i].variables,
              alerta: resultado[i].alerta,
              fechaHora: resultado[i].fechaHora,
            };
            console.log(json1); //se muestra el json en la consola
            arreglo.push(json1); //se añade el json al arreglo
          }
          res.json(arreglo); //se retorna el arreglo
        }
      });
    }
  });
});

router.get("/nodos/:nodo", (req, res) => {
  let json1 = {}; //variable para almacenar cada registro que se lea, en formato json
  let arreglo = []; //variable para almacenar todos los datos, en formato arreglo de json
  let id = req.params.nodo;
  console.log(id);
  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log("Conexion correcta.");
      //ejecución de la consulta
      tempConn.query(
        "SELECT * from datosnodo WHERE id_mio_node='" +
          String(id) +
          "' ORDER BY fechaHora DESC LIMIT 1;",
        function (error, result) {
          let resultado = result; //se almacena el resultado de la consulta en la variable resultado
          if (error) {
            res.send("error en la ejecución del query");
            throw error;
          } else {
            tempConn.release(); //se librea la conexión
            for (i = 0; i < resultado.length; i++) {
              //se lee el resultado y se arma el json
              // json1 = {
              //   id_Calle: resultado[i].id_Calle,
              //   slot: resultado[i].slot,
              //   estado: resultado[i].estado,
              //   fechaHora: resultado[i].fechaHora,
              //   fk_data: resultado[i].fk_data,
              // };
              json1 = {
                id: resultado[i].id,
                id_mio_node: resultado[i].id_mio_node,
                variables: resultado[i].variables,
                alerta: resultado[i].alerta,
                fechaHora: resultado[i].fechaHora,
              };
              console.log(json1); //se muestra el json en la consola
              arreglo.push(json1); //se añade el json al arreglo
            }
            res.json(arreglo); //se retorna el arreglo
          }
        }
      );
    }
  });
});

router.get("/nodos/alert/:nodo", (req, res) => {
  let json1 = {}; //variable para almacenar cada registro que se lea, en formato json
  let arreglo = []; //variable para almacenar todos los datos, en formato arreglo de json
  let id = req.params.nodo;
  console.log(id);
  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log("Conexion correcta.");
      //ejecución de la consulta
      tempConn.query(
        "SELECT * from datosnodo WHERE id_mio_node='" +
          String(id) +
          "' AND alerta IS NOT NULL ORDER BY fechaHora DESC LIMIT 1;",
        function (error, result) {
          let resultado = result; //se almacena el resultado de la consulta en la variable resultado
          if (error) {
            res.send("error en la ejecución del query");
            throw error;
          } else {
            tempConn.release(); //se librea la conexión
            for (i = 0; i < resultado.length; i++) {
              //se lee el resultado y se arma el json
              // json1 = {
              //   id_Calle: resultado[i].id_Calle,
              //   slot: resultado[i].slot,
              //   estado: resultado[i].estado,
              //   fechaHora: resultado[i].fechaHora,
              //   fk_data: resultado[i].fk_data,
              // };
              json1 = {
                id: resultado[i].id,
                id_mio_node: resultado[i].id_mio_node,
                variables: resultado[i].variables,
                alerta: resultado[i].alerta,
                fechaHora: resultado[i].fechaHora,
              };
              console.log(json1); //se muestra el json en la consola
              arreglo.push(json1); //se añade el json al arreglo
            }
            res.json(arreglo); //se retorna el arreglo
          }
        }
      );
    }
  });
});

module.exports = router;
