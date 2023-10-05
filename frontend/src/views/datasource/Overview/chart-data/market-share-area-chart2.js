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
            max: 2500,
            labels: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'Amazon',
            data: [639, 571, 1292, 238]
        },
        {
            name: 'Alibaba',
            data: [669, 759, 714, 710]
        },
        {
            name: 'SVB24',
            data: [1219, 1476, 724, 2041]
        },
        {
            name: 'West Marine',
            data: [541, 657, 0, 905]
        }
    ]
};

export default chartData;
