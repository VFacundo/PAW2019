# TP2-PHP  
~~~
1. Elabore una aplicación PHP que ofrezca al usuario un formulario web para la carga de los datos de
una persona que solicita turno en el médico. Campos del formulario:
  a. Nombre del paciente (obligatorio)
  b. Email (obligatorio)
  c. Teléfono (obligatorio)
  d. Edad
  e. Talla de calzado (desde 20 a 45 enteros)
  f.Altura (usando la herramienta de deslizador)
  g. Fecha de nacimiento (obligatorio)
  h. Color de pelo (Usando un elemento select con las opciones que usted considere adecuadas)
  i. Fecha del turno (obligatorio)
  j. Horario del turno (Entre las 8:00 hasta las 17:00 con turnos cada 15 minutos)
  k. 2 botones: Enviar y Limpiar.
Todos los elementos del formulario deben validarse del lado de cliente y servidor, con el formato
que mejor se ajuste y permitan HTML y PHP. Además, tomar en cuenta de validar que los datos
ingresados se encuentren en los rangos especificados.
~~~  
##  Respuestas:  
Se realizan validaciones en formulario.html(las permitidas por html) y en cargarTurno.php .  
Datos que se validaron:  
  Nombre: en HTML que el campo sea text y obligatorio, en php que solo contenga letras.  
  Email: en HTML campo del tipo mail y obligatorio, en php FILTER_VALIDATE_EMAIL para verificar que sea una direccion valida.  
  Telefono: en HTML campo del tipo tel, obligatorio y un max de 12 caracteres (codigo de pais+codigo de area sin 0+nro sin 15), en PHP solo numeros del 0-9.  
  Edad: en HTML campo del tipo entero, min 1 y max 100, en PHP min 1, max 100 y que sean solo numeros.  
  Talla Calzado: en HTML campo del tipo entero, min 20 y max 45, en PHP min 20, max 45 y que solo sean numeros.  
  Altura: en HTML maximo y minimo, en PHP maximo, minimo y que sea enteros.  
  Fecha Nacimiento: en HTML campo date, maximo, minimo y que sea obligatorio, en PHP que sea una fecha correcta y que no sea mayor a la fecha actual.  
  Color de Pelo: en PHP que lo que se recibio sea una de las opciones disponibles.  
  Fecha del Turno: en HTML campo date, maximo, minimo y que sea obligatorio, en PHP que sea una fecha correcta y que no sea menor a la fecha actual.  
  Horario del Turno: en HTML campo del tipo time, minimo, maximo y el salto (15min), lo mismo en PHP.  

  Ejecutar formulario.html
