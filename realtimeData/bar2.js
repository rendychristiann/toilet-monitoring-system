// // Function to fetch data from PHP script and update the progress bar
// async function updateProgressBar() {
//     const phpScriptURL = 'realtimeData/data.php'; // Ganti dengan URL skrip PHP yang mengambil data
  
//     const response = await fetch(phpScriptURL);
//     const data = await response.json();
  
//     // Hitung total pengguna toilet yang menekan flush (user_flush = 1)
//     const totalFlushed = data.filter(item => item.user_flush === '1').length; // Menggunakan '1' untuk mencocokkan dengan tipe data string dari database
//     console.log(totalFlushed);
  
//     // Update progress bar untuk total pengguna toilet yang menekan flush
//     updateProgressBar(totalFlushed, 'bar2', 'bar2-value');
//   }
  
//   // Function untuk mengupdate progress bar
//   function updateProgressBar(total, progressBarId, valueId) {
//     // Update value
//     const valueElement = document.querySelector(`#${valueId}`);
//     valueElement.textContent = total;
  
//     // Update progress bar
//     const progressBar = document.querySelector(`#${progressBarId}`);
//     const progressValue = (total / 100) * 100; // Ganti 100 dengan total maksimum yang sesuai
//     progressBar.style.width = `${progressValue}%`;
//     progressBar.setAttribute('aria-valuenow', progressValue);
//   }
  
//   // Panggil function updateProgressBar untuk mengambil data dan mengupdate progress bar
//   document.addEventListener('DOMContentLoaded', function() {
//     updateProgressBar();
//   });

  // Function to fetch total users from PHP script and update the progress bar
async function updateProgressBar() {
    const phpScriptURL = 'realtimeData/data.php'; // Ganti dengan URL skrip PHP yang mengambil total pengguna toilet
    const response = await fetch(phpScriptURL);
    const data = await response.json();
  
    const totalFlushed = data.filter(item => item.user_flush === '1').length; // Menggunakan '1' untuk mencocokkan dengan tipe data string dari database
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
  