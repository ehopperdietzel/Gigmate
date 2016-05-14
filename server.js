/*
 Errores:
 -1 = Error de Servidor
  0 = Error de operacion
  1 = Correcto





*/


var express = require('express');
var bodyParser = require('body-parser')
var path = require("path");
var fs = require('fs');
var cookieParser = require('cookie-parser');
var moment = require('moment');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;

var port = 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var url = 'mongodb://ehopperdietzel:123Tobias@jello.modulusmongo.net:27017/awuToq3o';

var users = {};




//Servidor manejo de archivos
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/fonts', express.static(__dirname + '/fonts'));


app.use(cookieParser());

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//Index
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));

});
//Profile
app.get('/profile', function (req, res) {
  if(req.cookies.id === undefined || req.cookies.pass === undefined ){
    return res.end('<script>window.location="/";</script>');
  }
  else{

    res.sendFile(path.join(__dirname+'/profile.html'));
  }
});
//Listen
http.listen(port, function(){
  console.log('Escuchando en el puerto: '+port);
});


//Sockets

io.sockets.on('connection', function (socket) {
  if(socket.request.headers.cookie != undefined){
    var id = socket.request.headers.cookie.split("%22")[1];
    var pass = socket.request.headers.cookie.split("pass=")[1];
    var req = {cookies:{id:id,pass:pass}};
    users[id] = socket.id;
    getUserData(req, function(ans){
      MongoClient.connect(url,function (err, db) {
        var collection = db.collection('users');
        var friends = ans.friends;
        collection.find().toArray(function (err, re) {
          for(i=0;i<friends.length;i++){
            io.to(users[friends[i].id]).emit('hellohello', id);
            for(x=0;x<re.length;x++){
              if(re[x]._id.toString('utf-8') === friends[i].id.toString('utf-8')){
                friends[i].name = re[x].name;
                friends[i].lname = re[x].lname;
                friends[i].photo = re[x].photo;
              }
            }
          }


          socket.on('disconnect', function () {
            getUserData(req, function(anst){
              for(z=0;z<anst.friends.length;z++){
                io.to(users[anst.friends[z].id]).emit('byebye', id);
                console.log(anst.friends[z]);
              }
              delete users[id];
              console.log("byebye");
            });
          });

          //Envia los mensajes al iniciar la aplicacion
          socket.on('messageInit', function (pid) {
            var state = false;
            if(typeof users[pid] != "undefined") {
                state = true;
              }
            MongoClient.connect(url,function (err, db) {
              var collection = db.collection('messages');
              collection.find().toArray(function (err, re) {
                  var messages = [];
                  for(i=0;i<re.length;i++){
                    if(re[i].from == id && re[i].to == pid || re[i].from == pid && re[i].to == id){
                      messages.push(re[i])
                    }
                  }
                  var data = {id:pid,state:state,messages:messages};
                  console.log(data);
                  io.to(users[id]).emit('messageArrive', data);
              });
            });
          });

          //Envia y guarda mensaje
          socket.on('messageSend', function (message) {
            MongoClient.connect(url,function (err, db) {
              var collection = db.collection('messages');
              var newMessage = {
                from:id,
                to:message.id,
                message:message.txt,
                date:new Date().getTime(),
                view:0
              };
              collection.insert([newMessage], function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Nuevo mensaje:', result.length, result);
                  io.to(users[message.id]).emit('messageNew', {id:id,state:true,message:newMessage});

                }
              });
            });
          });
          //Añade el visto
          socket.on('messageSeen', function (pid) {
            MongoClient.connect(url,function (err, db) {
              var collection = db.collection('messages');

              //{ $or: [ {form:id,to:pid }, { form:pid,to:id } ] }

              collection.update({ $and: [ {from:pid}, {to:id } ] } ,{ $set: { view: 1 } },{multi:true}, function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("TE DEJARON EL VISTO!!!");
                  io.to(users[pid]).emit('lastMessageSeen', id);

                }
              });
            });
          });
          socket.on('friendschange', function (pid) {
            MongoClient.connect(url,function (err, db) {
              var collection = db.collection('users');
              var friends = ans.friends;
              collection.find().toArray(function (err, re) {
                var fnds = [];
                for(x=0;x<re.length;x++){
                  if(re[x]._id.toString('utf-8') === pid.toString('utf-8')){
                    fnds = re[x].friends;
                  }
                }
                for(i=0;i<fnds.length;i++){
                  for(x=0;x<re.length;x++){
                    if(re[x]._id.toString('utf-8') === fnds[i].id.toString('utf-8')){
                      fnds[i].name = re[x].name;
                      fnds[i].lname = re[x].lname;
                      fnds[i].photo = re[x].photo;
                    }
                  }
                }

                  io.to(users[pid]).emit('notification', fnds);
              });
            });
          });

          function updateClients() {
              io.sockets.emit('update', users);
          }





        });
      });
    });
  }
});



//Image Uploader
app.post('/upload',function(req,res){
  getUserData(req, function(ans){
    var base64Data = req.body.photo.replace(/^data:image\/jpeg;base64,/, "");
    console.log(base64Data);
    fs.writeFile("img/users/"+ans._id+".jpg", base64Data, 'base64', function(err) {
      if(!err){
        MongoClient.connect(url,function (err, db) {
         if (err) {
           console.log("Error de server.");
           res.send({status  : -1, success : 'Error de server.'});
         }
         else {

         var collection = db.collection('users');

         collection.updateOne({ "_id" : ans._id},{ $set: { "photo": 1 } },
            function(err, results) {
              res.send({status  : 1, success : 'Subido!'});
            });
         }
       });
      }
      else{
        res.send({status  : -1, success : 'Error de server.'});
      }
    });
  });
});
//Get Image
app.post('/get/image', function (req, res) {
  var id = req.body.id;
  MongoClient.connect(url,function (err, db) {
    var collection = db.collection('users');
    collection.find({_id:ObjectId(id)}).toArray(function (err, result) {
      if (err) {
        console.log("Error de server.");
        res.send({status  : -1, success : 'Error de server.'});
      } else {
        console.log("Imagen encontrada!");
        console.log(result);
        res.send({status  : 0, data : result[0].photo});
      }
    });
  });
});
//Login
app.post('/login', function (req, res) {
  var p = req.body;
  MongoClient.connect(url,function (err, db) {
    var collection = db.collection('users');
    collection.find({email:p.email,pass:p.pass}).toArray(function (err, result) {
      if (err) {
        console.log("Error de server.");
        res.send({status  : -1, success : 'Error de server.'});
      }
      else if (result.length) {
        console.log("Sesion iniciada.");
        console.log(ip+":"+port);
        res.cookie('id' , result[0]._id, {expire : new Date() + 9999});
        res.cookie('pass' , result[0].pass, {expire : new Date() + 9999});
        res.send({status  : 1, success : 'Sesion iniciada.'});
      } else {
        console.log("Datos incorrectos.");
        res.send({status  : 0, success : 'Datos incorrectos.'});
      }
    });
  });
});
//Send User data
app.post('/data', function (req, res) {
  getUserData(req, function(ans){
    var data = ans;
    data.age = getAge(data.bdate);
    data.data = {};
    data.data.instruments = instruments;
    data.data.styles = styles;
    MongoClient.connect(url,function (err, db) {
      var collection = db.collection('users');
      collection.find().toArray(function (err, re) {
        for(i=0;i<data.friends.length;i++){
          for(x=0;x<re.length;x++){
            if(re[x]._id.toString('utf-8') === data.friends[i].id.toString('utf-8')){
              data.friends[i].name = re[x].name;
              data.friends[i].lname = re[x].lname;
              data.friends[i].photo = re[x].photo;
            }
          }
        }
        console.log("User data enviada!");
        res.send({status  : 1, data : data});
      });
    });
  });
});
//Send User Profile by Id
app.post('/profile/id', function (req, res) {
  var id = req.body.id;
  getUserData(req, function(an){
    MongoClient.connect(url,function (err, db) {
      var collection = db.collection('users');
      collection.find({_id:ObjectId(id)}).toArray(function (err, result) {
        if(result.length){
          var ans = result[0];
          ans.pass = "";
          ans.age = getAge(ans.bdate);
          var friends = an.friends;
          ans.friendState = -1;
          for(x=0;x<friends.length;x++){
            if(friends[x].id==id){
                ans.friendState = friends[x].state;
            }
          }
          console.log("User data enviada!");
          res.send({status  : 1, data : JSON.stringify(ans)});
        }
        else{
          return res.end({state:-1,message:"Perdida de conexión."});
        }
      });
    });
  });
});
//Change Personal Info
app.post('/update/personal', function (req, res) {
  getUserData(req, function(ans){
    MongoClient.connect(url,function (err, db) {
     if (err) {
       console.log("Error de server.");
       res.send({status  : -1, success : 'Error de server.'});
     }
     else {

     var collection = db.collection('users');

     collection.updateOne({ "_id" : ans._id},{ $set: {
       "name": req.body.name,
       "lname": req.body.lname,
       "pass": req.body.pass,
       "bdate": req.body.bdate,
       "sex": req.body.sex,
       "city": req.body.city,
       "region": req.body.region,
       "country": req.body.country
     } },
        function(err, results) {
          if (err) {
            console.log("Error de server.");
            res.send({status  : -1, success : 'Error de server.'});
          }
          else {
            console.log("Updated!");
            res.send({status  : 1, success : 'Updated.'});
        }
      });
     }
   });
  });
});
//Change Message
app.post('/update/message', function (req, res) {
  getUserData(req, function(ans){
    MongoClient.connect(url,function (err, db) {
     if (err) {
       console.log("Error de server.");
       res.send({status  : -1, success : 'Error de server.'});
     }
     else {

     var collection = db.collection('users');

     collection.updateOne({ "_id" : ans._id},{ $set: { "message": req.body.message } },
        function(err, results) {
          if (err) {
            console.log("Error de server.");
            res.send({status  : -1, success : 'Error de server.'});
          }
          else {
            console.log("Updated!");
            res.send({status  : 1, success : 'Updated.'});
        }
      });
     }
   });
  });
});
//Change Instruments
app.post('/update/instruments', function (req, res) {
  var inst = req.body.instruments;
  console.log(inst);
  getUserData(req, function(ans){
    MongoClient.connect(url,function (err, db) {
     if (err) {
       console.log("Error de server 1.");
       res.send({status  : -1, success : 'Error de server.'});
     }
     else {

       if(typeof inst != "undefined"){
         if(inst.length!=0){
           if(checkIfInstrumentCorrect(inst)){
             updateInstruments(db,inst,ans,res);
           }
           else{
             console.log("Error de server 1.");
             res.send({status  : -1, success : 'Error de server.'});
           }
         }
         else{
           updateInstruments(db,inst,ans,res);
           return;
         }
      }
      else{
        updateInstruments(db,[],ans,res);
      }
    }
  });
});
});
//Change Styles
app.post('/update/styles', function (req, res) {
  var inst = req.body.styles;
  console.log(inst);
  getUserData(req, function(ans){
    MongoClient.connect(url,function (err, db) {
     if (err) {
       console.log("Error de server 1.");
       res.send({status  : -1, success : 'Error de server.'});
     }
     else {

       if(typeof inst != "undefined"){
         if(inst.length!=0){
           if(checkIfStyleCorrect(inst)){
             updateStyles(db,inst,ans,res);
           }
           else{
             console.log("Error de server 1.");
             res.send({status  : -1, success : 'Error de server.'});
           }
         }
         else{
           updateStyles(db,inst,ans,res);
           return;
         }
      }
      else{
        updateStyles(db,[],ans,res);
      }
    }
  });
});
});
//Change Influences
app.post('/update/influences', function (req, res) {
  var inst = req.body.influences;
  console.log(inst);
  getUserData(req, function(ans){
    MongoClient.connect(url,function (err, db) {
     if (err) {
       console.log("Error de server 1.");
       res.send({status  : -1, success : 'Error de server.'});
     }
     else {

       if(typeof inst != "undefined"){
         if(inst.length!=0){
           console.log(checkIfInfluenceCorrect(inst));
           if(checkIfInfluenceCorrect(inst)){
             updateInfluences(db,inst,ans,res);
           }
           else{
             console.log("Error de server 2.");
             res.send({status  : -1, success : 'Error de server.'});
           }
         }
         else{
           updateInfluences(db,inst,ans,res);
           return;
         }
      }
      else{
        updateInfluences(db,[],ans,res);
      }
    }
  });
});
});
function updateInstruments(db,inst,ans,res){
  var collection = db.collection('users');
  collection.updateOne({ "_id" : ans._id},{ $set: { "instruments": inst } },
     function(err, results) {
       if (err) {
         console.log("Error de server 3.");
         res.send({status  : -1, success : 'Error de server.'});
       }
       else {
         console.log("Updated!");
         res.send({status  : 1, success : 'Updated.'});
       }
  });
}
function updateStyles(db,inst,ans,res){
  var collection = db.collection('users');
  collection.updateOne({ "_id" : ans._id},{ $set: { "styles": inst } },
     function(err, results) {
       if (err) {
         console.log("Error de server 3.");
         res.send({status  : -1, success : 'Error de server.'});
       }
       else {
         console.log("Updated!");
         res.send({status  : 1, success : 'Updated.'});
       }
  });
}
function updateInfluences(db,inst,ans,res){
  var collection = db.collection('users');
  collection.updateOne({ "_id" : ans._id},{ $set: { "influences": inst } },
     function(err, results) {
       if (err) {
         console.log("Error de server 3.");
         res.send({status  : -1, success : 'Error de server.'});
       }
       else {
         console.log("Updated!");
         res.send({status  : 1, success : 'Updated.'});
       }
  });
}
function checkIfInstrumentCorrect(inst){
  for(i=0;i<inst.length;i++){
    var pass = false;
    for(x=0;x<instruments.length;x++){
      if(instruments[x].id == inst[i]){
        pass = true;
      }
    }
    if(!pass){return false;}
  }
  return true;
}
function checkIfStyleCorrect(inst){
  for(i=0;i<inst.length;i++){
    var pass = false;
    for(x=0;x<styles.length;x++){
      if(styles[x].id == inst[i]){
        pass = true;
      }
    }
    if(!pass){return false;}
  }
  return true;
}
function checkIfInfluenceCorrect(inst){
  for(i=0;i<inst.length;i++){
    for(x=0;x<inst.length;x++){
      if(x!=i){
        if(inst[i] ==  inst[x] || inst[i]==""){
          return false;
        }
      }
    }
  }
  return true;
}

//Registro
app.post('/register', function(req, res){
  var params = req.body;
   MongoClient.connect(url,function (err, db) {
    if (err) {
      console.log("Error de server.");
      res.send({status  : -1, success : 'Error de server.'});
    }
    else {

    var collection = db.collection('users');
    collection.find({email:params.email}).toArray(function (err, result) {
      if (err) {
        console.log("Error de server.");
        res.send({status  : -1, success : 'Error de server.'});
      }
      else if (result.length) {
        console.log("Email ocupado.");
        res.send({status  : 0, success : 'Email ocupado.'});
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
          res.send({status  : 1, success : 'Registrado exitosamente!'});
        }
      });
    }
  });
});
//Logout
app.get('/logout', function (req, res) {

    res.clearCookie('id');
    res.clearCookie('pass');
    console.log("Usuario cerró sesion!");
    res.end('<script>window.location="/";</script>');

});
//Resultados de busqueda
app.post('/search', function(req, res){
  console.log("Busqueda iniciada.");
  getUserData(req,function(userData){
  var p = req.body;
  MongoClient.connect(url,function (err, db) {
  var collection = db.collection('users');
  collection.find().toArray(function (err, result) {
    if (err) {console.log(err);}
    else if (result.length) {

      var results =[];
      for(x=0;x<result.length;x++){

        //Logica
        var name = influences = city = region = country = instrument = style = sex = age = state = false;
        var nameCount = influencesCount = 0;

        //Estado
        if(p.state!=-1){
          state = true;
        }

        //Nombre
        if(p.name.length>0){
          var sname = p.name;
          if(sname.split(" ").length>0){
            sname = sname.split(" ");
            for(i=0;i<sname.length;i++){
              if((result[x].name+result[x].lname).toLowerCase().indexOf(sname[i].toLowerCase()) > -1){
                nameCount++;
                name = true;
              }
            }
          }
          else{
            if((result[x].name+result[x].lname).toLowerCase().indexOf(sname.toLowerCase()) > -1){
              nameCount++;
              name = true;
            }
          }
        }
        else{
          name = true;
        }
        //City
        if(p.location==0){
          region = city = true;
          console.log(result[x].country +"--"+ userData.country);
          if(result[x].country == userData.country){
            country = true;
          }
        }
        if(p.location==1){
          console.log(result[x].region +"--"+ userData.region);
          country = city = true;
          if(result[x].region == userData.region){
            region = true;
          }
        }
        if(p.location==2){
          console.log(result[x].city +"--"+ userData.city);
          country = region = true;
          if(result[x].city == userData.city){
            city = true;
          }
        }
        //Instrument
        if(p.instrument!=-1){
          for(i=0;i<result[x].instruments;i++){
            if(result[i].instruments[i] == p.instrument){
              instrument = true;
            }
          }
        }
        else{
          instrument = true;
        }
        //Style
        if(p.style!=-1){
          for(i=0;i<result[x].styles;i++){
            if(result[i].styles[i] == p.style){
              style = true;
            }
          }
        }
        else{
          style = true;
        }
        //Sex
        if(p.sex!=-1){
            if(parseInt(result[x].sex) == parseInt(p.sex)){
              console.log(result[x].sex+"   "+p.sex);
              sex = true;
            }
        }
        else{
          sex = true;
        }
        //Edad
        if(p.age!=-1){
            var cAge = getAge(result[x].bdate);
            if(p.age == 1){
              if(cAge < 18){
                age = true;
              }
            }
            if(p.age == 2){
              if(cAge >= 18 && cAge <= 25){
                age = true;
              }
            }
            if(p.age == 3){
              if(cAge >= 25 && cAge <= 35){
                age = true;
              }
            }
            if(p.age == 4){
              if(cAge >= 35 && cAge <= 45){
                age = true;
              }
            }
            if(p.age == 5){
              if(cAge>= 45 && cAge<= 65){
                age = true;
              }
            }
            if(p.age == 6){
              if(cAge >= 65){
                age = true;
              }
            }
          }
        else{
          age = true;
        }
        //Infuencias
        if(p.influences.length>0){
          if(result[x].influences.length>0){
            var inf = p.influences.split(" ");
            for(i=0;i<inf.length;i++){
              if((result[x].influences).indexOf(inf[i]) > -1){
                influencesCount++;
                influences = true;
              }
            }
          }
        }
        else{
          influences = true;
        }

        if(name && influences && city && region && country && instrument && style && sex && age && state){
          result[x].nameCount = nameCount;
          result[x].influencesCount = influencesCount;
          result[x].pass = "";
          result[x].age = getAge(result[x].bdate);
          for(i=0;i<userData.friends.length;i++){
            if(result[x].id == userData.friends[i].id){
              result[x].friends = userData.friends[i].state;
            }
          }
          results.push(result[x]);
          //console.log(result[x]);
        }



        //console.log("Name:"+name+" Influences:"+influences+" City:"+city+" Region:"+region+" Country:"+country+" instrument:"+instrument+" Style:"+style+" Sex:"+sex+" Age:"+age + " State:"+state);
        }
        //console.log(results);
        res.send({status  : 200, success :JSON.stringify(results)});
    } else {
      console.log('No hay resultados');
    }
  });
  });
  });
});
//Friend add
app.post('/friends/add',function(req,res){
  getUserData(req, function(ans){
    var id = req.body.id;
    getUserById(id,req,function(fnd){
      var friends = ans.friends;
      //Detecta si ya son amigos
      for(i=0;i<friends.length;i++){
        if(friends[i].id == id){
          return res.send({status  : 0, success : 'Solicitud ya enviada.'});
        }
      }

      var newFriends = JSON.parse(JSON.stringify(ans.friends));
      newFriends.push({id:id,state:0,view:1});

      var hisNewFriends = JSON.parse(JSON.stringify(fnd.friends));
      hisNewFriends.push({id:ans._id,state:1,view:0});

      MongoClient.connect(url,function (err, db) {
       if (err) {
         console.log("Error de server.");
         res.send({status  : -1, success : 'Error de server.'});
       }
       else {

       var collection = db.collection('users');

       collection.updateOne({ _id : ans._id},{ $set: { friends: newFriends } },
          function(err, results) {
            collection.updateOne({ _id : fnd._id},{ $set: { friends: hisNewFriends } },
               function(err1, results1) {
                 console.log("Solicitud enviada!");
                 res.send({status  : 1, success : 'Solicitud enviada!'});
               });
          });
       }
     });
   });
 });
});
//Friend cancel
app.post('/friends/cancel',function(req,res){
  getUserData(req, function(ans){
    var id = req.body.id;//Mi id
    getUserById(id,req,function(fnd){
      var friends = ans.friends;
      var myIndex, hisiIndex;
      //Detecta si ya son amigos
      var error = true;
      for(i=0;i<friends.length;i++){
        if(friends[i].id == id){
          myIndex = i;
          error = false;
        }
      }
      if(error){
        return res.send({status  : 0, success : 'No existe solicitud previa.'});
      }

      var newFriends = JSON.parse(JSON.stringify(ans.friends));
      newFriends.splice(myIndex, 1);

      var hisNewFriends = JSON.parse(JSON.stringify(fnd.friends));
      for(i=0;i<hisNewFriends.length;i++){
        if(hisNewFriends[i].id == ans._id){
          hisIndex = i;
        }
      }
      hisNewFriends.splice(hisIndex, 1);

      MongoClient.connect(url,function (err, db) {
       if (err) {
         console.log("Error de server.");
         res.send({status  : -1, success : 'Error de server.'});
       }
       else {

       var collection = db.collection('users');

       collection.updateOne({ _id : ans._id},{ $set: { friends: newFriends } },
          function(err, results) {
            collection.updateOne({ _id : fnd._id},{ $set: { friends: hisNewFriends } },
               function(err1, results1) {
                 console.log("Cancelacion enviada!");
                 res.send({status  : 1, success : 'Cancelacion enviada!'});
               });
          });
       }
     });
   });
 });
});
//Friend accept
app.post('/friends/accept',function(req,res){
  getUserData(req, function(ans){
    var id = req.body.id;//Mi id
    getUserById(id,req,function(fnd){
      var friends = ans.friends;
      var myIndex, hisiIndex;
      //Detecta si ya son amigos
      var error = true;
      for(i=0;i<friends.length;i++){
        if(friends[i].id == id){
          myIndex = i;
          error = false;
        }
      }
      if(error){
        return res.send({status  : 0, success : 'No existe solicitud previa.'});
      }

      var newFriends = JSON.parse(JSON.stringify(ans.friends));
      newFriends[myIndex].state = 2;
      newFriends[myIndex].view = 1;

      var hisNewFriends = JSON.parse(JSON.stringify(fnd.friends));
      for(i=0;i<hisNewFriends.length;i++){
        if(hisNewFriends[i].id == ans._id){
          hisIndex = i;
        }
      }
      hisNewFriends[hisIndex].state = 2;
      hisNewFriends[hisIndex].view = 0;

      MongoClient.connect(url,function (err, db) {
       if (err) {
         console.log("Error de server.");
         res.send({status  : -1, success : 'Error de server.'});
       }
       else {

       var collection = db.collection('users');

       collection.updateOne({ _id : ans._id},{ $set: { friends: newFriends } },
          function(err, results) {
            collection.updateOne({ _id : fnd._id},{ $set: { friends: hisNewFriends } },
               function(err1, results1) {
                 console.log("Aceptacion enviada!");
                 res.send({status  : 1, success : 'Aceptacion enviada!'});
               });
          });
       }
     });
   });
 });
});
//Friend seen
app.post('/friends/seen',function(req,res){
  getUserData(req, function(ans){
      var newFriends = JSON.parse(JSON.stringify(ans.friends));
      var error = true;
      for(i=0;i<newFriends.length;i++){
          newFriends[i].view = 1;
      }

      MongoClient.connect(url,function (err, db) {
       if (err) {
         console.log("Error de server.");
         res.send({status  : -1, success : 'Error de server.'});
       }
       else {

       var collection = db.collection('users');

       collection.updateOne({ _id : ans._id},{ $set: { friends: newFriends } },
          function(err, results) {
            console.log("VISTO!");
            res.send({status  : 1, success : 'Visto!'});
          });
       }
     });
 });
});
function getUserData(req, callback){
  if(req.cookies.id === undefined || req.cookies.pass === undefined ){
    return;// res.end({state:-3,message:"loggedOut"});
  }
  else{
  var id = req.cookies.id;
  var pass = req.cookies.pass;
  var ret = MongoClient.connect(url,function (err, db) {
    var collection = db.collection('users');
    collection.find({_id:ObjectId(id),pass:pass}).toArray(function (err, result) {
      if(result.length){
        callback(result[0]);
      }
      else{
        return;// res.end({state:-3,message:"loggedOut"});
      }
    });
  });
  }
}
function getUserById(id, req, callback){

  MongoClient.connect(url,function (err, db) {
    var collection = db.collection('users');
    collection.find({_id:ObjectId(id)}).toArray(function (err, result) {
      if(result.length){
        callback(result[0]);
      }
      else{
        callback([]);
      }
    });
  });

}

function getAge(birthday) { // birthday is a date
   var age = new Date(birthday);
   var ageDifMs = Date.now() - age.getTime();
   var ageDate = new Date(ageDifMs); // miliseconds from epoch
   ret = Math.abs(ageDate.getUTCFullYear() - 1970);
   if(ret == undefined){
     return 0;
   }
   return ret;
 }

var instruments = [
      {"type":"Viento","name":"Flauta dulce","id":1},
      {"type":"Viento","name":"Trompeta","id":2},
      {"type":"Viento","name":"Clarinete","id":3},
      {"type":"Viento","name":"Acoredeon","id":4},
      {"type":"Cuerda","name":"Guitarra Acústica","id":5},
      {"type":"Cuerda","name":"Banjo","id":6},
      {"type":"Cuerda","name":"Piano","id":7},
      {"type":"Cuerda","name":"Harpa","id":8},
      {"type":"Percusión","name":"Batería","id":9},
      {"type":"Percusión","name":"Tambór","id":10},
      {"type":"Percusión","name":"Pandero","id":11},
      {"type":"Percusión","name":"Maracas","id":12},
      {"type":"Cuerda","name":"Guitarra Eléctrica","id":13},
      {"type":"Viento","name":"Gaita","id":14},
      {"type":"Cuerda","name":"Balalaica","id":15},
      {"type":"Cuerda","name":"Violín","id":16},
      {"type":"Cuerda","name":"Contra Bajo","id":17},
      {"type":"Cuerda","name":"Lira","id":18},
      {"type":"Viento","name":"Armónica","id":19},
      {"type":"Viento","name":"Zampoña","id":20},
      {"type":"Percusión","name":"Xilófono","id":21},
      {"type":"Viento","name":"Trombón","id":22},
      {"type":"Viento","name":"Tuba","id":23},
      {"type":"Viento","name":"Trompa","id":24},
      {"type":"Viento","name":"Saxofón","id":25},
      {"type":"Cuerda","name":"Mandolín","id":26},
      {"type":"Cuerda","name":"Bajo","id":27},
      {"type":"Percusión","name":"Teclado","id":28},
      {"type":"Viento","name":"Órgano","id":29}
  ];
var styles =[
  {"name":"Rock","id":1},
  {"name":"Rock-Alternativo","id":2},
  {"name":"Rock-Psicodélico","id":3},
  {"name":"Rock-Indie","id":4},
  {"name":"Jazz","id":5},
  {"name":"Pop","id":6},
  {"name":"Metal","id":7},
  {"name":"Clásica","id":8},
  {"name":"Grounge","id":9},
  {"name":"Punk","id":10},
  {"name":"Electro","id":11},
  {"name":"Soundtrack","id":12},
  {"name":"Dance","id":13},
  {"name":"Hip-Hop","id":14},
  {"name":"Rap","id":15},
  {"name":"Reggae","id":16},
  {"name":"Reggaeton","id":17},
  {"name":"Salsa","id":18},
  {"name":"Cumbia","id":19}
];






/*
exports.init = init;

var server = require("./server");

server.iniciar();
*/
