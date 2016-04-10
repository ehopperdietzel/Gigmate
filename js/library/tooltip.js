$(document).ready(function(){
  $("body").prepend('<div id="tooltip"></div>');
  $("#tooltip").css({"background":"#EEE","color":"#222","padding":"6px","padding-left":"8px","padding-right":"8px","position":"absolute","display":"none","z-index":"100","border-radius":"5px"});
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
})(jQuery);
