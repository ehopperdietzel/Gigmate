$(document).ready(function(){

  $(".instrument").tooltip({
    x: 10,
    y: 10
  });

//Informacion personal
$(".edit1").click(function(){
  $(".edit1,.inf1").hide();
  $(".save1,.chan1,.can1").show();
});
$(".can1,.darkbackground").click(function(){
  $(".edit1,.inf1").show();
  $(".save1,.chan1,.can1").hide();
});
$(".save1").click(function(){
  //ajax
  $(".edit1,.inf1").show();
  $(".save1,.chan1,.can1").hide();
});

$(".edit2").click(function(){
  $(".edit2,.inf2").hide();
  $(".save2,.chan2,.can2").show();
});
$(".can2,.darkbackground").click(function(){
  $(".edit2,.inf2").show();
  $(".save2,.chan2,.can2").hide();
});
$(".save2").click(function(){
  //ajax
  $(".edit2,.inf2").show();
  $(".save2,.chan2,.can2").hide();
});

$(".edit3").click(function(){
  $(".edit3,.inf3").hide();
  $(".save3,.chan3,.can3").show();
});
$(".can3,.darkbackground").click(function(){
  $(".edit3,.inf3").show();
  $(".save3,.chan3,.can3").hide();
});
$(".save3").click(function(){
  //ajax
  $(".edit3,.inf3").show();
  $(".save3,.chan3,.can3").hide();
});

$(".edit4").click(function(){
  $(".edit4,.inf4").hide();
  $(".save4,.chan4,.can4").show();
});
$(".can4,.darkbackground").click(function(){
  $(".edit4,.inf4").show();
  $(".save4,.chan4,.can4").hide();
});
$(".save4").click(function(){
  //ajax
  $(".edit4,.inf4").show();
  $(".save4,.chan4,.can4").hide();
});

$(".edit5").click(function(){
  $(".edit5,.inf5").hide();
  $(".save5,.chan5,.can5").show();
});
$(".can5,.darkbackground").click(function(){
  $(".edit5,.inf5").show();
  $(".save5,.chan5,.can5").hide();
});
$(".save5").click(function(){
  //ajax
  $(".edit5,.inf5").show();
  $(".save5,.chan5,.can5").hide();
});


$(".darkbackground").click(function(){
  $(this).hide();
});
$(".showpersonalinfo").click(function(){
  $(".personalinfo").show();
});







  $(".biggear").click(function(){
    $(".biggearlist").show();
  });
  $(document).mouseup(function (e){
    var container = $(".biggear");
    if (!container.is(e.target)&& container.has(e.target).length === 0){
        $(".biggearlist").hide();
    }
});







  /*
  $(".gear").menudisplay({
    options:[

      [{
        title:"Editar",
        func: function(){alert("Editando")}
      }],

      [{
        title:"Eliminar",
        func: function(){alert("Eliminando")}
      }]

    ]});
    */
});
