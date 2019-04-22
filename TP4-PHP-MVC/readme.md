# TP4-PHP-MVC

~~~
Para ejecutar el ejercicio debe configurarse el archivo /modelos/dbparameters.json , ingresando un nombre de usuario
y contraseña validos ademas del nombre de una base de datos previamente creada.
El usuario debe contar con los permisos suficientes para crear una tabla dentro de la base de datos (tabla turnos),
la cual se crea automaticamente.

    //dbparameters.json//
    [
      {
          "host": "localhost",
          "dbname":"Nombre bd",
          "user": "nombre de usuario",
          "pass": "contraseña"
      }
    ]

~~~

1. __Instale el Sistema Gestor de Bases de Datos MySQL y las extensiones necesarias para poder
interactuar con la misma desde PHP. Documente brevemente los pasos realizados y como verificó
que el driver se instaló correctamente (vía phpinfo y vía un script de prueba).__

~~~
Se instalo el entorno de desarrollo XAMPP, el cual incluye todos los paquetes necesarios al momento de la instalacion.
Se verifico 'phpinfo.php' :
En la seccion configuracion encontramos.
    -Mysqli: Es una extension que permite acceder a las funcionalidades de MySQL. Esta extension proporciona una
              interfaz Orientada a Objetos y tambien una interfaz Procedural.
    -PDO_Mysql: Es un driver que implementa PDO para permitir que se pueda acceder a las bases de datos MySQL mediante PHP.
    -mysqlnd : Es el driver nativo de MySQL, es una extension de PHP y no proporciona una API para la conectividad de
                base de datos MySQL como si lo hacen las extensiones mencionadas anteriormente, estas extensiones
                pueden utilizar el controlador nativo para comunicarse con el servidor MySQL.

Script de Prueba:
  Se adjunta el Script de prueba , el cual intenta una conexion en primer lugar con Mysqli y luego con PDO_Mysql.
~~~

2. __Genere un objeto que construya y gestione la conexión a la base de datos. El objeto debe permitir
vía constructor la provisión de los datos de acceso. Los datos de acceso deben estar en un archivo
de configuración específico y fuera del control de versiones.__  

~~~
 El objeto que gesiona la conexion (dbconnect.php) se incluye dentro de la carpeta modelos, para obtener los datos de acceso,  
 se utiliza un archivo JSON.
 Para que el archivo que contiene los parametros de conexion no tenga seguimiento se utiliza el comando: git rm --cached <file>
~~~

3. __Extienda el sistema de gestión de turnos médicos para que los datos sean persistidos sobre una
base de datos. La generación del número de turno debe hacerse vía motor de base de datos. ¿Que
cambios hubo que realizar para la generación del id?__  
~~~
 En la carpeta modelos se implemento la clase turno, que se encarga de persistir los datos en una base de datos mysql.  
 La generacion del numero de turno se realiza automatica, mediante la creacion del campo id que se declaro como AUTO_INCREMENT.  
 Esto quiere decir que el id tiene valores numericos que se generan automaticamente de forma secuencial cada vez que se  
 inserta un registro.
~~~  

4. __Modifique el sistema para permitir que las imágenes sean persistidas sobre la base de datos. El
software debe permitir cargar imágenes de hasta 10 MB.__
~~~
  Dentro de la carpeta /modelos se incluye un script capaz de persistir y recuperar una imagen de la base de datos. Para la resolucion
  del ejercicio se persistieron solo las rutas de las imagenes y las mismas se almacenaron en el filesystem.
~~~

5. __¿Qué es un motor de persistencia ORM (Object-Relational Mapping; Mapeo objeto-relacional)?
¿Qué problemática resuelve? Realice una evaluación de cuánto le costaría modificar el código para
implementar uno en el sistema de turnos por usted desarrollado. Si para realizar la evaluación
necesita elegir un producto particular, aclarelo.__
~~~
  ORM es un modelo de programacion que permite el mapeo de las estructuras de una base de datos relacional sobre una estructura logica  
  que consiste en una serie de entidades para facilitar la tarea del programador. La estructura de la base de datos queda vinculada con  
  las entidades(base de datos virtual) definida en ORM, de modo que las acciones a realizar sobre la BD se realizan mediante ORM.
  Este modelo permite abstraerse del motor de base de datos utilizado, permite realizar las acciones de CRUD(Create,read,update,delete)  
  de una forma sencilla a travez de un lenguaje de alto nivel orientado a objetos.
  Por Ejemplo si se tiene una tabla de productos y se almacena su nombre:  
    Sin ORM:
        $consulta = "INSERT INTO productos (id,nombre) VALUES (1,cafe)";  
        pdo->prepare($consulta);  
        pdo->execute($consulta);  

    Con ORM:  
        $producto = new producto();  
        $producto->setId(1);  
        $producto->setNombre('cafe');  
        $producto->save();  

  Como se puede observar con ORM no fue necesario escribir la sentencia SQL, lo cual nos permitiria cambiar el motor de base de datos facilmente.  
  Si ademas fuera necesario añadir un nuevo campo a nuestra base de datos se deberia reveer todas las consultas escritas y modificarlas,  
  en cambio con ORM solo se deberia modificar el archivo de la entidad correspondiente y añadir el campo nuevo.  
  Se podria relizar una implementacion de ORM a muy bajo costo, basicamente seria la instalacion y configuracion de la herramienta ORM y  
  luego modificar las consultas escritas en SQL a la sintaxis de la herramienta utilizada. Podria implementarse mediante Propel o Doctrine.
~~~
