// ==============================|| DASHBOARD - MARKET SHARE AREA CHART ||============================== //

const chartData = {
    height: 400,
    type: 'area',
    options: {
        chart: {
            id: 'market-share-area-chart',
            toolbar: {
                show: true
            },
            zoom: {
                enabled: false
            },
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 80, 100]
            }
        },
        legend: {
            show: true
        },
        xaxis: {
            type: 'category',
            categories: ['Hull', 'Engine', 'Electrical and Electronic', 'Ship Rig / Outfit']
        },
        yaxis: {
            min: 1,
            max: 8000,
            labels: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'Amazon',
            data: [196, 133, 303, 51]
        },
        {
            name: 'Alibaba',
            data: [944, 1046, 665, 5398]
        },
        {
            name: 'SVB24',
            data: [5409, 1940, 6159, 6320]
        },
        {
            name: 'West Marine',
            data: [950, 537, 1818, 506]
        }
    ]
};

export default chartData;
