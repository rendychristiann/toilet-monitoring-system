<?php

$conn = mysqli_connect("localhost", "root", "", "db_despro1");
// Check connection
if ($conn->connect_error) {
    die("Database Connection failed: " . $conn->connect_error);
}
    
//Get current date and time
    date_default_timezone_set('Asia/Jakarta'); 
	$seminggu = array("Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu");
	$hari = date("w");
	$hari_ini = $seminggu[$hari];
    //$d = date("Y-m-d");
	$tgl_sekarang = date("ymd");
    //echo " Date:".$d."<BR>";
    $jam_sekarang = date("H:i:s");

    //dummy data random
    $vibration = rand(0, 1);
    $personCount = rand();

	// $sql = "INSERT INTO flu40519_fluzz_team (user_date, user_time, user_flush) VALUES ('".$tgl_sekarang."', '".$jam_sekarang."', '".$user_flush."')"; #variabel JADI/mateng yang ada di file ini 
    $datadb = mysqli_query($conn, "INSERT INTO despro1 (userDate, userTime, vibration, personCount) VALUES ('$tgl_sekarang', '$jam_sekarang', '$vibration', '$personCount')");
    if($datadb)
        echo "Berhasil terkirim";
    else
        echo "Gagal terkirim";
?>