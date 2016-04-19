<?php
include "../server_conf.php";

$sql = "CREATE TABLE `chat` (
  `id` int(1) NOT NULL PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` int(20) NOT NULL,
  `sender` int(10) NOT NULL,
  `message` text COLLATE utf8_bin NOT NULL,
  `date` varchar(32) COLLATE utf8_bin NOT NULL,
  `seen` int(1) NOT NULL,
  `state` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;";

  if ($conn->query($sql) === TRUE) {
      echo "Tabla chats creada con éxito";
  } else {
      echo "Error creando chats: " . $conn->error;
  }

  $conn->close();
  ?>
