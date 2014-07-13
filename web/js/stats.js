var global = {
  testing : true,
  userData : new Object,
  resultsLimit : 5
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

//todo - show your team if lower than the ranks we're showing
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
    if (i >= global.resultsLimit){
      return false;
    }
    teamName = global.userData.team_totals[i][0];
    teamTotal= global.userData.team_totals[i][1];
    if (global.userData.team_totals[i][0] == global.userData.team)
      { highlightClass='usersRow'; }
    else
      { highlightClass = ''; }
    $('#table1').prepend('<tr class="'+highlightClass+'"><td>'+teamName+'</td><td>'+teamTotal+'</td></tr>');
  });

  $('#table2').html('<thead>' +
    '<tr>' +
      '<th>Team Name</th>' +
      '<th>Total</th>' +
    '</tr>' +
  '</thead>');
  $.each(global.userData.team_species_totals, function(i, item){
    if (i >= global.resultsLimit){
      return false;
    }
    teamName = global.userData.team_species_totals[i][0];
    teamSpeciesTotal= global.userData.team_species_totals[i][1];
    if (global.userData.team_species_totals[i][0] == global.userData.team)
      { highlightClass='usersRow'; }
    else
      { highlightClass = '';}
    $('#table2').prepend('<tr class="'+highlightClass+'"><td>'+teamName+'</td><td>'+teamSpeciesTotal+'</td></tr>');
  });
}

//todo - show your team if lower than the ranks we're showing
function loadTeamCharts(){
  var seriesIndex = 0;

  //populate chart1 with data
  $.each(global.userData.team_totals, function(i, item){
    if (i <= global.resultsLimit){
      var userSeries = {name: global.userData.team_totals[i][0], data: [global.userData.team_totals[i][1]]}
      console.log('Series[' + i + ']');
      console.log(userSeries)
      chart1.series[i] = userSeries;
    }
  });

  //populate chart2 with data
  $.each(global.userData.team_species_totals, function(i, item){
    if (i <= global.resultsLimit){
      var userSeries = {name: global.userData.team_species_totals[i][0], data: [global.userData.team_species_totals[i][1]]}
      console.log('Series[' + i + ']');
      console.log(userSeries)
      chart2.series[i] = userSeries;
    }
  });

  recreateCharts();
}

function loadUserTables(){
  var userId;
  var userName;
  var userTotal;
  var userSpeciesTotal;
  var highlightClass;
  var arraySize = global.userData.user_totals.length;
  var index;
  console.log('arraySize:'+arraySize);
  $('#table1').html('<thead>' +
    '<tr>' +
      '<th>Player</th>' +
      '<th>Total</th>' +
    '</tr>' +
  '</thead>');
  $.each(global.userData.user_totals, function(i, item){
    index = arraySize - i - 1;
    userId = global.userData.user_totals[index][0];
    userName = global.userData.user_totals[index][1];
    userTotal= global.userData.user_totals[index][2];
    if (i <= global.resultsLimit || userId == global.userData.uid){
      if (global.userData.user_totals[index][0] == global.userData.uid)
        { highlightClass='usersRow'; }
      else
        { highlightClass = '';}
      $('#table1').append('<tr class="'+highlightClass+'"><td>'+userName+'</td><td>'+userTotal+'</td></tr>');
    }
  });

  arraySize = global.userData.user_species_totals.length;
  $('#table2').html('<thead>' +
    '<tr>' +
      '<th>Player</th>' +
      '<th>Total</th>' +
    '</tr>' +
  '</thead>');
  $.each(global.userData.user_species_totals, function(i, item){
    index = arraySize - i - 1;
    userId = global.userData.user_species_totals[index][0];
    userName = global.userData.user_species_totals[index][1];
    userSpeciesTotal= global.userData.user_species_totals[index][2];
    if (i <= global.resultsLimit || userId == global.userData.uid){
      if (global.userData.user_species_totals[index][0] == global.userData.uid)
        { highlightClass='usersRow'; }
      else
        { highlightClass = '';}
      $('#table2').append('<tr class="'+highlightClass+'"><td>'+userName+'</td><td>'+userSpeciesTotal+'</td></tr>');
    }
  });
}

function loadUserCharts(){
  var arraySize = global.userData.user_totals.length;
  var seriesIndex = 0;
  //populate chart1 with data
  var min_score = 9999999;
  $.each(global.userData.user_totals, function(i, item){
    if (i >= (arraySize - global.resultsLimit) || global.userData.user_totals[i][0] == global.userData.uid){
      var userSeries = {name: global.userData.user_totals[i][1], data: [global.userData.user_totals[i][2]]}
      console.log('Series[' + seriesIndex + ']');
      console.log(userSeries)
      chart1.series[seriesIndex] = userSeries;
      //min_score = Math.min(Math.max.apply(Math, global.userData.user_totals[i][2]), min_score);
      seriesIndex++;
    }
  });
  //chart1.yAxis.min = min_score;

  seriesIndex = 0;
  arraySize = global.userData.user_species_totals.length;
  min_score = 9999999;
  //populate chart2 with data
  $.each(global.userData.user_species_totals, function(i, item){
    if (i >= (arraySize - global.resultsLimit) || global.userData.user_species_totals[i][0] == global.userData.uid){
      var userSeries = {name: global.userData.user_species_totals[i][1], data: [global.userData.user_species_totals[i][2]]}
      console.log('Series[' + seriesIndex + ']');
      console.log(userSeries)
      chart2.series[seriesIndex] = userSeries;
      //min_score = Math.min(Math.max.apply(Math, global.userData.user_species_totals[i][2]), min_score);
      seriesIndex++;
    }
  });
  //chart2.yAxis.min = min_score;

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
      "uid" : '40',
      "email" : 'admin@bhack.in',
      "gravatar" : '41ffe8d01e408baf093f2efe993002e1',
      "team" : "Husky",
      "marks" : [{
        "trid":"1",
        "datetime":"2014-07-12 20:07:27"
      },{
        "trid":"40",
        "datetime":"2014-07-12 20:07:33"
      }],
      /*"user_totals" : [[1,"Jane Doh",16],[2,"Jon Snow", 20],[3,"Bob Chmovski",31]],
      "user_species_totals" : [[3,"Bob Chmovski",1],[1,"Jane Doh",1],[2,"Jon Snow", 2]],
      "team_totals" : [[17,"Fighting Mongooses",50],[16,"Wolves",100],[18,"Tiny Pause",200]],
      "team_species_totals" : [[16,"Wolves",3],[17,"Fighting Mongooses",11],[18,"Tiny Pause",15]]*/
      "user_totals" : [],
      "user_species_totals" : [],
      "team_totals" : [],
      "team_species_totals" : []
    };
    global.userData.user_totals = marks_by_user;
    global.userData.user_species_totals = species_by_user;
    global.userData.team_totals = marks_by_team;
    global.userData.team_species_totals = species_by_team;
    console.log(global.userData);
  }
  else{
    getData();
  }

  gravatarurl = 'http://www.gravatar.com/avatar/' + global.userData.gravatar + '.jpg?s=96&d=retro';
  $('#avatar').attr('src', gravatarurl )
//  $('#uid').text(global.userData.uid);
  $('#email').text(global.userData.email);
  $('#team').text(global.userData.team);
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
