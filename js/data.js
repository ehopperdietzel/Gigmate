var user, t, y, newInstruments, usedInstruments, newStyles, usedStyles, newInfluences, notifIds, contacts = [];
$(document).ready(function(){
  init();
  $(".chatInput").keyup(function (e) {
    if (e.keyCode == 13 && $(".chatInput").val().length>0) {
      sockets.emit('messageSend',{id:currentChat,txt:$(".chatInput").val()});
      for(i=0;i<contacts.length;i++){
        if(contacts[i].id === currentChat){
          contacts[i].messages.push({
            from:user._id,
            to:currentChat,
            message:$(".chatInput").val(),
            date:new Date(),
            view:0
          });
        }
      }
      conMessage(currentChat,$(".chatInput").val(),user._id);
      $('.visto').hide();
      $(".chatMessages").append('<div class="chatMessageB"><div class="mess">'+tl($(".chatInput").val())+'</div></div>');
      $(".chatMessagesContainer").scrollTop($(".chatMessagesContainer")[0].scrollHeight);
      $(".chatInput").val('');
    }
  });
});

function conCounter(id,number){
  if(number>0){
    $(".count"+id).html(number).show();
  }
  else{
    $(".count"+id).hide();
  }
}

function conMessage(id,message,sender){
  $(".con"+contacts[0].id).before($(".con"+id));
  if(sender == user._id){
    $(".mess"+id).html("Tu: "+tl(message));
  }
  else{
    $(".mess"+id).html(getContactById(id).name+": "+tl(message));
  }
}

function conState(id,connected){
  if(connected==true){
    $(".stat"+id).attr("style","background:#4E4");
  }
  else{
    $(".stat"+id).attr("style","background:gray");
  }
}

function getContactById(id){
  for(i=0;i<contacts.length;i++){
    if(id==contacts[i].id){
      console.log(contacts[i]);
      return contacts[i];
    }
  }
}
function init(){
  $.ajax({
    type: 'POST',
    url: '/data',
    success: function(data) {
      if(data.status==1){
        console.log(data.data.friends);
        user = data.data;
        setInfo(data.data);
        contactsInit();
        messagesInit();
      }
      else{
        BootstrapDialog.alert({
           title: 'Error',
           message: 'El server no responde',
           type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
           closable: false, // <-- Default value is false
           draggable: false, // <-- Default value is false
           buttonLabel: 'Reintentar', // <-- Default value is 'OK',
           callback: function(result) {
             init();
           }
       });
      }
    }
  });
}
function setInfo(){
  var data = user;
  getSolicitudes();
  $(".pWindow").show();
  $(".rWindow").hide();
  $(".prof").hide();
  $(".fnameDatas").html(tl(data.name));
  $(".fnameData").html(tl(data.name));
  $(".lnameData").html(tl(data.lname));
  $(".cityData").html(tl(data.city));
  city = data.city;
  region = data.region;
  country = data.country;
  $(".fnamePersona").val(data.name);
  $(".lnamePersona").val(data.lname);
  $(".cityPersona").val(data.city);
  $(".agePersona").val(data.bdate);
  $(".passPersona").val(data.pass);

  $(".ageData").html(tl(data.age));
  $(".friendsData").html(tl(data.friends.length));
  $(".editor").show();
  if(data.sex == 1){$(".sexData").attr("src","img/male.png");$(".sexPersona option[value='1']").prop('selected', true);}
  else{$(".sexData").attr("src","img/female.png");$(".sexPersona option[value='2']").prop('selected', true);}
  if(data.photo == 1){$(".photoData").attr("src","img/users/"+data._id+".jpg");updatePortada("img/users/"+data._id+".jpg");}
  else{$(".photoData").attr("src","img/nouser.png");updatePortada("img/nouser.png");}
  if(data.message == ""){$(".messageData").html("Añade un mensaje.");}
  else{$(".messageData").html(tl(data.message));}
  $('#messageID').val(user.message);
  setInstruments(data.instruments);
  addInstrument(data);
  //setStyles();
  addStyle();
  setStyles(data.styles);
  setInfluences(data.influences);
}
function getInstrumentByID(id){
  var ins = user.data.instruments;
  for(x=0;x<ins.length;x++){
    if(parseInt(id) == parseInt(ins[x].id)){
      return ins[x];
    }
  }
}
function getIndexById(id){
  var ins = JSON.parse(JSON.stringify(usedInstruments));
  for(x=0;x<ins.length;x++){
    if(parseInt(id) == parseInt(ins[x].id)){
      return x;
    }
  }
}
function showInstrumentsEditor(){
  displayEditInstruments();
  $('#modalInstruments').modal('show');
}
function displayEditInstruments(){
  $('.addedInstruments').html("");
  usedInstruments = JSON.parse(JSON.stringify(user.data.instruments));
  newInstruments = JSON.parse(JSON.stringify(user.instruments));
  for(i=0;i<newInstruments.length;i++){
    var id = newInstruments[i];
    $('.addedInstruments').append('<a class="btn icon-btn btn-danger delBtn" onclick="deleteIns(this,'+id+')"><span class="glyphicon btn-glyphicon glyphicon-trash img-circle text-danger"></span> ' +getInstrumentByID(id).name+'</a>');
    usedInstruments.splice(getIndexById(id),1);
  }
}
function addInstrument(data){
  displayEditInstruments();
  t = $('#instrumentSearch').typeahead({source:usedInstruments});
  $('#instrumentSearch').change(function() {
    var current = $('#instrumentSearch').typeahead("getActive");
    if (current) {
        if (current.name == $('#instrumentSearch').val()) {
            usedInstruments.splice(getIndexById(current.id),1);
            t.data('typeahead').source = usedInstruments;
            newInstruments.push(current.id);
            $('.addedInstruments').append('<a class="btn icon-btn btn-danger delBtn" onclick="deleteIns(this,'+current.id+')"><span class="glyphicon btn-glyphicon glyphicon-trash img-circle text-danger"></span> ' +current.name+'</a>');
            $('#instrumentSearch').val("");
        }
      }
  });
}
function uploadInstruments(){
  waitingDialog.show('Subiendo');
  $.ajax({
    type: 'POST',
    data:{instruments:newInstruments},
    url: '/update/instruments',
    success: function(data) {
      if(data.status==1){
        waitingDialog.hide();
        user.instruments = newInstruments;
        setInstruments(newInstruments);
      }
      else{
        waitingDialog.hide();
        BootstrapDialog.alert({
           title: 'Error',
           message: 'El server no responde',
           type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
           closable: false, // <-- Default value is false
           draggable: false, // <-- Default value is false
           buttonLabel: 'Ok', // <-- Default value is 'OK',
           callback: function(result) {
           }
       });
      }
    }
  });
}
function deleteIns(e,id){
  var id = id;
  usedInstruments.push(getInstrumentByID(id));
  t.data('typeahead').source = usedInstruments;
  newInstruments.splice(newInstruments.map(Number).indexOf(id),1);
  $(e).remove();
}
function updatePortada(url){
  $(".portada").hide();
  $(".portada").css({"background-image":"url('"+url+"')"});
  $('.bluer').blurjs({
         source: '.portada',
         radius: 20
     });
    $(".portada").fadeIn(1000);
}
function setInstruments(data){
  if(!data.length){
    $(".instrumentsData").html("Sin instrumentos.");
  }
  else{
    var html = "<div style='width:100%;overflow-x:scroll;white-space: nowrap;'><ul>";
    for(i=0;i<data.length;i++){
      html += '<li class="insImage"><img data-toggle="tooltip" title="'+tl(getInstrumentByID(data[i]).name)+'" src="img/instruments/'+data[i]+'.png"></img></li>';
    }
    html += "</ul></div>";
    $(".instrumentsData").html(html);
    $('[data-toggle="tooltip"]').tooltip();
  }
}
function getStyleByID(id){
  var ins = user.data.styles;
  for(x=0;x<ins.length;x++){
    if(parseInt(id) == parseInt(ins[x].id)){
      return ins[x];
    }
  }
}
function getIndexByStyleId(id){
  var ins = JSON.parse(JSON.stringify(usedStyles));
  for(x=0;x<ins.length;x++){
    if(parseInt(id) == parseInt(ins[x].id)){
      return x;
    }
  }
}
function showStylesEditor(){
  displayStylesMenu();
  $('#modalStyles').modal('show');
}
function displayStylesMenu(){
  $('.addedStyles').html("");
  usedStyles = JSON.parse(JSON.stringify(user.data.styles));
  newStyles = JSON.parse(JSON.stringify(user.styles));
  for(i=0;i<newStyles.length;i++){
    var id = newStyles[i];
    $('.addedStyles').append('<a class="btn icon-btn btn-danger delBtn" onclick="deleteSty(this,'+id+')"><span class="glyphicon btn-glyphicon glyphicon-trash img-circle text-danger"></span> ' +getStyleByID(id).name+'</a>');
    usedStyles.splice(getIndexByStyleId(id),1);
  }
}
function addStyle(){
  displayStylesMenu();
  y = $('#stylesSearch').typeahead({source:usedStyles});
  $('#stylesSearch').change(function() {
    var current = $('#stylesSearch').typeahead("getActive");
    if (current) {
      if (current.name == $('#stylesSearch').val()) {
        usedStyles.splice(getIndexByStyleId(current.id),1);
        y.data('typeahead').source = usedStyles;
        newStyles.push(current.id);
        $('.addedStyles').append('<a class="btn icon-btn btn-danger delBtn" onclick="deleteSty(this,'+current.id+')"><span class="glyphicon btn-glyphicon glyphicon-trash img-circle text-danger"></span> ' +current.name+'</a>');
        $('#stylesSearch').val("");
      }
    }
  });
}
function setStyles(data){
  if(!data.length){
    $(".stylesData").html("Sin estilos.");
  }
  else{
    var html = "<div style='width:100%;overflow-x:scroll;white-space: nowrap;'><ul>";
    for(i=0;i<data.length;i++){
      html += '<li class="styleTag">'+getStyleByID(data[i]).name+'</li>';
    }
    html += "</ul></div>";
    $(".stylesData").html(html);
  }
}
function deleteSty(e,id){
  usedStyles.push(getStyleByID(id));
  y.data('typeahead').source = usedStyles;
  newStyles.splice(newStyles.map(Number).indexOf(id),1);
  $(e).remove();
}
function uploadStyles(){
  waitingDialog.show('Subiendo');
  $.ajax({
    type: 'POST',
    data:{styles:newStyles},
    url: '/update/styles',
    success: function(data) {
      if(data.status==1){
        waitingDialog.hide();
        user.styles = newStyles;
        setStyles(newStyles);
      }
      else{
        waitingDialog.hide();
        BootstrapDialog.alert({
           title: 'Error',
           message: 'El server no responde',
           type: BootstrapDialog.TYPE_WARNING,
           closable: false,
           draggable: false,
           buttonLabel: 'Ok',
           callback: function(result) {
           }
       });
      }
    }
  });
}
function showInfluencesEditor(){
  displayInfluencesMenu();
  $('#infBtn').click(function(){
    addInfluence($("#infSBar").val());
  });
  $("#infSBar").keyup(function (e) {
    if (e.keyCode == 13) {
      addInfluence($("#infSBar").val());
    }
  });
  $('#modalInfluences').modal('show');
}
function addInfluence(data){

  if(newInfluences.indexOf(data.toString()) == -1 && data!=""){
    newInfluences.push(data);
    $('.addedInfluences').append('<a class="btn icon-btn btn-danger delBtn" onclick="deleteInf(this,"'+data+'")"><span class="glyphicon btn-glyphicon glyphicon-trash img-circle text-danger"></span> ' +tl(data)+'</a>');
  }
    $("#infSBar").val("");
  }
function setInfluences(data){
  if(!data.length){
    $(".influencesData").html("Sin influencias.");
  }
  else{
    var html = "<div style='width:100%;overflow-x:scroll;white-space: nowrap;'><ul>";
    for(i=0;i<data.length;i++){
      html += '<li class="styleTag">'+tl(data[i])+'</li>';
    }
    html += "</ul></div>";
    $(".influencesData").html(html);
  }
}
function displayInfluencesMenu(){
  $('.addedInfluences').html("");
  newInfluences = JSON.parse(JSON.stringify(user.influences));
  for(i=0;i<newInfluences.length;i++){
    var id = newInfluences[i];
    $('.addedInfluences').append('<a class="btn icon-btn btn-danger delBtn" onclick="deleteInf(this,\''+id+'\')"><span class="glyphicon btn-glyphicon glyphicon-trash img-circle text-danger"></span> ' + tl(id) +'</a>');
  }
}
function deleteInf(e,id){
  newInfluences.splice(newInfluences.indexOf(id),1);
  $(e).remove();
}
function uploadInfluences(){
  waitingDialog.show('Subiendo');
  $.ajax({
    type: 'POST',
    data:{influences:newInfluences},
    url: '/update/influences',
    success: function(data) {
      if(data.status==1){
        waitingDialog.hide();
        user.influences = newInfluences;
        setInfluences(newInfluences);
      }
      else{
        waitingDialog.hide();
        BootstrapDialog.alert({
           title: 'Error',
           message: 'El server no responde',
           type: BootstrapDialog.TYPE_WARNING,
           closable: false,
           draggable: false,
           buttonLabel: 'Ok',
           callback: function(result) {
           }
       });
      }
    }
  });
}
function tl(s){
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
}
function uploadMessage(){
  waitingDialog.show('Subiendo');
  var txt = $('#messageID').val().replace(/(\r\n|\n|\r)/gm,"").trim();
  $.ajax('/update/message', {
    method: "POST",
    data:{message:txt},
    success: function (data) {
      discon(data);
      waitingDialog.hide();
      if(txt.length){
        txt = tl(txt);
        $('.messageData').html(tl(txt));
      }
      else{
        $('.messageData').html("Sin mensaje.");
      }

    },
    error: function (data) {
      discon(data);
      waitingDialog.hide();
      BootstrapDialog.show({
           type: BootstrapDialog.TYPE_WARNING,
           title: 'Ha ocurrido un problema',
           message: 'No se ha podido conectar con el servidor, intente otra vez.'
       });
    }
  });
}
function showPersonal(){
  $("#modalPersonal").modal("show");
}
function uploadPersonal(){
  waitingDialog.show();
  $.ajax({
    type: 'POST',
    data:{
      name: $( "#nombre" ).val(),
      lname:$( "#apellido" ).val(),
      sex:$( "#sex" ).val(),
      pass:$( "#pass1" ).val(),
      bdate:$( "#bdate" ).val(),
      city:city,
      region:region,
      country:country
    },
    url: '/update/personal',
    success: function(data) {
        waitingDialog.hide();
        if(data.status == "1"){
          user.name = $( "#nombre" ).val();
          user.lname = $( "#apellido" ).val();
          user.sex = $( "#sex" ).val();
          user.pass = $( "#pass1" ).val();
          user.age = getAge($( "#bdate" ).val());
          user.bdate = $( "#bdate" ).val();
          user.city = city;
          user.region = region;
          user.country = country;
          setInfo();
          $("#modalPersonal").modal("hide");
        }
        else{

        }
    }
  });
}
function seeNotif(){
  $("#notifCounter").hide();
  if($("#notifications").html()!=""){
    $.ajax({
      type: 'POST',
      url: '/friends/seen',
      success: function(data) {
      }
    });
  }
}
//Añade las notificaciones.
function getSolicitudes(){
  $("#notifications").html("");
  var friends = user.friends;
  var count = 0;
  var newCount = false;
  for(i=0;i<friends.length;i++){
    if(friends[i].state == 1){
      notifSolicitud(friends[i]);
    }
    if(friends[i].state == 2 && friends[i].view == 0){
      notifAccept(friends[i]);
      newCount = true;
    }
    if(friends[i].view == 0){
      count++;
    }
  }
  if(count!=0){
    $("#notifCounter").html(count).show();
  }
  refreshNotif();
    contactsInit();
    messagesInit();


}
function notifSolicitud(friend){
  var html = '<div class="contacto" style="background:#FFF">'+
              '<img class="contactImage"  src="'+getPhoto(friend.id, friend.photo)+'"></img>'+
              '<div class="contactName">'+friend.name+' '+friend.lname+'</div>'+
              '<div class="contactMessage" style="color:#000">Te ha enviado una solicitud.</div>'+
              '<div class="agree" onclick="acceptSolicitud(\''+friend.id+'\');fadeOUT(this)">Aceptar</div>'+
              '<div class="disagree" onclick="cancelSolicitud(\''+friend.id+'\');fadeOUT(this)">Rechazar</div>'+
            '</div>';
  $("#notifications").prepend(html);
  $(".but"+friend.id).html("Aceptar Solicitud")
  .attr("onclick","acceptSolicitud('"+friend.id+"')")
  .removeClass("btn-primary")
  .removeClass("btn-danger")
  .removeClass("btn-default")
  .addClass("btn-success");
}
function notifAccept(friend){
  var html = '<div class="contacto" style="background:#FFF">'+
              '<img class="contactImage"  src="'+getPhoto(friend.id, friend.photo)+'"></img>'+
              '<div class="contactName">'+friend.name+' '+friend.lname+'</div>'+
              '<div class="contactMessage" style="color:#000">Ha aceptado tu solicitud.</div>'+
            '</div>';
  $("#notifications").prepend(html);
  $(".but"+friend.id).html("Eliminar Amigo")
  .attr("onclick","cancelSolicitud('"+friend.id+"')")
  .removeClass("btn-default")
  .removeClass("btn-primary")
  .removeClass("btn-success")
  .addClass("btn-danger");
}
function fadeOUT(e){
  $(e).parent().fadeOut(500,function(a){
    $(e).parent().remove();
    refreshNotif();
  });
}
//Detecta si el panel de notificaciones esta limpio.
function refreshNotif(){
  var html = $("#notifications").html();
  if(html==""){
    $("#notifEmpty").show();
  }
  else{
    $("#notifEmpty").hide();
  }
}

//Crea array de contactos
function contactsInit(){
  contacts = [];
  var friends = user.friends;
  for(i=0;i<friends.length;i++){
    if(friends[i].state == 2){
    contacts.push({
      id:friends[i].id,
      name:friends[i].name,
      lname:friends[i].lname,
      photo:friends[i].photo,
      connected:false,
      messages:[]
    });
  }
  }
  refreshContacts();
}
//Obtiene los mensajes de los contactos.
function messagesInit(){
  for(i=0;i<contacts.length;i++){
    sockets.emit('messageInit',contacts[i].id);
  }
}
//Muestra los contactos en la barra derecha.
function refreshContacts(){
  $(".contactos").html("");
  var html = "";
  for(i=0;i<contacts.length;i++){
    var connected = "gray";
    var counter = 0;
    var showCounter = "none";
    var lastMessage = "";
    if(contacts[i].connected){
      connected = "#4E4";
    }
    for(x=0;x<contacts[i].messages.length;x++){
      if(contacts[i].messages[x].view == 0 && contacts[i].messages[x].to.toString('utf-8') == user._id.toString('utf-8') && currentChat != contacts[i].messages[x].from){
        counter++;
        showCounter = "visible";
      }
      if(contacts[i].messages[x].from === user._id){
        lastMessage = "Tu: "+tl(contacts[i].messages[x].message.substring(0, 30));
      }
      else{
        lastMessage = contacts[i].name+": "+tl(contacts[i].messages[x].message.substring(0, 30));
      }
    }
    html += '<div class="contacto con'+contacts[i].id+'" onclick="displayChat(\''+contacts[i].id+'\')">'+
    '<img class="contactImage" src="'+getPhoto(contacts[i].id, contacts[i].photo)+'"></img>'+
    '<div class="contactName" onclick="displayProfile(\''+contacts[i].id+'\');event.cancelBubble=true;">'+tl(contacts[i].name)+' '+tl(contacts[i].lname)+'<span style="background:'+connected+'" class="contactStatus stat'+contacts[i].id+'"></span></div>'+
    '<div class="contactMessage mess'+contacts[i].id+'">'+lastMessage+'</div>'+
    '<div class="contactCounter count'+contacts[i].id+'" style="display:'+showCounter+'">'+counter+'</div></div>';
    }
    $(".contactos").prepend(html);
    if($(".contactos").html()==""){
      $(".contactos").html("<center style='margin:10px;font-size:20px'>Sin contactos</center>");
    }
}
function getImageById(id){
  $.ajax({
    type: 'POST',
    async:false,
    data:{
      id:id
    },
    url: '/get/image',
    complete: function(data) {
        if(data.data == 0){
          return "img/nouser.png";
        }
        else{
          return "img/users/"+id+".png";
        }
    }
  });
}
function makeSeen(id){
  for(x=0;x<contacts.length;x++){
    if(contacts[x].id == id){
      for(i=0;i<contacts[x].messages.length;i++){
        if(contacts[x].messages[i].from == id){
          contacts[x].messages[i].view = 1;
        }
      }
    }
  }
}
function friendState(id){
  console.log(user.friends);
  var friends = user.friends;
  for(x=0;x<friends.length;x++){
    if(friends[x].id==id){
      return friends[x].state;
    }
  }
  return -1;
}
function getAge(dateString) {
  var startDate = moment(dateString,"DD/MM/YYYY");
  var endDate = moment(new Date());
  var years = endDate.diff(startDate, 'years');
  return years;
}
