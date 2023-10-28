<?php
    // Database connection
    $connect = mysqli_connect("localhost", "root", "", "db_despro");
    if ($conn->connect_error){
        die("Koneksi gagal: ". $conn->connect_error);
    }
    // Query for fetch data from mySQL database
    $sql = "SELECT id, user_date, user_time, user_flush FROM despro1 ORDER BY user DESC";
    $result = $conn->query($sql);
    $data = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    header('Content-Type: application/json');
    echo json_encode($data);

    $conn->close();
?>