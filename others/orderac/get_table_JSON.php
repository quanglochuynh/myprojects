<?php
    include 'test.php';
    $i = 1;
    $r=array();
    $sql = "SELECT * FROM DonHang";
    if ($result = mysqli_query($conn, $sql)) {
        while ($row = mysqli_fetch_array($result)){
            $r[] = $row;
        }
        echo json_encode($r);
    } else
        echo 'Không thành công. Lỗi' . mysqli_error($conn);
    mysqli_close($conn);
?>