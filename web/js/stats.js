var global = {
  testing : true,
  userData : new Object
}

function getData(){
  $.ajax({
    url : "http://54.79.38.93/PeeOnATree-Server/api/user/profile"
  }).then(function(dataReturned){
    console.log("Data returned:");
    console.log(dataReturned);
    global.userData = dataReturned;
  })
}

function loadTeamCharts(){
    //populate chart1 with data
    $.each(global.userData.team_totals, function(i, item){
      var userSeries = {name: global.userData.team_totals[i][0], data: [global.userData.team_totals[i][1]]}
      console.log('Series[' + i + ']');
      console.log(userSeries)
      chart1.series[i] = userSeries;
    });

    //populate chart1 with data
    $.each(global.userData.team_species_totals, function(i, item){
      var userSeries = {name: global.userData.team_species_totals[i][0], data: [global.userData.team_species_totals[i][1]]}
      console.log('Series[' + i + ']');
      console.log(userSeries)
      chart2.series[i] = userSeries;
    });

    $('#chart1').highcharts(chart1);
    $('#chart2').highcharts(chart2);
}

function loadUserCharts(){
    $.each(global.userData.user_totals, function(i, item){
      var userSeries = {name: global.userData.user_totals[i][0], data: [global.userData.user_totals[i][1]]}
      console.log('Series[' + i + ']');
      console.log(userSeries)
      chart1.series[i] = userSeries;
    });

    //populate chart1 with data
    $.each(global.userData.user_species_totals, function(i, item){
      var userSeries = {name: global.userData.team_species_totals[i][0], data: [global.userData.team_species_totals[i][1]]}
      console.log('Series[' + i + ']');
      console.log(userSeries)
      chart2.series[i] = userSeries;
    });

    $('#chart1').highcharts(chart1);
    $('#chart2').highcharts(chart2);
}




/*
* Handles the tabs
*/
function events() {
  $('a[href="#team"]').click(function(){
    loadTeamCharts();
    $('#teamtab').addClass('active');
    $('#youtab').removeClass();
  });

  $('a[href="#you"]').click(function(){
    loadUserCharts();
    $('#youtab').addClass('active');
    $('#teamtab').removeClass();
  });
}

/*
* Populates the account details
*/
function populateUserData(){

  if (global.testing){
    global.userData = {
      "uid" : '1234',
      "email" : 'hi@hi.com',
      "gravtar" : 'fdsfds',
      "marks" : [{
        "trid":"1",
        "datetime":"2014-07-12 20:07:27"
      },{
        "trid":"40",
        "datetime":"2014-07-12 20:07:33"
      }],
      "user_totals" : [["Jon Snow", 20],["Bob Chmovski",16],["Jane Doh",31]],
      "user_species_totals" : [["Jon Snow", 2],["Bob Chmovski",1],["Jane Doh",3]],
      "team_totals" : [["Wolves",100],["Fighting Mongooses",200],["Tiny Pause",50]],
      "team_species_totals" : [["Wolves",3],["Fighting Mongooses",11],["Tiny Pause",7]]
    };
    console.log(global.userData);
  }
  else{
    getData();
  }

  gravatarurl = 'http://www.gravatar.com/avatar/' + global.userData.gravatar + '.jpg?s=180';
  $('#avatar').attr('src', gravatarurl )
  $('#uid').text(global.userData.uid);
  $('#email').text(global.userData.email);
  $('#team').text('Wolf Pack');
}


/*
* MAIN
*/
$(document).ready(function() {
  events();
  populateUserData();
  loadTeamCharts();
});
