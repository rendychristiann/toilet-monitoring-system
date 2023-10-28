// Function to fetch total users from PHP script and update the progress bar
async function updateProgressBar() {
    const phpScriptURL = 'realtimeData/data.php'; // Ganti dengan URL skrip PHP yang mengambil total pengguna toilet
    const response = await fetch(phpScriptURL);
    const data = await response.json();
  
    const totalUsers = data.length; // Total pengguna toilet
  
    // Update the total displayed in HTML
    const totalElement = document.querySelector('#bar1-value');
    totalElement.textContent = totalUsers;
  
    // Update the progress bar
    const progressBar = document.querySelector('#bar1');
    const progressValue = (totalUsers / 100) * 100; // Ubah 100 menjadi maksimum total yang Anda inginkan
    progressBar.style.width = `${progressValue}%`;
    progressBar.setAttribute('aria-valuenow', progressValue);
  }
  
  // Call the updateProgressBar function to update the progress bar with total users
  updateProgressBar();
  