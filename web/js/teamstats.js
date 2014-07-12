function getData(){
$.ajax({
  url : "http://54.79.38.93/PeeOnATree-Server/api/user/profile"
}).then(function(dataReturned){
  console.log("Data returned:" + data);
  //userData = dataReturned;
})
}

$(function () {
 var chart1 = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Total Tagged'
            },
            xAxis: {
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 100,
                floating: false,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
        };


        $('#chart2').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Total Varieties Tagged'
                    },
                    xAxis: {
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 100,
                        floating: false,
                        borderWidth: 1,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Your team',
                        data: [20]
                    }, {
                        name: 'Fighting Mongooses',
                        data: [10]
                    }]
                });

if ("testing" == "testing"){
  userData = {
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
      "team_totals" : [["Wolves",100],["Fighting Mongooses",200]]
    };
  console.log(userData);
}
else{
  getData();
}

$.each(userData.team_totals, function(i, item){
  var userSeries = {name: userData.team_totals[i][0], data: [userData.team_totals[i][1]]}
  console.log(userSeries);
  chart1.series[i] = userSeries;
})

$('#chart1').highcharts(chart1);

    });
