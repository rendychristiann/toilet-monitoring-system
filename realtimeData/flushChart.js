$(document).ready(function () {
  $.ajax({
    url: "realtimeData/data.php",
    method: "GET",
    dataType: "json",
    success: function (data) {
      data.sort((a, b) => new Date(a.userDate) - new Date(b.userDate));
      const groupedData = filterAndCombineData(data);
      const flushGroupedData = groupAndAccumulate(groupedData);
      // console.log(groupedData);
      // const groupedData = groupDataByDate(data);
      // const groupedPersonData = groupDataByPersonCount(groupedData);
      const dates = flushGroupedData.map((item) => item.userDate);
      //console.log(dates);
      const flushValues = flushGroupedData.map(
        (item) => item.vibrationOneCount
      );
      const tidakFlushValues = flushGroupedData.map(
        (item) => item.vibrationZeroCount
      );
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

  function filterAndCombineData(data) {
    const result = {};

    data.forEach((item) => {
      const key = `${item.personCount}_${item.userDate}`;

      if (!result[key]) {
        result[key] = {
          personCount: item.personCount,
          userDate: item.userDate,
          vibration: Number(item.vibration),
        };
      } else {
        // Jika nilai vibration sebelumnya sudah 1, biarkan tetap 1
        if (result[key].vibration === 0 && item.vibration === "1") {
          result[key].vibration = 1;
        }
      }
    });
    //console.log(result);
    // Convert result object to array
    const filteredData = Object.values(result);

    return filteredData;
  }

  function groupAndAccumulate(data) {
    const result = {};

    data.forEach((item) => {
      const key = item.userDate;

      if (!result[key]) {
        result[key] = {
          userDate: item.userDate,
          vibrationOneCount: item.vibration === 1 ? 1 : 0,
          vibrationZeroCount: item.vibration === 0 ? 1 : 0,
        };
      } else {
        if (item.vibration === 1) {
          result[key].vibrationOneCount++;
        } else if (item.vibration === 0) {
          result[key].vibrationZeroCount++;
        }
      }
    });

    // Convert result object to array
    const groupedData = Object.values(result);

    return groupedData;
  }

  function groupDataByDate(data) {
    const groupedData = [];
    const dateMap = new Map();

    data.forEach((item) => {
      const date = item.userDate.split(" ")[0]; // Ambil tanggal dari tanggal-waktu

      if (dateMap.has(date)) {
        // Tanggal sudah ada, tambahkan ke total nilai
        const existingItem = dateMap.get(date);
        if (parseInt(item.vibration) === 1) {
          existingItem.flushValue++;
        } else {
          existingItem.tidakFlushValue++;
        }
      } else {
        // Tanggal baru, tambahkan ke Map dan groupedData
        const newItem = {
          date: date,
          flushValue: parseInt(item.vibration) === 1 ? 1 : 0,
          tidakFlushValue: parseInt(item.vibration) === 0 ? 1 : 0,
        };
        dateMap.set(date, newItem);
        groupedData.push(newItem);
      }
    });

    return groupedData;
  }
});
