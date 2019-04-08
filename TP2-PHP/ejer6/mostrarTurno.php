<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Resumen de Turno</title>
  </head>
  <body>
    <h1>Resumen del Turno</h1>
    <ul>
      <li>Nombre: <?= $firstname ?></li>
      <li>Email: <?= $email ?></li>
      <li>Telefono: <?= $tel ?></li>
      <li>Edad: <?= $edad ?></li>
      <li>Calzado: <?= $calzado ?></li>
      <li>Altura: <?= $altura ?></li>
      <li>Fecha Nacimiento: <?= $fechaNac ?></li>
      <li>Color Pelo: <?= $colorPelo ?></li>
      <li>Fecha de Turno: <?= $fechaTurno ?></li>
      <li>Hora de Turno: <?= $hturno[0],':',$hturno[1] ?></li>
      <li>Diagnostico: <?= $imgMostrar ?> </li>
    </ul>
    <p>
      <?php if(empty($erroresFormulario)){
        echo "Formulario Cargado Correctamente!";}
        else {
          echo $erroresFormulario;
      } ?>
    </p>

  </body>
</html>
