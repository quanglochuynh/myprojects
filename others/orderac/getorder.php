<?php
    include_once('test.php');
	$name = $_POST['tenKH'];
	$stid = $_POST['MSSV'];
	$sdt  = $_POST['SDT'];
	$add  = $_POST['Address'];
    $orid = rand(1000,999999);
    $sl1  = $_POST['sl1'];
    $sl2  = $_POST['sl2'];
    $sl3  = $_POST['sl3'];
    $sl4  = $_POST['sl4'];
    $maorder = "".$sl1." ".$sl2." ".$sl3." ".$sl4;
    $time = date('d/m,Y H:i:s');
    
    $sql = "INSERT INTO DonHang (Ten, MSSV, SDT, Address, OrderID, MaOrder, ThoiGianOrder) VALUES ('$name', '$stid', '$sdt', '$add', '$orid', '$maorder', '$time')";
    if (mysqli_query($conn, $sql)) {
        include_once('finish_order1.php');
        echo '<h1> - Mã đơn hàng của bạn là: '.$orid.'</h1>';
        include_once('finish_order2.php');
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);

    

	function printarray($array){
		echo '<pre>';
		print_r($array);
		echo '</pre>';
	}
?>