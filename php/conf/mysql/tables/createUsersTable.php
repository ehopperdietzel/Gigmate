<?php
include "../server_conf.php";

$sql = "CREATE TABLE `users` (
  `id` int(9) NOT NULL PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE latin1_bin NOT NULL,
  `lastname` varchar(32) COLLATE latin1_bin NOT NULL,
  `email` varchar(64) COLLATE latin1_bin NOT NULL,
  `password` varchar(32) COLLATE latin1_bin NOT NULL,
  `birthdate` varchar(16) COLLATE latin1_bin NOT NULL,
  `profile` int(1) NOT NULL,
  `portrate` int(1) NOT NULL,
  `city` varchar(32) COLLATE latin1_bin NOT NULL,
  `region` varchar(32) COLLATE latin1_bin NOT NULL,
  `country` varchar(32) COLLATE latin1_bin NOT NULL,
  `message` varchar(500) COLLATE latin1_bin NOT NULL,
  `instruments` text COLLATE latin1_bin NOT NULL,
  `styles` text COLLATE latin1_bin NOT NULL,
  `influences` text COLLATE latin1_bin NOT NULL,
  `connection` int(1) NOT NULL,
  `sex` int(1) NOT NULL,
  `accountstate` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;";

  if ($conn->query($sql) === TRUE) {
      echo "Tabla users creada con éxito";
  } else {
      echo "Error creando users: " . $conn->error;
  }

  $conn->close();
  ?>
