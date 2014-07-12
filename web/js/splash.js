function initialize() {
  $.getJSON({
    url : "http://54.79.38.93/PeeOnATree-Server/api/user/status"
  }).then(function(data) {
    console.log(data.access);
    //userData = dataReturned;
  })
}

$(document).ready(function() {
  initialize();
});
