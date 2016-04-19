<?php

//Mysql
$servername = "localhost";
$username = "root";
$password = "root";
//Tienes que crear la base de datos gigmate desde phpmyadmin
$db = "gigmate";

$conn = new mysqli($servername, $username, $password);
$conn->select_db($db);

?>
