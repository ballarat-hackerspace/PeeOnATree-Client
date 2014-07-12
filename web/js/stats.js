$(function () {
        $('#container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Trees Tagged'
            },
            /*subtitle: {
                text: 'Source: Wikipedia.org'
            },*/
            xAxis: {
                categories: ['Total', 'Different Varieties'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                /*title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }*/
            },
            /*tooltip: {
                valueSuffix: ' millions'
            },*/
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
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Your team',
                data: [300, 15]
            }, {
                name: 'Fighting Mongooses',
                data: [487, 7]
            }]
        });
    });
