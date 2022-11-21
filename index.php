<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="https://api.mapy.cz/loader.js"></script>
    <script type="text/javascript">Loader.load();</script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script>
        var array = [];
        <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "maps";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * from markers";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    ?>
    array.push(["<?php echo str_replace("\"","\\\"",$row["cord1"]);?>","<?php echo $row["description"]?>"]);
    <?php
  }
} else {
}
$conn->close();
?>
    </script>
    <script src="script.js"></script>
    <title>Mapa</title>
</head>
<body>
    <div id="m" style="height:360px"></div>
    <div>
        <span id="cord">Klikni na mapu</span> <br>
        <input type="text" value="Zachod" id="markText">
        <button id="btn">Uložit</button>
    </div>
</body>
</html>