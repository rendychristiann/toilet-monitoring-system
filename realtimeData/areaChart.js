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
async function updateLineChart(lineChart) {
  const phpScriptURL = 'realtimeData/data.php';
  const response = await fetch(phpScriptURL);
  const data = await response.json();

  const dates = [];
  const userCounts = [];

  data.forEach(row => {
    const userDate = row.user_date.split(' ')[0];

    if (!dates.includes(userDate)) {
      dates.push(userDate);
    }

    if (userCounts[userDate]) {
      userCounts[userDate]++;
    } else {
      userCounts[userDate] = 1;
    }
  });

  // Sort the dates in ascending order
  dates.sort();

  // Update the line chart's data
  lineChart.data.labels = dates;
  lineChart.data.datasets[0].data = dates.map(date => userCounts[date] || 0);
  lineChart.update();
}

// Call the createLineChart function to initialize the chart
const lineChart = createLineChart();

// Call the updateLineChart function to update the chart with the fetched data
updateLineChart(lineChart);


// // Set new default font family and font color to mimic Bootstrap's default styling
// Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#292b2c';

// // Line Chart Example
// var ctx = document.getElementById("myAreaChart");
// var lineChart;

// // Function to sort data by date
// function sortByDate(data) {
//   return data.sort((a, b) => new Date(a.user_date) - new Date(b.user_date));
// }

// // Function to fetch data and update the line chart
// async function updateChart() {
//   const phpScriptURL = 'realtimeData/data.php';
//   const response = await fetch(phpScriptURL);
//   const data = await response.json();

//   const sortedData = sortByDate(data);

//   const groupedData = {};

//   sortedData.forEach(row => {
//     const userDate = row.user_date.split(' ')[0];

//     if (groupedData[userDate]) {
//       groupedData[userDate]++;
//     } else {
//       groupedData[userDate] = 1;
//     }
//   });

//   const dates = Object.keys(groupedData);
//   const userCounts = Object.values(groupedData);

//   // Check if the lineChart is already initialized
//   if (lineChart) {
//     lineChart.data.labels = dates;
//     lineChart.data.datasets[0].data = userCounts;
//     lineChart.update();
//   } else {
//     lineChart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: dates,
//         datasets: [{
//           label: "Jumlah Pengguna Toilet",
//           lineTension: 0.3,
//           backgroundColor: "rgba(2,117,216,0.2)",
//           borderColor: "rgba(2,117,216,1)",
//           pointRadius: 5,
//           pointBackgroundColor: "rgba(2,117,216,1)",
//           pointBorderColor: "rgba(255,255,255,0.8)",
//           pointHoverRadius: 5,
//           pointHoverBackgroundColor: "rgba(2,117,216,1)",
//           pointHitRadius: 50,
//           pointBorderWidth: 2,
//           data: userCounts,
//         }],
//       },
//       options: {
//         scales: {
//           x: {
//             time: {
//               unit: 'date'
//             },
//             gridLines: {
//               display: false
//             },
//             ticks: {
//               maxTicksLimit: 7
//             }
//           },
//           y: {
//             min: 0,
//             max: 40000,
//             maxTicksLimit: 5
//           }
//         },
//         legend: {
//           display: false
//         }
//       }
//     });
//   }
// }

// // Call the function to update the line chart with the fetched data
// updateChart();