# TP2-PHP  
~~~
4. Agregue al formulario un campo que permita adjuntar una imagen, y que la etiqueta del campo sea
Diagnóstico. El campo debe validar que sea un tipo de imagen valido (.jpg o .png) y será optativo. La
imagen debe almacenarse en un subdirectorio del proyecto y también debe mostrarse al usuario al
mostrar el resumen del turno del ejercicio 2. ¿Qué sucede si 2 usuarios cargan imágenes con el mismo
nombre de imagen? ¿Qué mecanismo implementar para evitar que un usuario sobrescriba una imagen
con el mismo nombre?
~~~  
##  Respuestas:  
  Si dos usuarios cargan una imagen con el mismo nombre se sobreescriben, para evitar esto se utiliza la funcion  file_exists() en PHP:
~~~
  if(file_exists($archivoImagen)){  
    $uploadOk = 0;  
    $erroresFormulario.="El archivo Imagen ya existe, ";  
  }  
~~~

Para el ejercicio se validaron que sea un formato valido(.jpg .png), que sea una imagen y que no exista otra con el  mismo nombre. 

  Ejecutar formulario.html
