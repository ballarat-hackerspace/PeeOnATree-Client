$(document).ready(function() {
  $("#loginform").submit(function() {
    var $form = $(this);
    var url = $form.attr("action");
    $.ajax({
           type: "POST",
           url: url,
           data: $form.serialize(),
           success: login,
           failure: fail
         });
    return false;
  });
});

function login(data) {
  if(data == "true")
    pass();
  else
    fail();
}

function fail() {
  //TODO: put up failed login stuffs.
  console.log("you shall not pass!");
}

function pass() {
  console.log("passed");
  window.location.href = './app.html';
}
