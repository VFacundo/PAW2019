<?php
function cargaTabla(){
  $rutaArchivo = '../turnos.json';
  if(file_exists($rutaArchivo)){
    $fileContents = file_get_contents($rutaArchivo);//Recupero el contenido del archivo
    $json_array = json_decode($fileContents,true);//json

    foreach ($json_array as $value) {
        $fechaTurno = $value['fechaTurno'];
        $hTurno = $value['hturno'];
        $firstname = $value['firstname'];
        $tel = $value['tel'];
        $email = $value['email'];
        $ficha = "Link a la Ficha";
      echo "<tr>";
      echo "<td>$fechaTurno</td>";
      echo "<td>$hTurno[0]:$hTurno[1]</td>";
      echo "<td>$firstname</td>";
      echo "<td>$tel</td>";
      echo "<td>$email</td>";
      echo "<td>$ficha</td>";
      echo "</tr>";
    }
  }
}
include "vistaAdministrativo.html";
?>
