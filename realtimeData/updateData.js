// Function to fetch and populate data in the table
function populateTable() {
    fetch('realtimeData/data.php')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#dataTable tbody');
  
        // Clear the table before populating it with new data
        tableBody.innerHTML = '';
  
        // Loop through the data and add it to the table
        data.forEach(item => {
          const newRow = document.createElement('tr');
  
          // Create table cells for each data field
          const idCell = document.createElement('td');
          idCell.textContent = item.id;
          newRow.appendChild(idCell);
  
          const dateCell = document.createElement('td');
          dateCell.textContent = item.user_date;
          newRow.appendChild(dateCell);
  
          const timeCell = document.createElement('td');
          timeCell.textContent = item.user_time;
          newRow.appendChild(timeCell);
  
          const flushCell = document.createElement('td');
          if (item.user_flush == 0) {
            flushCell.textContent = "Yes";
          } else if (item.user_flush == 1) {
            flushCell.textContent = "No";
          }
          newRow.appendChild(flushCell);
  
          // Append the new row to the table
          tableBody.appendChild(newRow);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  // Call the populateTable function to populate the table with data
  populateTable();
  

// function fetchData() {
//     fetch('realtimeData/data.php') // Replace with the correct URL to your PHP script
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.querySelector('#dataTable tbody');

//             // Loop through the data and add it to the table
//             data.forEach(item => {
//                 const newRow = document.createElement('tr');

//                 // Create table cells for each data field
//                 const idCell = document.createElement('td');
//                 idCell.textContent = item.id;
//                 newRow.appendChild(idCell);

//                 const dateCell = document.createElement('td');
//                 dateCell.textContent = item.user_date;
//                 newRow.appendChild(dateCell);

//                 const timeCell = document.createElement('td');
//                 timeCell.textContent = item.user_time;
//                 newRow.appendChild(timeCell);

//                 const flushCell = document.createElement('td');
//                 if (item.user_flush == 0){
//                     flushCell.textContent = "Yes";
//                 }
//                 else if (item.user_flush == 1){
//                     flushCell.textContent = "No";
//                 }
//                 newRow.appendChild(flushCell);
//                 // Append the new row to the table
//                 tableBody.appendChild(newRow);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// }

// // Call the fetchData function to populate the table
// fetchData();