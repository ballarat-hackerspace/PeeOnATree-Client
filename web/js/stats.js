function events() {
  $('a[href="#team"]').click(function(){
    $.getScript("js/teamstats.js", function(){
      console.log("Running js/teamstats.js");
    });
  });

  $('a[href="#you"]').click(function(){
    $.getScript("js/youstats.js", function(){
      console.log("Running js/youstats.js");
    });
  });
}

$(document).ready(function() {
  events();
});
