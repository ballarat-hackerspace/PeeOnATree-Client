var chart1;
var chart2;

$(function () {
 chart1 = {
            chart: { type: 'bar' },
            title: { text: 'Total Tagged' },
            xAxis: { title: { text: null } },
            yAxis: { min: 0, },
            plotOptions: { bar: { dataLabels: { enabled: true } } },
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
            credits: { enabled: false },
            series: []
        };


  chart2 = {
            chart: { type: 'bar' },
            title: { text: 'Total Species Tagged' },
            xAxis: { title: { text: null  } },
            yAxis: { min: 0, },
            plotOptions: { bar: { dataLabels: { enabled: true } }
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
            credits: { enabled: false },
            series: []
        };

    });
