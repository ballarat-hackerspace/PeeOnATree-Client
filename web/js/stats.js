/*
* Handles the tabs
*/
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

/*
* Populates the account details
*/
function populateUserData(){
  $.ajax({
    url : "http://54.79.38.93/PeeOnATree-Server/api/user/profile"
  }).then(function(dataReturned){
    console.log("Data returned:" + data);
    //userData = dataReturned;
  })

  var userData = {
    "uid" : '1234',
    "email" : 'hi@hi.com',
    "gravtar" : 'fdsfds',
    "marks" : [{
      "trid":"1",
      "datetime":"2014-07-12 20:07:27"
    },{
      "trid":"40",
      "datetime":"2014-07-12 20:07:33"
    }]
  };

  gravatarurl = 'http://www.gravatar.com/avatar/' + userData.gravatar + '.jpg?s=180';
  $('#avatar').attr('src', gravatarurl )
  $('#uid').text(userData.uid);
  $('#email').text(userData.email);
  $('#team').text('Wolf Pack');
}


/*
*
*/
function createTotalStats(){
  console.log('Create a table..of data');
}

/*
* MAIN
*/
$(document).ready(function() {
  events();
  populateUserData();
  /*createTotalStats();

  var chart1 = $('#chart1').highcharts();
  var chart2 = $('#chart2').highcharts();*/
});
