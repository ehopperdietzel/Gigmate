var $image;
var currentChat = 0;
$(document).ready(function(){


$(function () {

  $('#modal').on('shown.bs.modal', function () {
    $image = $('#image');
    var cropBoxData;
    var canvasData;
    $image.cropper({
      autoCropArea: 1,
      aspectRatio: 1 / 1,
      built: function () {
        $image.cropper('setCanvasData', canvasData);
        $image.cropper('setCropBoxData', cropBoxData);
      }
    });
  }).on('hidden.bs.modal', function () {
    cropBoxData = $image.cropper('getCropBoxData');
    canvasData = $image.cropper('getCanvasData');
    $image.cropper('destroy');
    //waitingDialog.show('I\'m waiting');
  });
});

/*
var file = this.files[0];
    var name = file.name;
    var size = file.size;
    var type = file.type;
    */

$('#profileUploader').click(function(){
  $('#portadaUploader').trigger("click");
});

$('#portadaUploader').on('change', function(){
    var reader = new FileReader();
    var options =
    {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: 'avatar.png'
    }
    reader.onload = function(e) {
        options.imgSrc = e.target.result;
        $('#image').attr("src",options.imgSrc);
        $('#modal').modal('show');
        $('#portadaUploader').val('');
    }
    reader.readAsDataURL(this.files[0]);
    this.files = [];
  });

  $('#messageID').on('change keyup paste', function(){
    var len = $('#messageID').val().length;
    $('.messageTitleModal').html("Escribe tu mensaje ( "+ (350 - len) +" )");
  });
});















function displayChat(id){
  $('.chatMessages').html('');
  $('.count'+id).hide();
  sockets.emit('messageSeen',id);
  makeSeen(id);
  var html = "";
  currentChat = id;
  for(i=0;i<contacts.length;i++){
    if(contacts[i].id==id){
      $('.chatName').html(contacts[i].name+" "+contacts[i].lname);
      for(x=0;x<contacts[i].messages.length;x++){
        if(contacts[i].messages[contacts[i].messages.length-1].from == user._id && contacts[i].messages[contacts[i].messages.length-1].view == 1){
          $('.visto').show();
        }
        if(contacts[i].messages[x].from == id){

          html += '<div class="chatMessageA"><span>'+tl(contacts[i].messages[x].message)+'</span></div>';
        }
        else{

          html += '<div class="chatMessageB"><div class="mess">'+tl(contacts[i].messages[x].message)+'</div></div>';
        }
      }
    }
  }
  //<div class="visto">Visto</div>
    $('.chatMessages').html(html);
    $('.chat').show(0,function(){
      $(".chatMessagesContainer").scrollTop($(".chatMessagesContainer")[0].scrollHeight);
    });
}
function closeChat(){
  $('.chat').hide();
  $('.visto').hide();
  currentChat = 0;
}
function uploadPhoto(){
    var imm = $image.cropper('getCroppedCanvas').toDataURL("image/jpeg", 0.3);
    waitingDialog.show('Subiendo');
    $.ajax('/upload', {
      method: "POST",
      data:{photo:imm},
      success: function (data) {
        discon(data);
        waitingDialog.hide();
        $('.photoData').attr("src",imm);
        updatePortada(imm);
      },
      error: function () {
        discon(data);
        waitingDialog.hide();
      }
    });
}
function discon(res){
  if(res.state == -2){
    $("body").html('<script>window.location="/";</script>');
    return;
  }
}
