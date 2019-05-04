var document = document || {},
    console = console || {},
    window = window || {},
    Cargar = Cargar || {};

Cargar.cargarEst = function(){
  window.addEventListener("DOMContentLoaded", function(){
      form = document.getElementById("form").onsubmit = function(){
        var estructuraJson = document.getElementById("estructura").value;
            window.sessionStorage.setItem("estructura",estructuraJson);
            //window.location.replace('./html/tablero.html');
            console.log(window.sessionStorage.getItem("estructura"));
        return false;
      }
  });
}
