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

function recreateCharts(){
  $('#chart1').highcharts(chart1);
  $('#chart2').highcharts(chart2);
}

function loadTeamTables(){
  var teamName;
  var teamTotal;
  var teamSpeciesTotal;
  var highlightClass;
  $('#table1').html('<thead>' +
    '<tr>' +
      '<th>Team Name</th>' +
      '<th>Total</th>' +
    '</tr>' +
  '</thead>');
  $.each(global.userData.team_totals, function(i, item){
    teamName = global.userData.team_totals[i][1];
    teamTotal= global.userData.team_totals[i][2];
    if (global.userData.team_totals[i][0] == global.userData.team)
      { highlightClass='usersRow'; }
    else
      { highlightClass = ''; }
    $('#table1').prepend('<tr class="'+highlightClass+'"><td>'+teamName+'</td><td>'+teamTotal+'</td></tr>');
  });

  $('#table2').html('<thead>' +
    '<tr>' +
      '<th>Team</th>' +
      '<th>Total</th>' +
    '</tr>' +
  '</thead>');
  $.each(global.userData.team_species_totals, function(i, item){
    teamName = global.userData.team_species_totals[i][1];
    teamSpeciesTotal= global.userData.team_species_totals[i][2];
    if (global.userData.team_species_totals[i][0] == global.userData.team)
      { highlightClass='usersRow'; }
    else
      { highlightClass = '';}
    $('#table2').prepend('<tr class="'+highlightClass+'"><td>'+teamName+'</td><td>'+teamSpeciesTotal+'</td></tr>');
  });
}

function loadTeamCharts(){
    //populate chart1 with data
    $.each(global.userData.team_totals, function(i, item){
      var userSeries = {name: global.userData.team_totals[i][1], data: [global.userData.team_totals[i][2]]}
      console.log('Series[' + i + ']');
      console.log(userSeries)
      chart1.series[i] = userSeries;
    });

    //populate chart2 with data
    $.each(global.userData.team_species_totals, function(i, item){
      var userSeries = {name: global.userData.team_species_totals[i][1], data: [global.userData.team_species_totals[i][2]]}
      console.log('Series[' + i + ']');
      console.log(userSeries)
      chart2.series[i] = userSeries;
    });

    recreateCharts();
}

function loadUserTables(){
  var userName;
  var userTotal;
  var userSpeciesTotal;
  var highlightClass;
  $('#table1').html('<thead>' +
    '<tr>' +
      '<th>Player</th>' +
      '<th>Total</th>' +
    '</tr>' +
  '</thead>');
  $.each(global.userData.user_totals, function(i, item){
    userName = global.userData.user_totals[i][1];
    userTotal= global.userData.user_totals[i][2];
    if (global.userData.user_totals[i][0] == global.userData.uid)
      { highlightClass='usersRow'; }
    else
      { highlightClass = '';}
    $('#table1').prepend('<tr class="'+highlightClass+'"><td>'+userName+'</td><td>'+userTotal+'</td></tr>');
  });

  $('#table2').html('<thead>' +
    '<tr>' +
      '<th>Player</th>' +
      '<th>Total</th>' +
    '</tr>' +
  '</thead>');
  $.each(global.userData.user_species_totals, function(i, item){
    userName = global.userData.user_species_totals[i][1];
    userSpeciesTotal= global.userData.user_species_totals[i][2];
    if (global.userData.user_species_totals[i][0] == global.userData.uid)
      { highlightClass='usersRow'; }
    else
      { highlightClass = '';}
    $('#table2').prepend('<tr class="'+highlightClass+'"><td>'+userName+'</td><td>'+userSpeciesTotal+'</td></tr>');
  });
}

function loadUserCharts(){
    //populate chart1 with data
    $.each(global.userData.user_totals, function(i, item){
      var userSeries = {name: global.userData.user_totals[i][1], data: [global.userData.user_totals[i][2]]}
      console.log('Series[' + i + ']');
      console.log(userSeries)
      chart1.series[i] = userSeries;
    });

    //populate chart2 with data
    $.each(global.userData.user_species_totals, function(i, item){
      var userSeries = {name: global.userData.user_species_totals[i][1], data: [global.userData.user_species_totals[i][2]]}
      console.log('Series[' + i + ']');
      console.log(userSeries)
      chart2.series[i] = userSeries;
    });

    recreateCharts();
}


/*
* Handles the tabs
*/
function events() {
  $('a[href="#team"]').click(function(){
    loadTeamCharts();
    loadTeamTables();
    $('#teamtab').addClass('active');
    $('#youtab').removeClass();
  });

  $('a[href="#you"]').click(function(){
    loadUserCharts();
    loadUserTables();
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
      "uid" : '3',
      "email" : 'hi@hi.com',
      "gravtar" : 'fdsfds',
      "team" : "16",
      "marks" : [{
        "trid":"1",
        "datetime":"2014-07-12 20:07:27"
      },{
        "trid":"40",
        "datetime":"2014-07-12 20:07:33"
      }],
      "user_totals" : [[1,"Jane Doh",16],[2,"Jon Snow", 20],[3,"Bob Chmovski",31]],
      "user_species_totals" : [[3,"Bob Chmovski",1],[1,"Jane Doh",1],[2,"Jon Snow", 2]],
      "team_totals" : [[17,"Fighting Mongooses",50],[16,"Wolves",100],[18,"Tiny Pause",200]],
      "team_species_totals" : [[16,"Wolves",3],[17,"Fighting Mongooses",11],[18,"Tiny Pause",15]]
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
  loadTeamTables();
  loadTeamCharts();
});
