<?php


function cargaTabla(){
  $id = filter_input(INPUT_GET,'buscarId',FILTER_SANITIZE_NUMBER_INT);
  $rutaArchivo = '../turnos.json';
  if(file_exists($rutaArchivo)){
    $fileContents = file_get_contents($rutaArchivo);//Recupero el contenido del archivo
    $json_array = json_decode($fileContents,true);//json

    if((count($json_array)<$id) || (count($json_array)==$id)){
      echo "<h2> Id Turno Incorrecta! </h2>";
    }else{
      echo "<tr>";
      echo "<th>Nombre del Paciente</th>";
      echo "<th>Telefono</th>";
      echo "<th>Email</th>";
      echo "<th>Edad</th>";
      echo "<th>Talla Calzado</th>";
      echo "<th>Altura</th>";
      echo "<th>Fecha Nacimiento</th>";
      echo "<th>Color Pelo</th>";
      echo "<th>Fecha del Turno</th>";
      echo "<th>Hora del Turno</th>";
      echo "<th>Imagen</th>";
      echo "</tr>";

      $value = $json_array[$id];

      $firstname = $value['firstname'];
      $tel = $value['tel'];
      $email = $value['email'];
      $edad = $value['edad'];
      $calzado = $value['calzado'];
      $altura = $value['altura'];
      $fechaNac = $value['fechaNac'];
      $colorPelo = $value['colorPelo'];
      $fechaTurno = $value['fechaTurno'];
      $hTurno = $value['hturno'];
      $imgTurno = $value['imgTurno'];

      echo "<tr>";
      echo "<td>$firstname</td>";
      echo "<td>$tel</td>";
      echo "<td>$email</td>";
      echo "<td>$edad</td>";
      echo "<td>$calzado</td>";
      echo "<td>$altura</td>";
      echo "<td>$fechaNac</td>";
      echo "<td>$colorPelo</td>";
      echo "<td>$fechaTurno</td>";
      echo "<td>$hTurno[0]:$hTurno[1]</td>";
      if(strpos($imgTurno,'/')===false){
        echo "<td>Sin Imagen</td>";
      }else {
        echo '<td><img src="'.'../'.$imgTurno.'" alt="Img Diagnostico" width="100px"></td>';
      }
      echo "</tr>";
    }
  }else{
      echo "<h2> No se cargaron Fichas! </h2>";
  }
}
include "vistaFicha.html";
?>
