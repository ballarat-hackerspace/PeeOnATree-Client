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
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'You',
                data: [300, 15]
            }, {
                name: 'Bob Chmovski',
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
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'You',
                        data: [74]
                    }, {
                        name: 'Bob Chmovski',
                        data: [24]
                    }]
                });
    });
