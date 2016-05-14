var sockets = io.connect('gigmate-62766.onmodulus.net'); //'http://200.104.52.140:3002' || 
var lastDate = 0;

sockets.on('notification', function (data) {
  user.friends = data;
  getSolicitudes();
});
sockets.on('byebye', function (data) {
  conState(data,false);
});
sockets.on('hellohello', function (data) {
  conState(data,true);
});
sockets.on('messageArrive', function (data) {
  if(typeof data != "undefined") {
  for(i=0;i<contacts.length;i++){
    if(contacts[i].id === data.id){
      contacts[i].messages = data.messages;
      contacts[i].connected = data.state;
      conState(contacts[i].id,Boolean(contacts[i].connected));
      var newDate = 0;
      if(contacts[i].messages.length>0){
        newDate = contacts[i].messages[contacts[i].messages.length -1].date;
      }
      if(newDate>lastDate){
        lastDate = newDate;
        conMessage(contacts[i].id,contacts[i].messages[contacts[i].messages.length -1].message,contacts[i].messages[contacts[i].messages.length -1].from);
      }
      for(x=0;x<data.messages.length;x++){
        if(data.messages[x].to == user._id && data.messages[x].view == 0){
          conCounter(contacts[i].id,parseInt($(".count"+contacts[i].id).html())+1);
        }
      }
    }
  }
  //refreshContacts();
  }
});
sockets.on('messageNew', function (data) {
  if(typeof data != "undefined") {
  for(i=0;i<contacts.length;i++){
    if(contacts[i].id === data.id){
      contacts[i].messages.push(data.message);
      contacts[i].connected = data.state;
      conState(data.id,true);
      conMessage(data.id,data.message.message,data.id);
      if(currentChat == contacts[i].id){
        $('.visto').hide();
        $(".chatMessages").append('<div class="chatMessageA"><span>'+data.message.message+'</span></div>');
        $(".chatMessagesContainer").scrollTop($(".chatMessagesContainer")[0].scrollHeight);
        sockets.emit('messageSeen',currentChat);
         makeSeen(currentChat);
      }else{
        conCounter(data.id,parseInt($(".count"+data.id).html())+1);
      }
    }
  }
  //refreshContacts();
  }
});
sockets.on('lastMessageSeen', function (id) {
  if(currentChat.toString('utf-8') === id.toString('utf-8')){
    $('.visto').show();
    $(".chatMessagesContainer").scrollTop($(".chatMessagesContainer")[0].scrollHeight);
    for(x=0;x<contacts.length;x++){
      if(contacts[x].id == id){
        for(i=0;i<contacts[x].messages.length;i++){
          if(contacts[x].messages[i].to == id){
            contacts[x].messages[i].view = 1;
          }
        }
      }
    }
  }
});
