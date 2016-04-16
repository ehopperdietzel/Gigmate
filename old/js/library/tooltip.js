$(document).ready(function(){
  $("body").prepend('<div id="tooltip"></div>');
  $("body").prepend('<div id="menudisplay"><div id="menucontent"></div><div id="menuarrow"></div></div>');
  $("#tooltip").css({"background":"#EEE","color":"#222","padding":"6px","padding-left":"8px","padding-right":"8px","position":"absolute","display":"none","z-index":"100","border-radius":"5px"});
  $("#menudisplay").css({"background":"#555","color":"#222","border-radius":"5px","padding-left":"0px","padding-right":"0px","position":"absolute","display":"none","z-index":"100","overflow":"hidden"});
  $("#menuarrow").css({"width":"0","height":"0","border-left":"8px solid transparent","border-right":"8px solid transparent","border-bottom":"8px solid #555","position":"absolute","top":"-8px","left":"5px"});

});
(function($) {
  $.fn.tooltip = function(o) {
    $("#tooltip").html($(this).attr("tooltip"));
    $(this).mouseover(function(e) {
      $("#tooltip").show();
    });
    $(this).mouseleave(function(e) {
      $("#tooltip").hide();
    });
    $(this).mousemove(function(e) {
      $("#tooltip").offset({left:e.pageX+o.x,top:e.pageY+o.y});
    });
  };
  $.fn.menudisplay = function(o) {
    $(this).click(function(e) {
      $("#menucontent").html("<div class='menuoption'>Editar</div>");
      $("#menudisplay").show().offset({left:$(this).offset().left - 6,top:$(this).offset().top + 20});
    });
  };
})(jQuery);
