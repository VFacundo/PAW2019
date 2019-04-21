<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Formulario</title>
  </head>
  <body>
    <nav>
      <a href="../listar">Vista Administrativo</a>
    </nav>
    <h1>Datos</h1>
    <form class="" action="<?=$action?>" method="post" enctype="multipart/form-data">
      <input type="number" name="id" value="<?= $registro['id'] ?>" style="display:none" />
      <label>Nombre: <input type="text" name="firstname" value="<?= $registro['nombre'] ?>" required/></label><br>
      <label>E-Mail: <input type="email" name="email" value="<?= $registro['email'] ?>" required/></label><br>
      <label>Telefono: <input type="tel" name="tel" value="<?= $registro['tel'] ?>" maxlength="12" required/></label><br>
      <label>Edad: <input type="number" name="edad" min="1" max="100" value="<?= $registro['edad'] ?>" /></label><br>
      <label>Talla Calzado: <input type="number" name="calzado" value="<?= $registro['calzado'] ?>" min="20" max="45"/></label><br>
      <label>Altura: <input type="range" name="altura" id="altura" min="100" max="230" oninput="alturaOut.value = altura.value"/></label>
      <output name="alturaOut" id="alturaOut"><?= $registro['altura'] ?></output>cm<br>
      <label>Fecha de Nacimiento: <input type="date" name="fechaNac" min="1919-01-01" max="2019-12-12" value="<?= $registro['fechaNac'] ?>" required/></label><br>
      <label>Color de Pelo:
      <select name="colorPelo">
        <option value="negro" <?php if($registro['colorPelo']=='negro'){echo 'selected="selected"';} ?> >Negro</option>
        <option value="castanio" <?php if($registro['colorPelo']=='castanio'){echo 'selected="selected"';} ?> >Castaño</option>
        <option value="rubio" <?php if($registro['colorPelo']=='rubio'){echo 'selected="selected"';} ?> >Rubio</option>
        <option value="pelirrojo" <?php if($registro['colorPelo']=='pelirrojo'){echo 'selected="selected"';} ?> >Pelirrojo</option>
      </select></label><br>
      <label>Fecha de Turno: <input type="date" name="fechaTurno" min="2019-01-01" max="2020-12-12" value="<?= $registro['fechaTurno'] ?>" required/></label><br>
      <label>Horario de Turno: <input type="time" name="hturno" id="appt" min="08:00" max="17:00" step="900" value="<?= $registro['hturno'] ?>" required/></label><br>
      <label>Diagnostico: <input type="file" name="imgTurno" accept="image/jpeg,image/png"/ value="<?= $registro['diagnostico'] ?>"></label><br>
      <input type="submit" name="enviar" value="Submit">
      <input type="reset" name="borrar" value="Clear">
    </form>

  </body>
</html>
