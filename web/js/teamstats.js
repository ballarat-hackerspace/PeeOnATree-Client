$(function () {
        $('#chart1').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Tagged'
            },
            xAxis: {
                categories: ['Total', 'Different Varieties'],
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
                data: [300, 15]
            }, {
                name: 'Fighting Mongooses',
                data: [487, 7]
            }]
        });

        $('#chart2').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Cut Down'
                    },
                    xAxis: {
                        categories: ['Total'],
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
                        data: [74]
                    }, {
                        name: 'Fighting Mongooses',
                        data: [24]
                    }]
                });
    });
