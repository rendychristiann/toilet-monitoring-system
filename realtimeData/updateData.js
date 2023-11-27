// Function to fetch and populate data in the table
function populateTable() {
  fetch('realtimeData/data.php')
      .then(response => response.json())
      .then(data => {
          const tableBody = document.querySelector('#dataTable tbody');

          // Clear the table before populating it with new data
          tableBody.innerHTML = '';

          // Group data by personCount
          const groupedData = groupDataByPersonCount(data);
          
          // Loop through the grouped data and add it to the table
          Object.keys(groupedData).forEach(personCount => {
              // Sort data by userDate and userTime
              const sortedData = sortDataByDateTime(groupedData[personCount]);
              console.log(sortedData);
              // Determine if there is at least one vibration with value 1
              const hasVibrationOne = sortedData.some(item => item.vibration === "1");
              console.log(hasVibrationOne);
              // Get the latest data
              const latestData = sortedData[sortedData.length - 1];

              // Create a table row for the latest data
              const newRow = document.createElement('tr');

              // Create table cells for each data field
              const personCountCell = document.createElement('td');
              personCountCell.textContent = personCount;
              newRow.appendChild(personCountCell);

              const dateCell = document.createElement('td');
              dateCell.textContent = latestData.userDate;
              newRow.appendChild(dateCell);

              const timeCell = document.createElement('td');
              timeCell.textContent = latestData.userTime;
              newRow.appendChild(timeCell);

              const flushCell = document.createElement('td');
              flushCell.textContent = hasVibrationOne ? 'Yes' : 'No';
              newRow.appendChild(flushCell);

              // Append the new row to the table
              tableBody.appendChild(newRow);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

// Function to group data by personCount
function groupDataByPersonCount(data) {
  return data.reduce((acc, item) => {
      acc[item.personCount] = acc[item.personCount] || [];
      acc[item.personCount].push(item);
      return acc;
  }, {});
}

// Function to sort data by userDate and userTime
function sortDataByDateTime(data) {
  return data.sort((a, b) => {
      const dateA = new Date(`${a.userDate} ${a.userTime}`);
      const dateB = new Date(`${b.userDate} ${b.userTime}`);
      return dateA - dateB;
  });
}

// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM content loaded');
  // Call the populateTable function to populate the table with data
  populateTable();
});
