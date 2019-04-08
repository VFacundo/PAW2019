<?php
if($_SERVER['REQUEST_METHOD']=== 'POST'){
  $metodo= INPUT_POST;
}elseif ($_SERVER['REQUEST_METHOD']==='GET') {
  $metodo = INPUT_GET;
}else{
  http_response_code(400);
  echo "Peticion Malformada";
  exit;
}
//echo("Esta ventana se utiliza a modo de LOG!");

$firstname = filter_input($metodo,'firstname',FILTER_SANITIZE_STRING);
$email = filter_input($metodo,'email',FILTER_SANITIZE_STRING);
$tel = filter_input($metodo,'tel',FILTER_SANITIZE_STRING);
$edad = filter_input($metodo,'edad',FILTER_SANITIZE_STRING);
$calzado = filter_input($metodo,'calzado',FILTER_SANITIZE_STRING);
$altura = filter_input($metodo,'altura',FILTER_SANITIZE_STRING);
$fechaNac = filter_input($metodo,'fechaNac',FILTER_SANITIZE_STRING);
$colorPelo = filter_input($metodo,'colorPelo',FILTER_SANITIZE_STRING);
$fechaTurno = filter_input($metodo,'fechaTurno',FILTER_SANITIZE_STRING);
$hturno = filter_input($metodo,'hturno',FILTER_SANITIZE_STRING);
/*
$firstname = $_POST['firstname'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$edad = $_POST['edad'];
$calzado = $_POST['calzado'];
$altura = $_POST['altura'];
$fechaNac = $_POST['fechaNac'];
$colorPelo = $_POST['colorPelo'];
$fechaTurno = $_POST['fechaTurno'];
$hturno = $_POST['hturno'];
*/
$erroresFormulario="";

//strlen($var)-> long del string
// operador log || or (true o true)
//FILTER_SANITIZE_STRING elimina tag html
//FILTER_FLAG_STRIP_HIGH elimina ascii>127
$firstname = filter_var($firstname,FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
if((strlen($firstname)<2) || (!preg_match("/^[a-zA-Z ]*$/",$firstname))){
  $erroresFormulario.="Error Nombre, ";
}

if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
  $erroresFormulario.="Error Mail, ";
}

if(strlen($tel)<12 || (!preg_match("/^[0-9]*$/",$tel))){
  $erroresFormulario.="Error Telefono, ";
}

$edad = filter_var($edad, FILTER_SANITIZE_NUMBER_INT);
if((($edad<1) || ($edad>100)) || (!preg_match("/^[0-9]*$/",$edad))){
  $erroresFormulario.="Error Edad, ";
}

$calzado = filter_var($calzado, FILTER_SANITIZE_NUMBER_INT);
if((($calzado<20) || ($calzado>45)) || (!preg_match("/^[0-9]*$/",$calzado))){
  $erroresFormulario.="Error Calzado, ";
}

$altura = filter_var($altura, FILTER_SANITIZE_NUMBER_INT);
if((($altura<100) || ($altura>230)) || (!preg_match("/^[0-9]*$/",$altura))){
  $erroresFormulario.="Error Altura, ";
}
// yy-mm-dd
//date(j) dia del mes sin cero
//date(n) mes sin cero
//date(Y) anio
$fechaNac = explode('-',$fechaNac);
if((checkdate($fechaNac[1],$fechaNac[2],$fechaNac[0]))){
  $fechaNac = implode('/',array_reverse($fechaNac));
  if(date("d/m/Y")<$fechaNac){
    $erroresFormulario.="Error Fecha Nacimiento, ";
  }
}

$arrayPelo = ['negro','castanio','rubio','pelirrojo'];
if((!in_array($colorPelo,$arrayPelo)) || (strlen($colorPelo)==0)){
  $erroresFormulario.="Error Color Pelo, ";
}

$fechaTurno = explode('-',$fechaTurno);
if((checkdate($fechaTurno[1],$fechaTurno[2],$fechaTurno[0]))){
  $fechaTurno = implode('/',array_reverse($fechaTurno));
  if(date("d/m/Y")>$fechaTurno){
    $erroresFormulario.="Error Fecha Turno, ";
  }
}

$hturno = explode(':',$hturno);
if((($hturno[0]<8) || ($hturno[0]>17)) || (($hturno[1]<0) || ($hturno[1]>60))){
  if($hturno[1] % 15 != 0){
    $erroresFormulario.="Error Hora Turno, ";
  }
}

/* $datos = filter_input_array($metodo, [
 'mensaje'=>FILTER_SANITIZE_STRING
]);

$mensaje = "Su mensaje es: {$datos['mensaje']}";
*/
//include 'mensaje.php';
//var_dump($datos);
//echo $erroresFormulario;
include 'mostrarTurno.php';
?>
