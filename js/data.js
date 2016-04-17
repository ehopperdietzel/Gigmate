var instruments = [
    {"clase":"Viento",
    "lista":[
      {"name":"Flauta dulce","id":3,"play":false},
      {"name":"Trompeta","id":2,"play":false},
      {"name":"Clarinete","id":3,"play":false},
      {"name":"Acoredeon","id":4,"play":true}
    ]},
    {"clase":"Cuerda",
    "lista":[
      {"name":"Guitarra","id":5,"play":true},
      {"name":"Bajo","id":6,"play":true},
      {"name":"Piano","id":7,"play":true},
      {"name":"Harpa","id":8,"play":false}
    ]},
    {"clase":"Percusión",
    "lista":[
      {"name":"Batería","id":9,"play":false},
      {"name":"Tambór","id":10,"play":false},
      {"name":"Pandero","id":11,"play":false},
      {"name":"Maracas","id":12,"play":false}
    ]}
  ];
  $(document).ready(function(){
    var html = "<ul>";
    var play;
    for(i=0;i<instruments.length;i++){

      html += "<li class='list'>" + instruments[i].clase + "<ul>";

      for(e=0;e<instruments[i].lista.length;e++){
        if(instruments[i].lista[e].play){
          play = "border:2px solid #4da3ff;border-radius:20px";
        }
        else{
          play = "";
        }
        html+="<li class='ins' style=''><img style='padding:5px;height:20px;margin-right:10px;position:relative;top:5px;"+play+"' src='img/instruments/"+instruments[i].lista[e].id+".png'></img>"+instruments[i].lista[e].name+"</li>";
      }

      html += "</ul></li>";

    }
    $("#instrumentsDisplay").append(html+"</ul>");
    $('.list').click(function(e){
      if(e.target == this){
           $(this).children('ul').toggle();
       }
    });
  });
