  async function updateProgressBar() {
    const phpScriptURL = 'realtimeData/data.php'; // Ganti dengan URL skrip PHP yang mengambil total pengguna toilet
    const response = await fetch(phpScriptURL);
    const data = await response.json();
    groupedData = filterAndCombineData(data);
    //console.log(groupedData);
    const filteredData = groupedData.filter(item => item.vibration === 1);
    const totalFlushed = filteredData.reduce((total, item) => total + item.vibration, 0);
    console.log(totalFlushed);
  
    // Update the total displayed in HTML
    const totalElement = document.querySelector('#bar2-value');
    totalElement.textContent = totalFlushed;
  
    // Update the progress bar
    const progressBar = document.querySelector('#bar2');
    const progressValue = (totalFlushed / 100) * 100; // Ubah 100 menjadi maksimum total yang Anda inginkan
    progressBar.style.width = `${progressValue}%`;
    progressBar.setAttribute('aria-valuenow', progressValue);
  }
  
  // Call the updateProgressBar function to update the progress bar with total users
  updateProgressBar();

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

  