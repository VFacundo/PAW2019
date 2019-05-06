# TP3 - CSS & JavaScript
		
## 1) ¿Qué significa que los estilos se apliquen en cascada? ¿cómo aplica la herencia de estilos?
	
Significa que los elementos, dentro de un documento CSS, en los niveles bajos de la jerarquía 
heredan los estilos asignados a los elementos en los niveles más altos. 
La herencia se aplica de modo que si tenemos la siguiente estructura:
```html
	<section>
		<p>Hola mundo!</p>
	</section>
```
Y aplicamos:
```css
	section {
		font-size: 20px;
	} 
```
	El texto del elemento <p> se mostrará con un tamaño de 20 pixeles, esto es, debido a que el elemento
	<p> es hijo del elemento <section> y, por lo tanto, hereda sus estilos.
			
			
## 2) ¿Por qué es necesario utilizar un CSS de Reset?
			
	Es necesario porque los navegadores dan estilos por defecto a diferentes elementos HTML.
	En la mayoría de los casos, estos estilos no solo son diferentes de lo que necesitamos,
	sino que además pueden afectar de forma negativa a nuestro diseño.
	Por ejemplo, los navegadores asignan márgenes a los elementos que usamos frecuentemente
	en nuestro documento, como el elemento <p>. El elemento "<body>" también genera un
	margen alrededor de su contenido, lo que hace imposible extender otros elementos hasta los
	límites de la ventana del navegador. Como si esto fuera poco, la forma en la que se configuran
	los elementos por defecto difiere de un navegador a otro, especialmente cuando
	consideramos ediciones de navegadores antiguas que aún se encuentran en uso. Para poder
	crear un diseño coherente, cualquiera que sea el dispositivo en el que se abre, tenemos que
	resetear algunos de los estilos por defecto, o todos.
				
## 3) ¿Qué es el CSS box model?
		
Es un conjunto de reglas que determinan cómo se van a mostrar las cajas en pantalla (cada
elemento se representa como una caja rectangular), el espacio que ocupan, y cómo se organizan
en la página considerando el espacio disponible.
Actualmente hay varios modelos de cajas disponibles, con el modelo de caja tradicional y el
modelo de caja flexible considerados como estándar. 
	
	Modelo de caja tradicional:
		El modelo de caja tradicional establece que los elementos pueden 
		flotar a cada lado de la ventana y compartir espacio en la misma línea
		con otros elementos, sin importar su tipo. 
		
	Modelo de caja flexible:
		El modelo de caja flexible resuelve los problemas del modelo de caja tradicional de una
		manera elegante. Este modelo aprovecha las herramientas que usa el modelo de caja
		tradicional, como el posicionamiento absoluto y las columnas, pero en lugar de hacer flotar los 
		elementos organiza las cajas usando contenedores flexibles. Un contenedor flexible es un
		elemento que convierte su contenido en cajas flexibles. En este nuevo modelo, cada grupo de
		cajas debe estar incluido dentro de otra caja que es la encargada de configurar sus
		características
				
## 4) ¿Cuál es el código que hay que insertar en una hoja de estilo para poder usar WebFonts?
	
El codigo es:
```css
@font-face {
  font-family: "myFont";
  src: url("myFont.woff");
}
```

## 5) ¿Qué son y para qué sirven los pseudoElementos?

Son palabras claves precedidas por "::", estas pueden ser agregadas al final de los selectores 
para seleccionar una parte determinada de un elemento. Cada pseudoElemento tiene un comportamiento
y caracteristicas diferentes. 
### PseudoElementos:

#### ::after
	Crea un pseudo-elemento que es el ultimo hijo de el elemento seleccionado. A menudo es usado para agregar 
	contenido cosmetico con la propiedad "content" de css.
	Ejemplo:
```css
/* Agregar una flecha despues de los links */
a::after {
  content: "→";
}
```

#### ::before
	Crea un pseudo-elemento que es el primer hijo de el elemento seleccionado. A menudo es usado para agregar 
	contenido cosmetico con la propiedad "content" de css.
	Ejemplo:
```css
/* Agregar un corazon antes de los links */
a::before {
  content: "♥";
}
```

#### ::first-letter
	Es un pseudo-elemento que aplica estilo a la primer letra de la primer linea en un elemento de tipo block,
	pero solo lo hará cuando no este precedido por otro contenido como imagenes, o tablas en linea.
	Ejemplo:
```css
/* Selecciona la primer letra de <p> */
p::first-letter {
  font-size: 130%;
}
```

#### ::first-line
	Es un pseudo-elemento que aplica estilos a la primer linea de un elemento de tipo block. 
	Ejemplo:
```css
/* Selecciona la primer linea de <p> */
p::first-line {
  color: red;
}
```	

#### ::selection
	Es un pseudo-elemento que aplica estilos a una parte del documento que fue seleccionada por el usuario
	(haciendo clic y deslizando el mouse para seleccionar un texto)
	Ejemplo:
```css
/* La seleccion será de color cyan */
::selection {
  background-color: cyan;
}
```		

#### ::backdrop
	Este pseudo-elemento es una caja que se muestra inmediatamente debajo del elemento 
	(y sobre el elemento inmediatamente inferior de la pila, si es que hay), dentro de dicha capa superior.
	Es un pseudo-elemento que se puede utilizar para crear un fondo que oculte el documento subyacente detras de 
	la pila de la capa superior.
	Este pseudo-elemento solo es compatible con algunos navegadores. 
	Dentro de los navegadores mas importantes que no lo soportan esta:
	Google chrome, Opera, Safari, Android webview
	
	
## 6) ¿Cómo se calcula la prioridad de una regla CSS? Expresarlo como una fórmula matemática.
La prioridad de la regla será calculada con el "peso" que esta tenga. La regla de mayor peso prevalecerá sobre la de menor peso.
		Se calcula como: 
```		
Peso = ABC -> Donde:
	A = Cantidad de selectores de ID (Selectores que acceden al atributo 'id' del elemento mediante #).
	B = Cantidad de selectores de CLASE (Selectores que acceden al atributo 'class' del elemento mediante '.').
	C = Cantidad de selectores de HTML (Selectores que acceden al tag html).
```
Ejemplos:
```css
/* A=1; B=1; C=1 => Peso= 111*/
#menu .principal div {
  /* Propiedades */
}
```	
```css
/* A=1; B=0; C=1 => Peso= 101*/
#menu div {
  /* Propiedades */
}
```	
```css
/* A=0; B=1; C=1 => Peso= 11*/
.principal div {
  /* Propiedades */
}
```	
```css
/* A=0; B=0; C=3 => Peso= 3*/
ul li a {
  /* Propiedades */
}
```	
```css
/* A=1; B=1; C=1 => Peso= 113*/
#menu .principal div ul li {
  /* Propiedades */
}
```	
```css
/* A=1; B=3; C=1 => Peso= 131*/
#menu .principal .alternativo .movil div {
  /* Propiedades */
}
```	

## 7) ¿Qué es el view port? ¿Cómo se configura? ¿qué problema soluciona?
El viewport o area de visualizacion representa la parte del navegador donde se muestran nuestras paginas web.
Para configurar y forzar al navegador a definir el tamaño del area de visualizacion igual al tamaño real de la pantall, tenemos que declarar el elemento < meta > 
en la cabecera de nuestros documentos con el nombre viewport y valores que determinan el ancho y la escala que queremos ver. Los valores requeridos son: width e 
initial-scale para declarar el ancho del area de visualizacion y su escala. 

El problema que soluciona es el de normalizar la visualizacion de algunso dispositivos que asignan un ancho de, por ejemplo, 980px al area de visualizacion, sin importar
su tamaño real o el tamaño real de la pantalla. Esto significa que las Media Queries de nuestras hojas de estilo verán un ancho de
980 píxeles cuando en realidad el tamaño del área de visualización es totalmente diferente. 

Ejemplo:
```html
<!DOCTYPE html>
<html lang="es">
<head>
 ...
 <meta name="viewport" content="width=device-width, initial-scale=1">
 ...
</head>
<body>
	...
</body>
</html> 
```

## 8) ¿Qué son las media querys? Enumere los distintos tipos de medios y las principales características de cada uno de ellos

Una Media Query es una regla reservada en CSS que se incorporó con el propósito de permitir
a los desarrolladores detectar el medio en el que se muestra el documento. Por ejemplo,
usando Media Queries podemos determinar si el documento se muestra en un monitor o se
envía a una impresora, y asignar los estilos apropiados para cada caso. Para este propósito, las
Media Queries ofrecen las siguientes palabras clave.
### Tipos de medios

#### all
	Las propiedades se aplican en todos los medios.
#### print
	Las propiedades se aplican cuando la página web se envía a una impresora.
#### screen
	Las propiedades se aplican cuando la página web se muestra en una pantalla color.
#### speech
	Las propiedades se aplican cuando la página web se procesa por un sintetizador de voz. 
	
### Caracteristicas 
	
#### width
	Esta palabra clave determina el ancho en que se aplican las propiedades.
#### height
	Esta palabra clave determina la altura a la que se aplican las propiedades.
#### min-width
	Esta palabra clave determina el ancho mínimo desde el cual que se aplican las propiedades.
#### max-width
	Esta palabra clave determina el ancho máximo hasta el cual que se aplican las propiedades.
#### aspect-ratio
	Esta palabra clave determina la proporción en la cual que se aplican las propiedades.
#### orientation
	Esta palabra clave determina la orientación en la cual que se aplican las propiedades. 
	Los valores disponibles son portrait (vertical) y landscape (horizontal).
#### resolution
	Esta palabra clave determina la densidad de píxeles en la cual que se aplican las propiedades. 
	Acepta valores en puntos por pulgada (dpi), puntos por centímetro (dpcm) o por proporción en píxeles (dppx). 
	
## 9) ¿En qué circunstancias se pueden utilizar las variables css? ¿Qué problemas pueden traer aparejadas? ¿Cuándo consideras que sería bueno utilizarlas?
Se pueden utilizar en circunstancias en las cuales hay que repetir un dato en varios elementos, como podría ser, un color principal
 y un color secundario en una pagina web. Si la web posee muchos elementos y se deseara cambiar la convinacion de colores solo habría que modificar el dato de la variable.
 
Un problema que pueden traer es el de la validez y valores. Cuando se analizan los valores de las propiedades personalizadas, el explorador no sabe donde se utilizarán,
por lo que debe considerar casi todos los valores como validos. Propiedades y variables personalizadas pueden llevar a declaraciones CSS no válidas, dando lugar al nuevo concepto de válido en tiempo calculado.

## 10) CSS Grid Layout ¿Qué es? Explicar las reglas que intervienen en el armado de una grilla. ¿Qué ventajas y desventajas tiene frente a otros Layouts?
Es un sistema de rejilla(Una rejilla es un conjunto de líneas horizontales y verticales que se intersectan) bidimensional para CSS. Contiene funciones que permiten dividir a una pagina en areas o regiones principales, por definir la relacion en terminos de tamaño, posicion y capas entre partes de un control construido a partir de primitivas HTML.

Al igual que las tablas, el grid layout permite a un autor alinear elementos en columnas y filas. Sin embargo, con CSS grid son posibles muchos más diseños y de forma más sencilla que con las tablas. Por ejemplo, los elementos secundarios de un contenedor de cuadrícula podrían posicionarse para que se solapen y se superpongan, de forma similar a los elementos posicionados en CSS.

Al armar una grilla debemos definir un contenedor, luego aplicarle la propiedad "display: grid" y sus hijos heredarán este sistema de grilla.
En forma basica, sus hijos conteneran dos propiedades "grid-column: cantidad_ocupada / cantidad_total" y "grid-row: cantidad_ocupada / cantidad_total"

Diferencias con otros sistemas de grilla:

La diferencia entre CSS Grid Layout y CSS Flexbox Layout es que flexbox fue diseñado para una dimensión, es decir, una fila o una columna.
 Grid layout se diseñó para alinear de forma bidimensional: filas y columnas al mismo tiempo.

Ventajas respecto a Bootstrap / Foundation: La principal ventaja es que ya no hay mas limitaciones de 12 columnas. Como la cuadrícula Bootstrap está dividida en doce columnas, podría haber problemas en un diseño de 5 columnas, 7 columnas, 11 columnas. O cualquier cosa que no sume 12.
 CSS Grid Puede hacer que nuestra cuadrícula tenga exactamente la cantidad de columnas que deseamos ya sean 5 columnas, 7 columnas , 9 columnas o una cantidad explícita.
 Otra ventaja destacable es el soporte del navegador, el 87% del trafico web global es compatible con CSS Grid.
 
Simpleza en el codigo (Grid vs Bootstrap): 

##### CSS Grid
```css
@media screen and (max-width: 680px) {
  .header {
    grid-column: span 6;
  }

  .menu {
    grid-row: 1;
    grid-column: span 6;
  }

  .content {
    grid-column: span 12;
  }
}
```

##### Bootstrap
```html
<!DOCTYPE html>
<html lang="es">
<head>
 ...
</head>
<body>
	<div class="row">
	  <div class="col-md-8">.col-md-8</div>
	  <div class="col-md-4">.col-md-4</div>
	</div>
</body>
</html> 
```

## 11) ¿Qué puntos en común y en que se diferencian las Material Design Guidelines de Google y las Human Interface Guidelines de Apple?

#### Material Design (Google)
La guia de diseño de Google propone utilizar "Material Design", que es, un lenguaje visual que sintetiza los principios clasicos del buen diseño con tecnologia de innovacion y ciencia.
En general, los objetivos que busca la guia, es poder crear un lenguaje visual y desarrollar un sistema subyacente unico que unifique la experiencia de usuario sin importar la plataforma en la que este se encuentre.
Los principios en los que Material fue inspirado es el mundo fisico real y sus texturas, incluyendo como refleja la luz y se emiten las sombras. 
Material Design propone diseños especificos que involucran tipografias, grillas, espacios, escalas, colores, letras en negrita y 
otros diferentes metodos para dar una jerarquía, un sentido y foco a los usuarios.
Ademas, propone darle un significado a los movimientos, ya que estos capturan la atencion del usuario y 
a medida que aparecen elementos en la pantalla, transforman y reorganizan el entorno, generando nuevas transformaciones.

#### Human Interface Guidelines (Apple)
Apple propone el uso de diferentes herramientas (algunas pagas) para diseñar rapido y preciso. Entre ellas propone: Sketch, Photoshop y XD templates.
Ademas, da una guia para cada plataforma de su propiedad: iOS, macOS, watchOS, tvOS. 
Dentro de las guias remarca que el diseño de las aplicaciones debe cumplir con las altas expectativas de calidad y funcionalidad.
Propone que una app debe contar con: Claridad (referido a la claridad de los textos y convinacion de colores), 
Deferencia (un movimiento fluido y crujiente),
Profundidad (diferentes capas visuales y movimientos realistas al transmitir la jerarquía).

Sobre los principios de diseño plantea que una app debe tener una estetica integral, consistencia,
 manipulacion directa (ver acciones del usuario en forma inmediata), proporcionar feedback (como comunicar el progreso de las operaciones, anunciar que el usuario espere una carga, etc), 
 metaforas (hacer objetos virtuales que el usuario pueda relacionar con el mundo real), control de usuario (dejar al usuario que tenga un control sobre la aplicacion, no obstante a esto, si una accion es peligrosa se debe advertir de todas formas).

#### Similitudes
###### Frameworks
Apple propone el uso de UIKit, un framework que define los elementos comunes de una interfaz.
Google propone el framework Material Components que posee componentes como botones, estructuras,
 herramientas para convinar colores y movimientos. En sus repositorios dan soporte para diseño web,
 diseño ios, android y flutter. 
 

###### Principios de diseño
Ambas empresas plantean respetar una serie de principios de diseño con el objetivo de darle al usuario la mejor UX posible 


#### Diferencias
Apple tiene diferentes guias de diseño para sus diferentes plataformas, en cambio, google utiliza una misma guia de diseño
para todas las plataformas (incluyendo aplicaciones para iOS).
Para la creacion de estilos y temas google brinda herramientas desarrolladas por ellos. Mientras que, Apple recomienda el uso de herramientas de terceros.