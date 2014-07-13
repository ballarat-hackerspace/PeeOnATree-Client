function initialize() {
  tree = location.search.slice(1);

  $.getJSON("http://54.79.38.93/PeeOnATree-Server/api/tree/" + tree,
    function (data) {
      console.log(data);
      if (data[0].pic) {
        $('.jumbotron').append('<img src="http://54.79.38.93/PeeOnATree-Server/api/tree/' + tree + '/pic">');
      }
    });

  $.getJSON("http://54.79.38.93/PeeOnATree-Server/api/tree/" + tree + "/history",
    function (data) {
      $.each(data, function(index, mark) {
        console.log(mark.uid);
//        $.getJSON("http://54.79.38.93/PeeOnATree-Server/api/user/" + mark. + "/history",
      });
    });
;
}


function mark_tree(){
  var url = "http://54.79.38.93/PeeOnATree-Server/api/tree/{0}/mark"
  url = url.replace("{0}",tree)
  $.getJSON(url, function(data) {});
  alert("Tree marked!");
}


$(document).ready(function () {
  initialize();
});
