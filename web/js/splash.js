function initialize() {
  setTimeout(
    function() {
      $.ajax({
        type: "GET",
        url: "http://54.79.38.93/PeeOnATree-Server/api/user/status",
        success: function(data, status, xhr) {
          window.location.href = './app.html';
        },
        error: function(xhr, status, e) {
          window.location.href = './login.html';
        }
      });
    }, 2000
  );
}

function mock() {
  setTimeout(
    function() {
      $('#loader').text('Planting trees ...').fadeIn('slow').delay(500).fadeOut('slow');
      mock2();
    }, 2000
  );
}

function mock2() {
  setTimeout(
    function() {
      $('#loader').text('Drinking water ...').fadeIn('slow').delay(500).fadeOut('slow');
      mock3();
    }, 2000
  );
}

function mock3() {
  setTimeout(
    function() {
      $('#loader').text('Checking vicinity ...').fadeIn('slow').delay(500).fadeOut('slow');
      mock4();
    }, 2000
  );
}

function mock4() {
  setTimeout(
    function() {
      $('#loader').text('Zipping up ...').fadeIn('slow').delay(500).fadeOut('slow');
      initialize();
    }, 2000
  );
}

$(document).ready(function() {
  $('#loader').hide();
  mock();
});
