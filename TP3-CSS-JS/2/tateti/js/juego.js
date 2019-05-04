var document = document || {},
    console = console || {},
    window = window || {},
    Juego = Juego || {},
    dificultad,
    turno;

Juego.contenedor ="";
//dentro del namespace juego, agrego una propiedad nueva armarJuego que tiene una funcion
Juego.armarJuego = function(contenedor){
  window.addEventListener("DOMContentLoaded", function() {//DOMContentLoaded espera a que se carge el cont html
    contenedor = document.getElementById(contenedor);//objeto del navegador document
    Juego.contenedor = contenedor;
    dificultad = window.sessionStorage.getItem("dificultad");
    turno = window.sessionStorage.getItem("jugador1");
    Juego.setTurno();
    contenedor.appendChild(Juego.armarHTML());
  });
};

Juego.changeTurno = function(){
  if(turno === window.sessionStorage.getItem("jugador1")){
      turno = window.sessionStorage.getItem("jugador2");
  }else{
    turno = window.sessionStorage.getItem("jugador1");
  }
}

Juego.setTurno = function(){
  document.getElementById("turno").innerText = "Turno: "+turno;
}

Juego.armarHTML = function(){
  var arTablero = document.createElement("article");
  arTablero.classList.add("tableroTateti");
  arTablero.id = "tableroTateti"+dificultad;
  Juego.armarTablero(arTablero);
  return arTablero;
}

Juego.armarTablero = function(arTablero){
  for(var i = 0; i < dificultad; i++){
        for(var j = 0; j < dificultad; j++){
           var div = document.createElement("div");
            div.dataset.i = i;
            div.dataset.j = j;
            div.classList.add("oculto");
            div.classList.add("casilla");
            div.addEventListener("click",Juego.cambiar);
            arTablero.appendChild(div);
        }
  }
}
Juego.marcar = function(){
  var claseJugador;
  if(turno === window.sessionStorage.getItem("jugador1")){
      claseJugador = "jugador1";
  }else{
      claseJugador = "jugador2";
  }
  return claseJugador;
}

Juego.cambiar =function(event){
    var div = event.target;
    div.removeEventListener("click",Juego.cambiar);
    div.classList.add(Juego.marcar());
    div.classList.remove("oculto");
    Juego.verificarJugada();
    Juego.changeTurno();
    Juego.setTurno();
  }

  Juego.tieneLinea = function(elemJugador){
    var filaI,filaJ=0,columI=0,columJ=0,countColum=0,countFila=0,countDiag=0,countDiagI=0,inver,result;

    for (var i = 0; i < elemJugador.length; i++) {
      filaI = parseInt(elemJugador[i].dataset.i);
      columJ = parseInt(elemJugador[i].dataset.j);
      filaJ=0;columI=0;countColum=0;countFila=0;
      for (var j = 0; j < elemJugador.length; j++) {
      ////////////////////////////////////////////////////////
        if(filaI == elemJugador[j].dataset.i){//Bloqueo Fila 'i', me muevo en 'j'
          if(filaJ == elemJugador[j].dataset.j){
            filaJ++;
            countFila++;
          }
        }
        if(columJ == elemJugador[j].dataset.j){//Bloqueo Colum 'j', me muevo en 'i'
          if(columI == elemJugador[j].dataset.i){
            columI++;
            countColum++;
          }
        }
        ///////////////////////////////////////////////////////
      }
        if((elemJugador[i].dataset.i == elemJugador[i].dataset.j)){
          countDiag++;//si tengo una diagonal principal
        }
        inver = parseInt(elemJugador[i].dataset.i)+parseInt(elemJugador[i].dataset.j);//Suma diag Invertida
        if((inver)==(dificultad-1)){
          countDiagI++;
        }
    }
    if((countFila==dificultad)||(countColum==dificultad)||(countDiag==dificultad)||(countDiagI==dificultad)){
      result = true;
    }else{
      result = false;
    }
    return result;
    //console.log(countFila);
    //console.log(countColum);
  }

Juego.puntosJugador = function(jugador){
  var puntos = new Array(2),puntaje = new Array(2);
  puntaje[0] = window.sessionStorage.getItem("puntaje1");
  puntaje[1] = window.sessionStorage.getItem("puntaje2");
  if(jugador === "jugador1"){
      puntaje[0]++;
      window.sessionStorage.setItem("puntaje1",puntaje[0]);
  }
  if(jugador === "jugador2"){
    puntaje[1]++;
    window.sessionStorage.setItem("puntaje2",puntaje[1]);
  }
  puntos[0] = window.sessionStorage.getItem("jugador1")+": "+puntaje[0];
  puntos[1] = window.sessionStorage.getItem("jugador2")+": "+puntaje[1];
  return puntos;
}

Juego.verificarJugada = function(){
  var elemJugador,mensaje,puntos,
      jugador = Juego.marcar();
      elemJugador = document.getElementsByClassName(jugador);
        if(elemJugador.length>=dificultad){
          if(Juego.tieneLinea(elemJugador)){
            puntos = Juego.puntosJugador(Juego.marcar(turno));
            mensaje = "Ganaste: "+turno+"\n"+puntos[0]+"\n"+puntos[1];
              alert(mensaje);
                if(mensaje){
                  window.location.replace('../html/tablero.html');
                }
          }else{
            elemJugador = document.getElementsByClassName("oculto");
            if(elemJugador.length==0){
              mensaje = "Empataron :(";
                alert(mensaje);
                if(mensaje){
                  window.location.replace('../html/tablero.html');
                }
            }
          }
        }
}
