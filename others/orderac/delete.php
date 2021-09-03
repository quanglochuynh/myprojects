<?php
    $id = $_REQUEST["i"];
    include_once('test.php');
    $sql = "DELETE FROM DonHang WHERE id=".$id;
    if ($conn->query($sql) === TRUE) {
      echo "Record deleted successfully";
    } else {
      echo "Error deleting record: " . $conn->error;
    }

    mysqli_close();
?>