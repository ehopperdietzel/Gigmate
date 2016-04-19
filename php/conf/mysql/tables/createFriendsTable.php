<?php
include "../server_conf.php";

$sql = "CREATE TABLE `friends` (
  `id` int(10) NOT NULL PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user` int(10) NOT NULL,
  `friend` int(10) NOT NULL,
  `state` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;";

if ($conn->query($sql) === TRUE) {
    echo "Tabla friends creada con éxito";
} else {
    echo "Error creando friends: " . $conn->error;
}

$conn->close();
?>
