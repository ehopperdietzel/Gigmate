var city;
var region;
var country;
$(document).ready(function(){
  $( "#form" ).submit(function( event ) {
    event.preventDefault();
    if(!cityPass){
      $( ".cityMsg" ).html("Ingrese una ciudad válida.");
      return;
    }
    $.ajax({
      type: 'POST',
      data:{
        name: $( "#nombre" ).val(),
        lname:$( "#apellido" ).val(),
        sex:$( "#sex" ).val(),
        email:$( "#email" ).val(),
        pass:$( "#password_r" ).val(),
        bdate:$( "#bdate" ).val(),
        city:city,
        region:region,
        country:country
      },
      url: '/register',
      success: function(data) {
          if(data.status == "1"){

              BootstrapDialog.alert({
                 title: 'Exito!',
                 message: 'Se ha registrado correctamente',
                 type: BootstrapDialog.TYPE_SUCCESS, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                 closable: false, // <-- Default value is false
                 draggable: false, // <-- Default value is false
                 buttonLabel: 'Iniciar', // <-- Default value is 'OK',
                 callback: function(result) {
                    login($( "#email" ).val(), $( "#password_r" ).val());
                 }
             });
          }
          else{
            BootstrapDialog.show({
                 type: BootstrapDialog.TYPE_WARNING,
                 title: 'Ha ocurrido un problema',
                 message: 'El correo se encuentra en uso.'
             });
          }
      }});

  });

  $( "#lform" ).submit(function( event ) {
    event.preventDefault();
    login($( "#lemail" ).val(),$( "#lpass" ).val());

  });
});

function login(email, pass){
  $.ajax({
    type: 'POST',
    data:{
      email:email,
      pass:pass
    },
    url: '/login',
    success: function(data) {
        //alert(data.success);
        if(data.status==1){
        window.location.replace("/profile");
      }
      else{
        BootstrapDialog.alert({
           title: 'Error',
           message: 'El usuario y contraseña no coiniciden',
           type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
           closable: false, // <-- Default value is false
           draggable: false, // <-- Default value is false
           buttonLabel: 'Reintentar', // <-- Default value is 'OK',
           callback: function(result) {
           }
       });
      }
    }});
}
