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

var totals = {
    "total" : 0,
    "species_total" : 0
  };


/*
* calculates our totals from the data returned
*/
function calcTotals(){
  $(userData.marks).each(function(){
    totals.total +=1;
  })
  console.log('Total:' + totals);
}

$(function () {
  calcTotals();
        $('#chart1').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Total Trees Tagged'
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
                name: 'You',
                data: [totals.total]
            }, {
                name: 'Bob Chmovski',
                data: [487]
            }]
        });

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
                name: 'You',
                data: [totals.species_total]
            }, {
                name: 'Bob Chmovski',
                data: [13]
            }]
        });
    });
