var city;
var region;
var country;
$(document).ready(function(){
  $( "#form" ).submit(function( event ) {
    event.preventDefault();
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
          alert(data.success);
      }});

  });
});
