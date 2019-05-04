var document = document || {},
    console = console || {},
    window = window || {},
    Iniciar = Iniciar || {};

Iniciar.iniciarJuego = function(){
  window.addEventListener("DOMContentLoaded", function(){
     var form = document.getElementById("form");
        document.getElementById("jugador1").value = window.sessionStorage.getItem("jugador1");
        document.getElementById("jugador2").value = window.sessionStorage.getItem("jugador2");
      form.onsubmit = function(){
        var nombre1 = document.getElementById("jugador1").value,
            nombre2 = document.getElementById("jugador2").value,
            dificultad = document.getElementById("dificultad").value;
            window.sessionStorage.setItem("jugador1",nombre1);
            window.sessionStorage.setItem("jugador2",nombre2);
            window.sessionStorage.setItem("ganadas1",0);
            window.sessionStorage.setItem("ganadas2",0);
            window.sessionStorage.setItem("dificultad",dificultad);
            window.location.replace('./html/tablero.html');
        return false;
      }
  });
}
