<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Danh sách order Online</title>
    <link href="style.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
    <div class="header">
		<div class="container">
			<div class="navbar">
				<div class="logo">
					<img src="images/logo.jpg" width="125px">
				</div>
				<nav>
					<ul>
						<li><a href="index.html">Home</a></li>
						<li><a href="product.html">Product</a></li>
						<li><a href="">About</a></li>
						<li><a href="">Contact</a></li>
					</ul>
				</nav>
			</div>
			
		</div>
	</div>
<body>
    <div style="display: inline-flex; margin: 20px">
        <h2 id="orderTitle" style="margin-right: 50px">Danh sách order online</h2>
        <div id="refreshbutton">Refresh</div>
        
</div>
    <div align="center">
        <table id="tborder">
        <tr>
            <th>Stt</th>
            <th>Thời gian</th>
            <th>Tên</th>
            <th>MSSV</th>
            <th>SĐT</th>
            <th>Mua gì?</th>
            <th>Giao tại...</th>
            <th>Done?</th>
            <th>Paid</th>
            <th>Xoá</th>
        </tr>
            
    </table>
        
        <p id="alo"></p>
    </div>
    <script>
        function check(s){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "check.php?i=" +s, true);
            xmlhttp.send();
        }
        function checkpaid(p){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "checkpaid.php?i=" +p, true);
            xmlhttp.send();
        }
        function deleteorder(d){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "delete.php?i=" +d, true);
            xmlhttp.send();
        }
//        $(document).ready(function() {
//            $("#refreshbutton").on("click", function() {
//               $( "#tborder" ).load( "orderlist.php #tborder" );
//            });
//
//        });
        
        var str;
        
        $(document).ready(function(){
            str.load("get_table_JSON.php");
            document.getElementById("alo").innerHTML = str;
        });
        
    </script>
</body>
</html>