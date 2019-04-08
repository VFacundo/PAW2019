# TP2-PHP  
~~~
6. Agregar persistencia al sistema de turnos. Todos los datos del formulario deben almacenarse
mediante algún mecanismo para poder ser recuperados posteriormente. Crear una nueva vista que le
permita a un empleado administrativo visualizar todos los turnos en una tabla. La tabla debe incluir los
siguientes campos:
  a. Fecha del turno
  b. Hora del turno
  c. Nombre del paciente
  d. Teléfono
  e. Email
  f. Link a la ficha del turno (la ficha se implementa en el siguiente punto)
Esta página y la del formulario del punto 2 deben contar con una barra de navegación que permita
ir a una u otra pantalla.
Además, al procesar el formulario en el lado servidor, el sistema asigne un número de turno (que no
debe repetirse).
~~~  
##  Respuestas:  
  Como mecanismo de Serializacion se utilizo JSON. El numero que se le asigna a los turnos se corresponde  con la posicion que ocupa el registro en el array que se persiste, con lo cual se asegura que los numeros no se repitan.  
  Para guardar la imagen del turno se almacena directamente la url de la imagen.   

  Ejecutar formulario.html  
  Para la vista del empleado administrativo ejecutar /vistaAdministrativo/cargaTablaAdmin.php  
