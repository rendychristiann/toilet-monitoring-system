// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Function to create and update the line chart
function createLineChart() {
  var ctx = document.getElementById("myAreaChart");
  var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "Jumlah Pengguna Toilet",
        data: [],
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
      }],
    },
    options: {
      scales: {
        x: {
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        },
        y: {
          min: 0,
          max: 40000,
          maxTicksLimit: 5
        }
      },
      legend: {
        display: false
      }
    }
  });

  return lineChart;
}

// Function to fetch data and update the line chart
// Function to fetch data and update the line chart
async function updateLineChart(lineChart) {
  const phpScriptURL = 'realtimeData/data.php';
  const response = await fetch(phpScriptURL);
  const data = await response.json();
  
  const uniqueData = {}; // Gunakan objek untuk menyimpan data unik
  const userCounts = {};

  data.forEach(row => {
    const userDate = row.userDate.split(' ')[0];
    const userCount = row.personCount;

    // Gunakan objek untuk menyimpan data unik
    const key = `${userDate}-${userCount}`;
    if (!uniqueData[key]) {
      uniqueData[key] = true;

      if (userCounts[userDate]) {
        userCounts[userDate]++;
      } else {
        userCounts[userDate] = 1;
      }
    }
  });

  // Ambil kunci-kunci (tanggal-tanggal unik) dari objek dan urutkan
  const dates = Object.keys(userCounts).sort();

  // Update the line chart's data
  lineChart.data.labels = dates;
  lineChart.data.datasets[0].data = dates.map(date => userCounts[date] || 0);
  lineChart.update();
}

// Call the createLineChart function to initialize the chart
const lineChart = createLineChart();

// Call the updateLineChart function to update the chart with the fetched data
updateLineChart(lineChart);


