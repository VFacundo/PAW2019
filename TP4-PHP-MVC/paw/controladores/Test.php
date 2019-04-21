<?php
namespace UNLu\PAW\Controladores;
use UNLu\PAW\Libs\VIstaHTML;
use UNLu\PAW\Modelos\turnos;
/**
 * Description of Test
 *
 * @author Santiago Ricci <sricci.soft at gmail.com>
 */
class Test extends \UNLu\PAW\Libs\Controlador{

    public function index(){
        $turnos = new turnos();
    }

}
