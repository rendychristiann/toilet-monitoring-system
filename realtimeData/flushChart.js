$(document).ready(function () {
  $.ajax({
    url: "realtimeData/data.php",
    method: "GET",
    dataType: "json",
    success: function (data) {
      data.sort((a, b) => new Date(a.user_date) - new Date(b.user_date));

      const groupedData = groupDataByDate(data);
      const dates = groupedData.map((item) => item.date);
      const flushValues = groupedData.map((item) => item.flushValue);
      const tidakFlushValues = groupedData.map((item) => item.tidakFlushValue);

      var ctx = $("#chart-line");
      var myLineChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: dates,
          datasets: [
            {
              data: flushValues,
              label: "Flush",
              borderColor: "#14A44D",
              fill: false,
              backgroundColor: "#14A44D",
            },
            {
              data: tidakFlushValues,
              label: "Tidak Flush",
              borderColor: "#DC4C64",
              fill: false,
              backgroundColor: "#DC4C64",
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Comparison of Toilet User Ethics",
          },
        },
      });
    },
    error: function (error) {
      console.error("Terjadi kesalahan dalam permintaan data: " + error);
    },
  });

  function groupDataByDate(data) {
    const groupedData = [];
    const dateMap = new Map();

    data.forEach((item) => {
      const date = item.user_date.split(" ")[0]; // Ambil tanggal dari tanggal-waktu

      if (dateMap.has(date)) {
        // Tanggal sudah ada, tambahkan ke total nilai
        const existingItem = dateMap.get(date);
        if (parseInt(item.user_flush) === 1) {
          existingItem.flushValue++;
        } else {
          existingItem.tidakFlushValue++;
        }
      } else {
        // Tanggal baru, tambahkan ke Map dan groupedData
        const newItem = {
          date: date,
          flushValue: parseInt(item.user_flush) === 1 ? 1 : 0,
          tidakFlushValue: parseInt(item.user_flush) === 0 ? 1 : 0,
        };
        dateMap.set(date, newItem);
        groupedData.push(newItem);
      }
    });

    return groupedData;
  }
  //     const labels = data.map(function(item){
  //         return item.user_date;
  //     });

  //     const flushData = data.map(function(item){
  //         return item.user_flush === "1" ? 1 : 0;
  //     });
  //     const tidakFlushData = data.map(function(item){
  //         return item.user_flush === "0" ? 1 : 0;
  //     });
  //     console.log(tidakFlushData);

  //     var ctx = $("#chart-line");
  //     var myLineChart = new Chart (ctx, {
  //         type: 'bar',
  //         data: {
  //             labels: labels,
  //             datasets: [{
  //                 data: flushData,
  //                 label: "Flush",
  //                 borderColor: "#3cba9f",
  //                 fill: false,
  //                 backgroundColor: '#3cba9f'
  //             }, {
  //                 data: tidakFlushData,
  //                 label: "Tidak Flush",
  //                 borderColor: "#8e5ea2",
  //                 fill: false,
  //                 backgroundColor: '#8e5ea2'
  //             }]
  //         },
  //         options: {
  //             title: {
  //                 display: true,
  //                 text: "Perbandingan Pengguna Toilet yang Memencet Flush dan Tidak"
  //             }
  //         }
  //     });
  // },
  // error: function(error){
  //     console.error("Terjadi kesalahan dalam permintaan data: " + error);
  // }
});
// var ctx = $("#chart-line");
// var myLineChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
//         datasets: [{
//             data: [10, 25, 13, 35, 55, 11, 7],
//             label: "Flush",
//             borderColor: "#3cba9f",
//             backgroundColor:'#3cba9f',
//             fill: false
//         }, {
//             data: [8, 17, 19, 44, 45, 6, 3],
//             label: "Tidak Flush",
//             borderColor: "#8e5ea2",
//             fill: false,
//             backgroundColor:'#8e5ea2'

//         }]
//     },
//     options: {
//         title: {
//             display: true,
//             text: 'Perbandingan Pengguna Toilet yang Memencet Flush dan Tidak'
//         }
//     }
// });
// });
