<?php
$rutaArchivo = 'dbparameters.json';

  if(file_exists($rutaArchivo)){
    $fileContents = file_get_contents($rutaArchivo);
    $json_array = json_decode($fileContents,true);
    $parameters = $json_array[0];
  }
/* parametros para la conexion */
$dsn = 'mysql:host=' . $parameters['host'] . ';dbname=test';
$nombre_usuario = $parameters['user'];
$contraseña = $parameters['pass'];

try {
  $opciones = array(
      PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
  );
  /* Conexion */
  $gbd = new PDO($dsn, $nombre_usuario, $contraseña, $opciones);
  echo "Conexion Exitosa!";
} catch (\Exception $e) {
  /* Error Conexion */
  echo "ERROR PDO: " . $e;
  die();
}
?>
