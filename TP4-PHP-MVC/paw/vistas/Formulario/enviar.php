<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Resumen de Turno</title>
  </head>
  <body>
    <a href="../formulario/cargar">Cargar Formulario</a>
    <h1>Resumen del Turno</h1>
    <ul>
      <li>Nombre: <?= $arrayTurno['firstname'] ?></li>
      <li>Email: <?= $arrayTurno['email'] ?></li>
      <li>Telefono: <?= $arrayTurno['tel'] ?></li>
      <li>Edad: <?= $arrayTurno['edad'] ?></li>
      <li>Calzado: <?= $arrayTurno['calzado'] ?></li>
      <li>Altura: <?= $arrayTurno['altura'] ?></li>
      <li>Fecha Nacimiento: <?= $arrayTurno['fechaNac'] ?></li>
      <li>Color Pelo: <?= $arrayTurno['colorPelo'] ?></li>
      <li>Fecha de Turno: <?= $arrayTurno['fechaTurno'] ?></li>
      <li>Hora de Turno: <?= $arrayTurno['hturno'] ?></li>
      <li>Diagnostico: <?= $img  ?> </li>

    </ul>
    <p>
      <?php if(empty($errores)){
        echo "Formulario Cargado Correctamente!";}
        else {
          echo $errores;
      } ?>
    </p>

  </body>
</html>
