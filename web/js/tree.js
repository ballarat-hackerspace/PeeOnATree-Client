function initialize() {
  tree = location.search.slice(1);

  $.getJSON({
    url : "http://54.79.38.93/PeeOnATree-Server/api/tree/" . tree
  }).then(function(data) {
    console.log(data);
    //userData = dataReturned;
  })
}

$(document).ready(function() {
  initialize();
});
