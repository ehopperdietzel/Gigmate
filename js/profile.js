var currentImage, beginDrag, dragging, portadaHeight, portadaWidth, initpy;
var editingPortada = false;
$(document).ready(function(){

 document.onselectstart = function(){ return false; }
 
  $(".instrument").tooltip({
    x: 10,
    y: 10
  });

//Informacion personal
$(".edit1").click(function(){
  $(".edit1,.inf1").hide();
  $(".save1,.chan1,.can1").show();
});
$(".can1").click(function(){
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
$(".can2").click(function(){
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
$(".can3").click(function(){
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
$(".can4").click(function(){
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
$(".can5").click(function(){
  $(".edit5,.inf5").show();
  $(".save5,.chan5,.can5").hide();
});
$(".save5").click(function(){
  //ajax
  $(".edit5,.inf5").show();
  $(".save5,.chan5,.can5").hide();
});


$(".darkbackground").click(function(e){
  if(e.target == this){
       $(".sB,.darkbackground").hide();
       $(".sA").show();
   }
});
$(".showpersonalinfo").click(function(){
  $(".personalinfo").show();
});

//Portada Uploader
$('.portadaUploader').click(function(){
  $('#portadaUploader').trigger('click');
});
$('#portadaUploader').bind('change',function(){
  $('.ped').show();
  editingPortada = true;
  $('.portada').css({"cursor":"move"});
  readURL(this);
});
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            currentImage = $('.portada').css("background-image").replace('url(','').replace(')','');
            var tmpImg = new Image();
            tmpImg.src=e.target.result;
            $(tmpImg).one('load',function(){
              portadaHeight = tmpImg.height;
              portadaWidth = tmpImg.width;
              //alert("x:"+tmpImg.width+" y:"+tmpImg.height);
            });
            $('.portada').css({"background-image":"url('"+e.target.result+"')"});

        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(".portSave").click(function(){
  //ajax
  $('.ped').hide();
  editingPortada = false;
  $('.portada').css({"cursor":"default"});
});
$(".portCancel").click(function(){
  $('.portada').css({"background-image":"url('"+currentImage+"')"});
  $('.ped').hide();
  editingPortada = false;
  $('.portada').css({"cursor":"default"});
});
$(".portada").on("mousedown",function(e){
      if(editingPortada){
      initpy = parseInt($(".portada").css('backgroundPosition').split(' ')[1]);
      beginDrag = e.pageY;
      dragging = true;
    }
});
$(document).on('mousemove', function(e) {
    var bpy = parseInt($(".portada").css('backgroundPosition').split(' ')[1]);
    var newHeight = (portadaHeight/portadaWidth) * $(".portada").width();
    if(dragging){
      if((bpy > 250 - newHeight||e.pageY-beginDrag>0) && (bpy < 0 ||e.pageY-beginDrag<0)){
        $('.portada').css({"background-position":"0px "+(parseInt(initpy)+(e.pageY-beginDrag))+"px"});
      }
      if(bpy < 250 - newHeight){
        $('.portada').css({"background-position":"0px "+251 - newHeight+"px"});
      }
      if(bpy > 0){
        $('.portada').css({"background-position":"0px 0px"});
      }
    }
});
$(document).on('mouseup', function(e) {
    dragging = false;
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
