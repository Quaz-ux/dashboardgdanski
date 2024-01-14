function updateChartData(chart, url, year) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const areas = data.map(item => item["Obszar*"]);
            const prices = data.map(item => {
                const price = item[`Cena m² \n${year} r. w zł`];
                return price !== '−' ? parseInt(price, 10) : 0;
            });

            chart.data.labels = areas;
            chart.data.datasets[0].data = prices;
            chart.update();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function initChart(chartId, chartType, borderColor, backgroundColor) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    return new Chart(ctx, {
        type: chartType,
        data: {
            labels: [],
            datasets: [{
                label: `Data for ${chartId}`,
                data: [],
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: `Chart for ${chartId}`
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

let chart1 = initChart('chart1', 'bar', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 0.2)');
let chart2 = initChart('chart2', 'line', 'rgb(75, 192, 192)', 'rgba(0, 0, 0, 0)');
let chart3 = initChart('chart3', 'line', 'rgb(255, 159, 64)', 'rgba(0, 0, 0, 0)');

function updateChartsForYear(year) {
    updateChartData(chart1, 'ceny-ofertowe-mieszkan-i-domow-w-gdansku-arkusz1.json', year);
    updateChartData(chart2, 'ceny-ofertowe-mieszkan-i-domow-w-gdansku-arkusz1.json', year);
    updateChartData(chart3, 'ceny-ofertowe-mieszkan-i-domow-w-gdansku-arkusz1.json', year);
}

document.getElementById('btn2014').addEventListener('click', () => updateChartsForYear('08.2014'));
document.getElementById('btn2015').addEventListener('click', () => updateChartsForYear('08.2015'));
document.getElementById('btn2016').addEventListener('click', () => updateChartsForYear('08.2016'));
document.getElementById('btn2017').addEventListener('click', () => updateChartsForYear('08.2017'));
document.getElementById('btn2018').addEventListener('click', () => updateChartsForYear('08.2018'));

document.addEventListener('DOMContentLoaded', function() {
    updateChartsForYear('08.2018');
});

function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    document.getElementById('currentDateTime').textContent = formattedDateTime;
}

setInterval(updateDateTime, 1000);
