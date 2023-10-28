<?php
    // Database connection
    $connect = mysqli_connect("localhost", "root", "", "db_despro1");

    // Query for fetching all data from the table
    $sql = mysqli_query($connect, "SELECT * FROM despro1 ORDER BY id DESC");

    $data = array(); // Array to hold the data

    // Loop through the results and store them in the data array
    while ($row = mysqli_fetch_assoc($sql)) {
        $data[] = $row;
    }

    // Encode the data array as JSON
    header('Content-Type: application/json');
    echo json_encode($data);
?>
