<?php
$cantAlumnos = 0;

  for ($i=0; $i < count($_POST['nombre']) ; $i++) {
    $arrayAlumnos = [
      $i => array(
        'nombre' => $_POST['nombre'],
        'email' => $_POST['email'],
        'nota1' => $_POST['nota1'],
        'nota2' => $_POST['nota2'],
        'nota3' => $_POST['nota3'])
      ];
  }
  comprobarDatos($arrayAlumnos);

function comprobarDatos($arrayAlumnos){
  foreach ($arrayAlumnos as $key) {
    
  }
}

?>
