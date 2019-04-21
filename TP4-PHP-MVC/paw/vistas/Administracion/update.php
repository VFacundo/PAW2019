<?php
echo '<a href="../listar">Administracion</a><br>';
echo '<h1> Administacion de Turnos </h1>';
if(!empty($registro)){
  echo "Se Modifico un Turno: ";
  echo '<ul>';
  echo  '<li>Nombre:' . $registro['firstname'] . '</li>';
  echo  '<li>Email:' . $registro['email'] . '</li>';
  echo  '<li>Telefono:' . $registro['tel'] . '</li>';
  echo  '<li>Edad:' . $registro['edad'] . '</li>';
  echo  '<li>Calzado:' . $registro['calzado'] . '</li>';
  echo  '<li>Altura:' . $registro['altura'] . '</li>';
  echo  '<li>Fecha Nacimiento:' . $registro['fechaNac'] . '</li>';
  echo  '<li>Color Pelo:' . $registro['colorPelo'] . '</li>';
  echo  '<li>Fecha de Turno:' . $registro['fechaTurno'] . '</li>';
  echo  '<li>Hora de Turno:' . $registro['hturno'] . '</li>';
  echo "</ul>";
}else{
  echo "<p> No se pudo MODIFICAR el turno Seleccionado!</p>";
}

?>
