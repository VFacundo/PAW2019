var document = document || {},
    console = console || {},
    window = window || {},
    Cuestionario = Cuestionario || {},
    Estructura;

Cuestionario.armar = function(contened){
  window.addEventListener("DOMContentLoaded", function() {//DOMContentLoaded espera a que se carge el cont html
    var estructuraJson, contenedor,tiempo,n=1,tiempoDisponible;
    contenedor = document.getElementById(contened);
    estructuraJson = JSON.parse(window.sessionStorage.getItem("estructura"));
    alert("Dispones de "+estructuraJson['tiempoDeTrabajo']+" segundos para completar el Test!");
    Estructura = estructuraJson;
    tiempo = document.getElementById("tiempo");
    tiempoDisponible = setInterval(function(){
      tiempo.innerHTML = "Tiempo: "+n;
      n++;
      if(n>estructuraJson['tiempoDeTrabajo']){
        clearInterval(tiempoDisponible);
        var event = new Event('submit', {//Creo un nuevo evento
          'bubbles'    : true, //propagacion
          'cancelable' : true  //cancel
          });
        document.getElementById("formulario").dispatchEvent(event);//disparo el event
      }
    },1000);
    /////////////////////////////////////////////
    document.getElementById("formulario").addEventListener.onsubmit = Cuestionario.calcularPuntos;
      document.getElementById("formulario").addEventListener("submit",function(e){
        e.preventDefault;
        var preguntas = estructuraJson['preguntas'],correctas,opciones,nroCorrectas=0,str;
        e.preventDefault();
        for (var i = 0; i < (estructuraJson['cantidadAPreguntar']); i++) {
          str = "pregunta"+i;
          opciones = document.getElementsByClassName(str);
          correctas = preguntas[i]['correctas'];
            for (var j = 0; j < correctas.length; j++) {
                if(opciones[correctas[j]].checked){
                  nroCorrectas++;
                }
            }
        }
        clearInterval(tiempoDisponible);
        alert("Puntuacion: "+Math.round(nroCorrectas/2)+" correctas de "+estructuraJson['cantidadAPreguntar']);
        document.getElementById("aceptar").disabled = true;
      });
      ///////////////////////////////////////////////
    contenedor.appendChild(Cuestionario.preguntas(estructuraJson));
  });
};

Cuestionario.maxOpcion = function(){
var input = event.target,cantidad=0,
  preguntas = document.getElementsByClassName(input.className);
  for (var i = 0; i < preguntas.length; i++) {
    if(preguntas[i].checked){
      cantidad++;
    }
  }
  if(cantidad>2){
    alert("Solo Puedes Selecionar 2 Opciones!");
    input.checked = false;
  }
}

Cuestionario.preguntas = function(estructuraJson){
  var titulo, preguntas, cantP,tiempo,input,arrayNroRandom;
  document.getElementById("titulo").innerText = estructuraJson['titulo'];
  form = document.getElementById("formulario");
  preguntas = estructuraJson['preguntas'];
  cantP = estructuraJson['cantidadAPreguntar'];

  if(cantP<=preguntas.length){
    arrayNroRandom = Cuestionario.generarAleatorios(cantP,(preguntas.length-1));

    for (var i = 0; i < arrayNroRandom.length; i++) {
      input = document.createElement('label');
      input.classList.add("tituloPregunta");
      input.innerHTML = preguntas[arrayNroRandom[i]]['pregunta'] + '<br>';
      form.insertBefore(input,document.getElementById("aceptar"));

        for (var j = 0; j < preguntas[arrayNroRandom[i]]['respuestas'].length; j++) {
            input = document.createElement('label');
            input.innerHTML = '<input type="checkbox" name="pregunta'+i+'[]" class="pregunta'+i+'">'+ preguntas[arrayNroRandom[i]]['respuestas'][j] +'<br>';
            input.addEventListener("change",Cuestionario.maxOpcion);
            form.insertBefore(input,document.getElementById("aceptar"));
        };
    }
  }
      //Cuestionario.maxOpcion();
return form;
}
//Define numeros aleatorios.
Cuestionario.generarAleatorios = function(cantidadNumeros,rango){
  var arrayNro = [];
  while (arrayNro.length<cantidadNumeros){
    var numeroAleatorio = Math.round(Math.random()*(rango));
    var existe = false;
    for(var i=0;i<arrayNro.length;i++){
  	   if(arrayNro [i] == numeroAleatorio){
          existe = true;
          break;
      }
    }
    if(!existe){
      arrayNro[arrayNro.length] = numeroAleatorio;
    }

  }
  return arrayNro;
}
