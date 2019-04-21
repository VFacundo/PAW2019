<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Vista Administrativo</title>
  </head>
  <body>
    <nav>
      <a href="../formulario/cargar">Formulario</a>
    </nav>
    <table border="1" cellspacing=0>
      <caption>Tabla de Turnos</caption>
        <thead>
          <tr>
            <th>Fecha del Turno</th>
            <th>Hora del Turno</th>
            <th>Nombre del Paciente</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Ficha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <?php
          if(!empty($registros)){
            foreach ($registros as $value) {
              $id = $value['id'];
              $fechaTurno = $value['fechaTurno'];
              $hTurno = $value['hturno'];
              $firstname = $value['nombre'];
              $tel = $value['tel'];
              $email = $value['email'];
              $ficha = str_replace("listar","ficha",$_SERVER['REQUEST_URI']);
              $eliminar = str_replace("listar","eliminar",$_SERVER['REQUEST_URI']);
              $modificar = str_replace("listar","modificar",$_SERVER['REQUEST_URI']);

              echo "<tr>";
              echo "<td>$fechaTurno</td>";
              echo "<td>$hTurno</td>";
              echo "<td>$firstname</td>";
              echo "<td>$tel</td>";
              echo "<td>$email</td>";
              echo '<td><a href='."$ficha".'/'."$id".'>Vista Ficha</a></td>';
              echo '<td><a href='."$modificar".'/'."$id".'>Modificar</a>',' / ','<a href='."$eliminar".'/'."$id".'>Eliminar</a></td>';
              echo "</tr>";
            }
          }else{
            echo "<tr>";
            echo "<td colspan= 7 align=center> Sin Registros </td>";
            echo "</tr>";
          }
          ?>
        </tbody>
    </table>
  </body>
</html>
