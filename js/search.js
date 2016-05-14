var results;
$(document).ready(function(){
  $( ".sbutton" ).click(function( event ) {
    search();
  });
  $("#sname").keyup(function (e) {
    if (e.keyCode == 13) {
      search();
    }
  });
});

$(document).on('click', '.dropdown-menu', function(e) {
    if ($(this).hasClass('mantener')) { e.stopPropagation(); }
});
function search(){
  $(".pWindow").hide();
  $(".rWindow").show();
  //event.preventDefault();
  $.ajax({
    type: 'POST',
    data:{
      name: $( "#sname" ).val(),
      sex:$( "#ssex" ).val(),
      age:$( "#sage" ).val(),
      location:$( "#slocation" ).val(),
      influences:$( "#sinfluences" ).val(),
      instrument:$( "#sinstrument" ).val(),
      style:$( "#sstyle" ).val()
    },
    url: './search',
    success: function(data) {
      results = JSON.parse(data.success);
      displayResults();
    }});
}
function displayResults(){
  $(".sResults").html("");
  if(!results){
    $(".sResults").html("No se encontraron resultados.");
    return;
  }
  var html = "";
  for(i=0;i<results.length;i++){
    html +=  '<div class="media panel panel-default" style="width:600px"><div class="panel-body"><div class="media-left media-middle">'+
              '<img class="media-object img-thumbnail" style="height:140px;width:140px;margin-right:5px" src="'+getPhoto(results[i]._id, results[i].photo)+'"></div><div class="media-body"><div class="row uns" style="font-size:12px"><div class="col-xs-8">'+
              '<ul class="list-inline"><li><div class="rname sel">'+results[i].name+' '+results[i].lname+'</div></li><li>'+results[i].age+' años</li></ul><ul class="list-inline"><li><img style="height:20px;" src="img/location.png"></img></li>'+
              '<li>'+results[i].city+'</li></ul><ul class="list-inline"><li>';
              if(!results[i].instruments){html += "Sin instrumentos.";}
              else{
                for(ii=0;ii<results[i].instruments.length && ii<8;ii++){
                  html += '<img style="height:20px;" src="img/instruments/'+results[i].instruments[ii]+'.png" data-toggle="tooltip" title="'+tl(getInstrumentByID(results[i].instruments[ii]).name)+'"></img>' + "&nbsp&nbsp&nbsp";
                  }
                  if(results[i].instruments.length>9){
                    html += '<span class="glyphicon glyphicon-plus" data-placement="bottom" data-toggle="tooltip" title="';
                    for(ii=8;ii<results[i].instruments.length;ii++){
                      html += tl(getInstrumentByID(results[i].instruments[ii]).name)+'&NewLine;';
                    }
                    html += '"></pan>';
                  }
              }
              html += '</li></ul><ul class="list-inline rInfluences"><li>';
              var infL="";
              var rii = 0;
              var limit = 26;
              if(!results[i].styles){html += "Sin géneros musicales.";}
              else{
                for(ii=0;ii<results[i].styles.length && infL.length<limit;ii++){
                  html += tl(getStyleByID(results[i].styles[ii]).name)  + "&nbsp&nbsp&nbsp";
                  infL += tl(getStyleByID(results[i].styles[ii]).name);
                  rii = ii;
                }
                if(infL.length>=limit){
                  html += '<span class="glyphicon glyphicon-plus" data-placement="bottom" data-toggle="tooltip" title="';
                  for(ii=rii+1;ii<results[i].styles.length;ii++){
                    html += tl(getStyleByID(results[i].styles[ii]).name)+'&NewLine;';
                  }
                  html += '"></pan>';
                }
              }
              html += '</li></ul><ul class="list-inline rInfluences"><li>';
              var infL="";
              var rii = 0;
              if(!results[i].influences.length){html += "Sin influencias.";}
              else{
                for(ii=0;ii<results[i].influences.length && infL.length<limit;ii++){
                  html += tl(results[i].influences[ii]) + "&nbsp&nbsp&nbsp";
                  infL += results[i].influences[ii];
                  rii = ii;
                }
                if(infL.length>=limit && results[i].influences.length != rii+1 ){
                  html += '<span class="glyphicon glyphicon-plus" data-placement="bottom" data-toggle="tooltip" title="';
                  for(ii=rii+1;ii<results[i].influences.length;ii++){
                    html += tl(results[i].influences[ii])+'&NewLine;';
                  }
                  html += '"></pan>';
                }
              }

              html += '</li></ul></div><div class="col-md-4"><div class="row" style="margin-bottom:30px;margin-top:20px">';
              if(results[i]._id != user._id){
                if(friendState(results[i]._id ) == -1){
                  html += '<button type="button" style="width:130px" onclick="sendSolicitud(\''+results[i]._id+'\')" class="btn btn-primary soli but'+results[i]._id+'">Enviar Solicitud</button>';
                }
                if(friendState(results[i]._id ) == 0){
                  html += '<button type="button" style="width:130px" onclick="cancelSolicitud(\''+results[i]._id+'\')" class="btn btn-default soli but'+results[i]._id+'">Revertir Solicitud</button>';
                }
                if(friendState(results[i]._id ) == 1){
                  html += '<button type="button" style="width:130px" onclick="acceptlSolicitud(\''+results[i]._id+'\')" class="btn btn-success soli but'+results[i]._id+'">Aceptar Solicitud</button>';
                }
                if(friendState(results[i]._id ) == 2){
                  html += '<button type="button" style="width:130px" onclick="deleteFriend(\''+results[i]._id+'\')" class="btn btn-danger soli but'+results[i]._id+'">Eliminar Amigo</button>';
                }

                html += '</div><div class="row"><button type="button" onclick="displayProfile(\''+results[i]._id+'\')" style="width:130px" class="btn btn-default">Ver Perfil</button></div></div></div></div></div></div>';
              }
              else{
                html += '</div><div class="row"><button type="button" onclick="setInfo()" style="width:130px" class="btn btn-default">Ver Perfil</button></div></div></div></div></div></div>';
              }

  }
  $(".sResults").append(html);
  $('[data-toggle="tooltip"]').tooltip();
}
function displayProfile(id){
  if(id != user._id){
  $.ajax({
    type: 'POST',
    data:{
      id:id
    },
    url: './profile/id',
    success: function(data) {
      var info = JSON.parse(data.data);
      $('.fnameData').html(tl(info.name));
      $('.lnameData').html(tl(info.lname));
      $(".cityData").html(tl(info.city));
      $(".ageData").html(tl(info.age));
      $(".friendsData").html(tl(info.friends.length));
      $(".editor").hide();
      if(info.sex == 1){$(".sexData").attr("src","img/male.png");}
      else{$(".sexData").attr("src","img/female.png");}
      if(info.photo == 1){$(".photoData").attr("src","img/users/"+info._id+".jpg");updatePortada("img/users/"+info._id+".jpg");}
      else{$(".photoData").attr("src","img/nouser.png");updatePortada("img/nouser.png");}
      if(info.message == ""){$(".messageData").html("Añade un mensaje.");}
      else{$(".messageData").html(tl(info.message));}
      setInstruments(info.instruments);
      setStyles(info.styles);
      setInfluences(info.influences);
      $(".prof").show();
      $(".soli").attr("class","").addClass("btn soli prof")
      //No son amigos
      var button = $(".soli");
      if(info.friendState == -1){
        button.html("Enviar Solicitud")
        .attr("onclick","sendSolicitud('"+info._id+"')")
        .removeClass("btn-default")
        .removeClass("btn-danger")
        .removeClass("btn-success")
        .addClass("btn-primary")
        .addClass("but"+info._id);
      }
      //Solicitud ya enviada
      if(info.friendState == 0){
        button.html("Revertir Solicitud")
        .attr("onclick","cancelSolicitud('"+info._id+"')")
        .removeClass("btn-primary")
        .removeClass("btn-danger")
        .removeClass("btn-success")
        .addClass("btn-default")
        .addClass("but"+info._id);
      }
      //Recive solicitud
      if(info.friendState == 1){
        button.html("Aceptar Solicitud")
        .attr("onclick","acceptSolicitud('"+info._id+"')")
        .removeClass("btn-primary")
        .removeClass("btn-danger")
        .removeClass("btn-default")
        .addClass("btn-success")
        .addClass("but"+info._id);
      }
      //Solicitud aceptada
      if(info.friendState == 2){
        button.html("Eliminar Amigo")
        .attr("onclick","deleteFriend('"+info._id+"')")
        .removeClass("btn-default")
        .removeClass("btn-primary")
        .removeClass("btn-success")
        .addClass("btn-danger")
        .addClass("but"+info._id);
      }
      $(".pWindow").show();
      $(".rWindow").hide();
    }});
  }
  else{
    setInfo(user);

  }
}
function getPhoto(id, photo){
  if(photo==0){
    return "img/nouser.png";
  }
  else{
    return "img/users/"+id+".jpg";
  }
}
function sendSolicitud(id){
  $.ajax({
    type: 'POST',
    data:{
      id: id
    },
    url: 'friends/add',
    success: function(data) {
      $(".but"+id).html("Revertir Solicitud")
      .attr("onclick","cancelSolicitud('"+id+"')")
      .removeClass("btn-primary")
      .removeClass("btn-danger")
      .removeClass("btn-success")
      .addClass("btn-default");
      sockets.emit('friendschange',id);
      for(i=0;i<user.friends.length;i++){
        if(user.friends[i].id == id){
          user.friends[i].state = 1;
        }
      }

    }});
}
function cancelSolicitud(id){
  $.ajax({
    type: 'POST',
    data:{
      id: id
    },
    url: 'friends/cancel',
    success: function(data) {
      $(".but"+id).html("Enviar Solicitud")
      .attr("onclick","sendSolicitud('"+id+"')")
      .removeClass("btn-default")
      .removeClass("btn-danger")
      .removeClass("btn-success")
      .addClass("btn-primary");
      sockets.emit('friendschange',id);
    }});
    for(i=0;i<user.friends.length;i++){
      if(user.friends[i].id == id){
        user.friends.splice(i,1);
      }
    }
    contactsInit();
    messagesInit();
}
function acceptSolicitud(id){
  $.ajax({
    type: 'POST',
    data:{
      id: id
    },
    url: 'friends/accept',
    success: function(data) {
      $(".but"+id).html("Eliminar Amigo")
      .attr("onclick","cancelSolicitud('"+id+"')")
      .removeClass("btn-default")
      .removeClass("btn-primary")
      .removeClass("btn-success")
      .addClass("btn-danger");
      sockets.emit('friendschange',id);
    }});
    for(i=0;i<user.friends.length;i++){
      if(user.friends[i].id == id){
        user.friends[i].state = 2;
      }
    }
    contactsInit();
    messagesInit();
}
function deleteFriend(id){
  BootstrapDialog.confirm({
     title: 'Advertencia',
     message: '¿Seguro que desea eliminar este contacto?',
     type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
     buttonLabel: 'Eliminar', // <-- Default value is 'OK',
     callback: function(result) {
       if(result){
         cancelSolicitud(id);
       }
     }
 });
}
