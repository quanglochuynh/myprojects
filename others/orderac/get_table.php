<?php
    include 'test.php';
    $i = 1;
    $r=array();
    $sql = "SELECT * FROM DonHang";
    if ($result = mysqli_query($conn, $sql)) {
        while ($row = mysqli_fetch_array($result)) {
            echo '<tr>';
            echo '<th>'.$row['id'].'</th>';
            echo '<th>'.$row['ThoiGianOrder'].'</th>';
            echo '<th>'.$row['Ten'].'</th>';
            echo '<th>'.$row['MSSV'].'</th>';
            echo '<th>'.$row['SDT'].'</th>';
            echo '<th>'.$row['MaOrder'].'</th>';
            echo '<th>'.$row['Address'].'</th>';                             
            echo '<th> <input type="checkbox" onclick="check('. $row['id'] .')" ';
            if ($row['Done']){
                echo ' checked';
            }
            echo '> </th>';
            echo '<th> <input type="checkbox" onclick="checkpaid('. $row['id'] .')" ';
            if ($row['Paid']){
                echo ' checked';
            }
            echo '> </th>';
            echo '<th> <input type="button" onclick="deleteorder('. $row['id'] .')" value="Delete"></th>';
            echo '</tr>';
            $i++;
                
            //$r[] = $row;
            
        }
        //echo json_encode($r);
    } else
        echo 'Không thành công. Lỗi' . mysqli_error($conn);
    mysqli_close($conn);
?>