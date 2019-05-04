# TP3-CSS JS
1. __¿Qué significa que los estilos se apliquen en cascada? ¿cómo aplica la herencia de estilos?__
~~~
Que los estilos se apliquen es cascada indica basicamente que el orden de las reglas CSS son importantes, que predomine  
un selector sobre otro depende de tres factores:
    -Importancia: Consiste en la regla de sintaxis !important que se utiliza para asegurarse que la regla predomine  
                  sobre el resto.
    -Especifidad: Es la importancia que se le asigna a una declaracion CSS dada, se determina por un valor correspondiente a  
                  cada tipo de selector. Cuando varias declaraciones tienen igual valor de Especificidad se aplica al elemento  
                  la ultima declaracion encontrada en Css. Esta regla solo se aplica cuando el mismo elemento es objetivo de  
                  multiples declaraciones.
                  Selectores segun Especificidad:
                      -Selectores del tipo h1 y pseudo elementos (::before etc)
                      -Selectores de clase (.selector) y selectores de atributos.
                      -Selectores de ID (#selector).
                  Los estilos añadidos a un elemento(style="") siempre sobreescriben a cualquier estilo Css.
    -Orden del Codigo: Si varios selectores afectan al mismo elemento y tienen la misma importancia y especificidad, la regla  
    que prevalece es el orden de codigo(las ultimas reglas sobre las primeras).
~~~

2. __¿Por qué es necesario utilizar un CSS de Reset?__
~~~
Los CSS Reset son importantes debido a que cada navegador aplica diferentes estilos por defecto a los elementos, lo que genera  
que determinado contenido de la web se muestre de forma diferente. Los Reset tratan de minimizar estas multiples diferencias  
que puedan surgir.
~~~

3. __¿Qué es el CSS box model?__
~~~
Cada elemento HTML puede considerarse como un cuadro rectangular, el modelo CSS box es basicamente una caja que encierra a los elementos.  
Css determina el tamaño, posicion y las propiedades de estos cuadros.  
Cada caja se compone de cuatro partes o areas: margins, borders, padding, content.
![Imagen Request](boxmodel.png "requestEjer5")
  -Content: Delimitada por el area de contenido, contiene el contenido real del elemento. Ya sea texto, imagen o un reproductor  
  de video.
  -Padding: Extiende el area del Content y genera un espacio al rededor de el.
  -Borders: Extiende el area de relleno para incluir los bordes del elemento.
  -Margins: Extiende el area del borde, creando un area vacia para separar un elemento de otro.
El modelo de caja, permite añadir un borde a los elementos y una separacion entre ellos.
~~~

4. __¿Cuál es el código que hay que insertar en una hoja de estilo para poder usar WebFonts?__
~~~
Las WebFonts permiten una alternativa a utilizar las llamadas fuentes seguras las cuales estan disponibles en casi cualquier  
computadora de un usuario final, lo que posibilitaba que todos los usuarios tengan una experiencia similar al visitar una web,  
pero a la vez obligaba a utilizar un conjunto reducido de fonts.
Para utilizar una WebFont, en el archivo css:
  -Importar la WebFont:
        @import url(http://fonts.googleapis.com/css?family=Roboto);
  -Seleccionar la fuente:
        font-family: 'Roboto', sans-serif;
~~~

5. __¿Qué son y para qué sirven los pseudoElementos?__
~~~
Los pseudoElementos son claves precedidas por :: que se añaden al final del selector para dar estilo a una determinada parte  
de un elemento.
    pseudoElementos:
          - ::after
          - ::before
          - ::first-letter
          - ::first-line
          - ::selection
          - ::backdrop

Por ejemplo si se tiene un parrafo <p> </p> y se desea que la primer letra del mismo se muestre mas grande se utilizaria el  
pseudoElementos de la siguiente forma:
      p::first-letter{
        font-size:3em;
      }
~~~

6. __¿Cómo se calcula la prioridad de una regla CSS? Expresarlo como una fórmula matemática.__
~~~
Calculo de Especificidad:
  Para asignarle valores a las reglas se comienza en 0 , se suma 1000 por un estilo añadido a un elemento(style="") ,se suma  
  100 por selector de ID, 10 por cada clase o pseudo-clase, 1 por nombre de elemento o pseudoElemento. Luego la regla que  
  resulte mayor Regla1<Regla2<ReglaN sera la que se aplique.
      Ejemplo:
          Regla1: h1
          Regla2: #id h1
          Regla3: <div id='id'><h1 style='color: #ffff'>Titulo</h1></div>

          Regla1 = 1
          Regla2 = 101
          Regla3 = 1000

          Especificidad = 1<101<1000
~~~

7. __¿Qué es el view port? ¿Cómo se configura? ¿qué problema soluciona?__
~~~
El viewport(Area de Visualizacion) es la parte en la ventana del navegador en que se muestran las paginas web. Debido a la relacion  
entre la ventana y el area de visualizacion se supone que ambos deberian presentar el mismo tamaño en dispositivos moviles pero  
esto no se cumple en todos los casos. Algunos dispositivos cuentan con una configuracion por defecto en la cual asignan 980px  
al area de visualizacion, sin importar el tamaño de la pantalla. Esto significa que las Media Querys(regla reservada en CSS  
que permite detectar el medio en que se muestra un documento) veran un ancho de pantalla que es totalmente diferente al viewport.  
Para configurar el viewport y forzar al navegador a definir el tamaño del viewport igual al tamaño de real de la pantalla se  
debe declarar el elemento <meta> con el nombre viewport y los valores width e initial-scale para declarar el ancho del area y  
su escala.  
  <meta name="viewport" content="width=device-width, initial-scale=1">
~~~

8. __¿Qué son las media querys? Enumere los distintos tipos de medios y las principales características de cada uno de ellos.__
~~~
Una Media Query es una regla reservada de CSS que permite detectar el medio en que se muestra un documento, y de esta forma  
asignar los estilos apropiados para cada caso.
  Tipos de Medios:
    -All: Las propiedades que se aplican en todos los medios.
    -Print: Las propiedades que se aplican cuando la web se envia a una impresora.
    -Screen: Las propiedades aplicadas cuando la web se muestra en una pantalla color.
    -Speech: Propiedades aplicadas cuando la web se procesa por un sintetizador de voz.

  Funciones Multimedia:
    -width: Determina el ancho en que se aplican las propiedades.
    -height: Altura en que se aplican las propiedades.
    -min-width, max-width: Minimo y maximo ancho en que se aplican las propiedades.
    -aspect-radio: Proporcion en la cual se aplican las propiedades.
    -orientation: Orientacion en que se aplican las propiedades (landscape, portrait).
    -resolution: Densidad de pixeles en la cual se aplican las propiedades.
~~~

9. __¿En qué circunstancias se pueden utilizar las variables css? ¿Qué problemas pueden traer aparejadas? ¿Cuándo consideras que sería bueno utilizarlas?__
~~~
Las variables CSS, contienen valores especificos definidos por los usuarios que se pueden volver a utilizar en el documento.  
Se establecen mediante una notacion personalizada(ej. --main-color:black;) y se acceden mediante la funcion var().  
Se debe tener en cuenta que las variables CSS heredan su valor de sus padres.
Un problema que se puede tener es que cuando se analizan los valores de las propiedades personalizadas, el explorador no sabe  
donde van a utilizarse debido a esto debe considerar todos los valores como validos y al ser validos pueden utilizarse mediante  
var() en contextos donde tal vez no tengan sentido.  
Resultan utiles en sitios grandes con mucho CSS donde por lo general se repiten muchos valores. Por ejemplo un mismo color se  
utiliza muchas veces y si se requiere modificar implicaria una busqueda global en todo el documento. Con las variables el valor  
se almacena una vez y luego se hace referencia.
~~~

10. __CSS Grid Layout ¿Qué es? Explicar las reglas que intervienen en el armado de una grilla. ¿Qué ventajas y desventajas tiene frente a otros Layouts?__
~~~
CSS Grid Layout 
~~~
