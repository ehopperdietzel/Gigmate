<?php 
include_once("connection.php");
/*falta crear la conexion con la DB,
para ello debemos primero decidir la organizacion
de las tablas y los campos*/

include_once("header.php");

//PASO1: COMPROBAR QUE ESTEN TODOS LOS CAMPOS

$campos = array("nombre","apellido","email","city","password","password_confirmation");

$campos_completos = true;

foreach ($campos as $campo_individual) {
	if (!(isset($_POST['$campo_individual']) || $_POST['$campo_individual'] === "")) {
		$campos_completos = false;
	}
}

if (!$campos_completos) {
	die("Error. No ingresó todos los campos requeridos. Por favor, Intente de nuevo");
}

//PASO 2: SANITIZAR VARIABLES

$nombre = mysqli_real_escape_string("{$_POST['nombre']}");
$apellido = mysqli_real_escape_string("{$_POST['apellido']}");
$email = mysqli_real_escape_string("{$_POST['email']}");
$city = mysqli_real_escape_string("{$_POST['city']}");
$password = mysqli_real_escape_string("{$_POST['password']}");
$password_confirmation = mysqli_real_escape_string("{$_POST['password_confirmation']}");

//PASO 3: COMPROBAR QUE EL EMAIL NO ESTE EN LA DB

$query = "SELECT * FROM usuarios WHERE '$email' = 'email' LIMIT 1";

$result_set = mysqli_query($connection, $query);

if ($result_set) {
	die("Error, el email ingresado ya está registrado");
?>


