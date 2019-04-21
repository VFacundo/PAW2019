<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Ficha del Turno</title>
  </head>
  <body>
      <a href="../listar">Administracion</a>
    <h1>Ficha del Turno Completa</h1>
    <ul>
      <li>Nombre: <?= $registro['nombre'] ?></li>
      <li>Email: <?= $registro['email'] ?></li>
      <li>Telefono: <?= $registro['tel'] ?></li>
      <li>Edad: <?= $registro['edad'] ?></li>
      <li>Calzado: <?= $registro['calzado'] ?></li>
      <li>Altura: <?= $registro['altura'] ?></li>
      <li>Fecha Nacimiento: <?= $registro['fechaNac'] ?></li>
      <li>Color Pelo: <?= $registro['colorPelo'] ?></li>
      <li>Fecha de Turno: <?= $registro['fechaTurno'] ?></li>
      <li>Hora de Turno: <?= $registro['hturno'] ?></li>
      <li>Diagnostico: <?php
      if(!empty($registro['diagnostico']))
        echo '<br><img src="'. '../../' . $registro['diagnostico'] . '" alt="Img Diagnostico" width="500px">';
        else {
          echo "Sin Imagen";
        } ?></li>

    </ul>
  </body>
</html>
