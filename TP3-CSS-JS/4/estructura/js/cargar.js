var document = document || {},
    console = console || {},
    window = window || {},
    Cargar = Cargar || {};

Cargar.cargarEst = function(){
  window.addEventListener("DOMContentLoaded", function(){
    document.getElementById("bEjemplo").addEventListener("click",Cargar.ejemplo);
      form = document.getElementById("form").onsubmit = function(){
        var estructuraJson = document.getElementById("estructura").value;
            window.sessionStorage.setItem("estructura",estructuraJson);
            window.location.assign('./html/cuestionario.html');
        return false;
      }
  });
}

Cargar.ejemplo =function(){
    var jsonEx = {
    "titulo": "Título del Test",
    "preguntas": [{
    "pregunta": "Pregunta 1",
    "respuestas": ["respuesta A", "respuesta B", "respuesta C", "respuesta D"],
    "correctas": [0, 3]
    },
    {
    "pregunta": "Pregunta 2",
    "respuestas": ["respuesta A", "respuesta B", "respuesta C", "respuesta D"],
    "correctas": [0, 3]
    }],
    "cantidadAPreguntar": 2,
    "tiempoDeTrabajo": 10
    };

    document.getElementById("estructura").value = (JSON.stringify(jsonEx,null,"\t"));
}
