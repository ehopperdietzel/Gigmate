$(document).ready(function(){
  $(".instrument").tooltip({
    x: 10,
    y: 10
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
