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
        $('.history ul').append('<li>Test</li>');
      });
    });
;
}

$(document).ready(function () {
  initialize();
});
