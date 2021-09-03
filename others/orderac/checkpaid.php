<?php
    $id = $_REQUEST["i"];
    include_once('test.php');
    $selectsql = "SELECT Paid from DonHang WHERE id=".$id;
    $result = $conn->query($selectsql);
    $row = $result->fetch_assoc();
    if ($row['Done']==0){
        $sql = "UPDATE DonHang SET Paid='1' WHERE id=".$id;
        if (mysqli_query($conn, $sql)){
            echo 'Updated';
        }else{
            echo 'ERROR';
        }
    }else{
        $sql = "UPDATE DonHang SET Paid='0' WHERE id=".$id;
        if (mysqli_query($conn, $sql)){
            echo 'Updated';
        }else{
            echo 'ERROR';
        }
    }
    mysqli_close();
?>