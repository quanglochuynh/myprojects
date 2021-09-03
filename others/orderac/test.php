<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');


$servername = "localhost";
$username = "id15277784_iemartclub";
$password = "@rtClub-IEM2020";
$database = "id15277784_orderartclub";


$conn = mysqli_connect($servername, $username, $password, $database);


if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>