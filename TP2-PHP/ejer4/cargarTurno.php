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

//////////////IMAGEN///////////////////////////////////////////////////////
$directorioImagenes = "img/";
$archivoImagen = $directorioImagenes . basename($_FILES["imgTurno"]["name"]);
$uploadOk = 1;
$tipoImagen = strtolower(pathinfo($archivoImagen,PATHINFO_EXTENSION));
//Se verifica si es una imagen
if(isset($_POST["summit"])){
  $check = getimagesize($_FILES["imgTurno"]["tmp_name"]);
    if($check !== false){
      $uploadOk = 1;
    }else{
      $uploadOk = 0;
      $erroresFormulario.="Error Imagen, ";
    }
}
//Comprobar si el archivo ya existe

if(file_exists($archivoImagen)){
  $uploadOk = 0;
}
//Comprobar formato(.pgn,.jpg)
if($tipoImagen != "jpg" && $tipoImagen != "png"){
  $uploadOk = 0;
}

if($uploadOk == 0){
  $archivoImagen = "Sin Imagen";
  $erroresFormulario.="La imagen no se cargo, ";
}else{
  move_uploaded_file($_FILES["imgTurno"]["tmp_name"],$archivoImagen);
  $archivoImagen ='<img src="'.$directorioImagenes . basename($_FILES["imgTurno"]["name"]).'" alt="Img Diagnostico" width="100px">';
}
//////////////////////////////////////////////////////////////////////////
include 'mostrarTurno.php';
?>
