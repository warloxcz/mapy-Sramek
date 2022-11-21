<?php

if(isset($_POST["cord"])){
    $cord = $_POST["cord"]; //souřadnice
    $text = $_POST["text"];
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "maps";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }



  $stmt = $conn->prepare("INSERT INTO markers (cord1,description) VALUES (?,?)");
  $stmt->bind_param("ss", $cord,$text);

  $stmt->execute();

}

?>