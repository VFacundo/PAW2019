<?php
namespace UNLu\PAW\Controladores;
use UNLu\PAW\Modelos\turnos;

class Administracion extends \UNLu\PAW\Libs\Controlador{

  public function listar() {
    $db = new turnos();
    $resultado = $db->selectAdmin();
    $this->pasarVariableAVista('registros',$resultado);
  }

  public function ficha($id){
    $db = new turnos();
    $resultado = $db->selectTurno($id);
    $this->pasarVariableAVista('registro',$resultado);
  }

  public function eliminar($id){
    $db = new turnos();
    $resultado = $db->eliminarTurno($id);
    $this->pasarVariableAVista('registro',$resultado);
  }

  public function update($id){
    $db = new turnos();
    $id = filter_input(INPUT_POST,'id',FILTER_SANITIZE_STRING);
    $firstname = filter_input(INPUT_POST,'firstname',FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST,'email',FILTER_SANITIZE_STRING);
    $tel = filter_input(INPUT_POST,'tel',FILTER_SANITIZE_STRING);
    $edad = filter_input(INPUT_POST,'edad',FILTER_SANITIZE_STRING);
    $calzado = filter_input(INPUT_POST,'calzado',FILTER_SANITIZE_STRING);
    $altura = filter_input(INPUT_POST,'altura',FILTER_SANITIZE_STRING);
    $fechaNac = filter_input(INPUT_POST,'fechaNac',FILTER_SANITIZE_STRING);
    $colorPelo = filter_input(INPUT_POST,'colorPelo',FILTER_SANITIZE_STRING);
    $fechaTurno = filter_input(INPUT_POST,'fechaTurno',FILTER_SANITIZE_STRING);
    $hturno = filter_input(INPUT_POST,'hturno',FILTER_SANITIZE_STRING);
    $imgTurno = $_FILES;

    $arrayTurno = [
          'id' => $id,
          'firstname' => $firstname,
          'email' => $email,
          'tel' => $tel,
          'edad' => $edad,
          'calzado' => $calzado,
          'altura' => $altura,
          'fechaNac' => $fechaNac,
          'colorPelo' => $colorPelo,
          'fechaTurno' => $fechaTurno,
          'hturno' => $hturno,
          'imgTurno' => $imgTurno
      ];
      $resultado = $db->updateTurno($arrayTurno);
      $this->pasarVariableAVista('registro',$resultado);
  }

  public function modificar($id){
    $db = new turnos();
    $resultado = $db->selectTurno($id);
    $action = $_SERVER['REQUEST_URI'];
    $action = explode("/",$action);
    $action = str_replace("modificar","update",$action);
    $action = implode("/",$action);
    $this->pasarVariableAVista('action',$action);
    $this->pasarVariableAVista('registro',$resultado);
  }


}
