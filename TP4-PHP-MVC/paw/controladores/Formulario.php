<?php
namespace UNLu\PAW\Controladores;
use UNLu\PAW\Libs\VIstaHTML;
use UNLu\PAW\Modelos\turnos;

class Formulario extends \UNLu\PAW\Libs\Controlador{
    public function cargar(){
      $action = $_SERVER['REQUEST_URI'];
      $action = explode("/",$action);
      $action = str_replace("cargar","enviar",$action);
      $action = implode("/",$action);
      $this->pasarVariableAVista('action',$action);
    }

    public function enviar(){//Envia al modelo y muestra el resumen
      $db = new turnos();
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
      $resumen = $db->insertTurnos($arrayTurno);
      $this->pasarVariableAVista('arrayTurno',$arrayTurno);
      $this->pasarVariableAVista('errores',$resumen[0]);
      $this->pasarVariableAVista('img',$resumen[1]);
    }
}
