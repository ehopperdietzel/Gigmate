var express = require('express');
var bodyParser = require('body-parser')
var path = require("path");
var app = express();


var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

//variables a ajustar (crear base de datos gigmate)
var url = 'mongodb://192.168.0.11:27017/gigmate'||'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/';
var port = 8889;

//Servidor manejo de archivos
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname+'/profile.html'));
});
app.listen(port || env.NODE_PORT, "192.168.0.11" ||env.NODE_IP, function () {
  console.log('Servidor Iniciado');
});

//Registro
app.post('/register', function(req, res){
  var params = req.body;
   MongoClient.connect(url,function (err, db) {
    if (err) {
      console.log("Error de server.");
      res.send({status  : 200, success : 'Error de server.'});
    }
    else {

    var collection = db.collection('users');
    collection.find({email:params.email}).toArray(function (err, result) {
      if (err) {
        console.log("Error de server.");
        res.send({status  : 200, success : 'Error de server.'});
      }
      else if (result.length) {
        console.log("Email ocupado.");
        res.send({status  : 200, success : 'Email ocupado.'});
      } else {

        var newUser = {

          name: params.name,
          lname: params.lname,
          sex:params.sex,
          email:params.email,
          pass:params.pass,
          bdate:params.bdate,
          photo:0,
          portrait:0,
          city:params.city,
          region:params.region,
          country:params.country,
          message:'',
          instruments:[],
          styles:[],
          influences:[],
          friends:[],
          state:1

          };
          collection.insert([newUser], function (err, result) {

            if (err) {
              console.log(err);
            } else {
              console.log('Usuarios inscritos:', result.length, result);
            }
          });
          console.log("Registrado exitosamente!");
          res.send({status  : 200, success : 'Registrado exitosamente!'});
        }
      });
    }
  });
});



















/*
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Error de conexion a Mongo:', err);}
  else {
    console.log('Conectado a mongo!', url);

    var collection = db.collection('users');

    var newUser = {

      name: 'Eduardo',
      lname: 'Hopperdietzel',
      sex:1,
      email:'ehopperdietzel@gmail.com',
      pass:'123123',
      bdate:'27/07/1996',
      photo:1,
      portrait:1,
      city:'Valdivia',
      region:'Los ríos',
      country:'Chile',
      message:'Pico pal que lee',
      instruments:[1,4,5,8,9],
      styles:[3,6,8,10],
      influences:["The Beatles", "Pink Floyd", "Nirvana"],
      friends:[{state:1,id:4},{state:1,id:2},{state:1,id:13},{state:1,id:8}],
      state:1

    };

    collection.insert([newUser], function (err, result) {

      if (err) {
        console.log(err);
      } else {
        console.log('Usuarios inscritos:', result.length, result);
      }
    });

    collection.update({id: 2}, {$set: {name: "Pedro"}}, function (err, numUpdated) {
      if (err) {console.log(err);}
      else if (numUpdated) {console.log('Cambios realiados.', numUpdated);}
      else {
    console.log('No se ha encontrado ninguna fila con ese criterio!');
      }
    });

    collection.find({lname: 'Hopperdietzel'}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        for(x=0;x<result.length;x++){
          console.log('Found:', result[x].name);
        }
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
    });


    //We have a cursor now with our find criteria
   var cursor = collection.find({name: 'modulus user'});

   //We need to sort by age descending
   cursor.sort({age: -1});

   //Limit to max 10 records
   cursor.limit(10);

   //Skip specified records. 0 for skipping 0 records.
   cursor.skip(0);

    //db.close();
  }
});

*/















/*
exports.init = init;

var server = require("./server");

server.iniciar();
*/
