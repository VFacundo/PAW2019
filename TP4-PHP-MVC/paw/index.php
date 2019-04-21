 <?php
require_once 'libs/autoloader.php';

use UNLu\PAW\Libs\Configuracion;
use UNLu\PAW\Libs\Despachador;
use UNLu\PAW\Libs\Router;

$router = new Router();

$solicitud = substr($_SERVER['REQUEST_URI'],1);//Obtengo la url q ing el user
$solicitud = strstr($solicitud,'/');
$solicitud = strtolower($solicitud);

$despachador = new Despachador($router);
$configuracion = new Configuracion(__DIR__ . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'app.php');
$rutaPorDefecto = $configuracion->getConfiguracion('Router.accionPorDefecto');

/*
if(!(is_null($rutaPorDefecto)) && (strlen($solicitud))<=1){
    $router->setRutaPorDefecto($rutaPorDefecto);
}else{
  $rutaPorDefecto = $router->route($solicitud);
  $router->setRutaPorDefecto($rutaPorDefecto);
}
*/

if(strlen($solicitud)>1){
  $rutaPorDefecto = $router->route($solicitud);
  //var_dump($rutaPorDefecto);
}

if(!is_null($rutaPorDefecto)){
  $router->setRutaPorDefecto($rutaPorDefecto);
}

$despachador->desapchar($_SERVER);

/*
CREATE TABLE turnos(
    id int AUTO_INCREMENT,
	nombre varchar(25) NOT NULL,
    email varchar(25) NOT NULL,
    tel varchar(12) NOT NULL,
    edad int,
    calzado int,
    altura int,
    fechaNac date NOT NULL,
    colorPelo char(15),
    fechaTurno date NOT NULL,
    hturno time,
    diagnostico varchar(25),
    PRIMARY KEY(id)
)
ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci
AUTO_INCREMENT = 1

*/
