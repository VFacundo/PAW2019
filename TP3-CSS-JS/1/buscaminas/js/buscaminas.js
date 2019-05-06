var window = window || {},
  document = document || {},
  console = console || {},
  Juego = Juego || {};

Juego.contenedor;
Juego.nivelActual = 1;
Juego.mapaBombas = [];
Juego.state;

Juego.init = function (contenedor) {
  Juego.mapaBombas = [];
  Juego.state = "initialized";
  Juego.contenedor = contenedor;
  if (typeof Juego.contenedor === "string") {
    Juego.contenedor = document.getElementById(Juego.contenedor);
    Juego.contenedor.style.setProperty('--nivel', Juego.niveles[Juego.nivelActual].ancho*2+2+"em" );
    Juego.crearMapaMinado(Juego.contenedor);
  }
}

Juego.cambiarDificultad = function(){
  var select = document.getElementById("dificultad"), div, body;
  for ( var i = 0, len = select.options.length; i < len; i++ ) {
    opt = select.options[i];
    if ( opt.selected === true ) {
        if(opt.value == "facil"){
          Juego.nivelActual = 0;
        }
        if(opt.value == "media"){
          Juego.nivelActual = 1;
        }
        if(opt.value == "dificil"){
          Juego.nivelActual = 2;
        }
        break;
    }
  }
  div = document.getElementById("canvas");
  body = document.getElementsByTagName("body")[0];

  div.remove();
  div = document.createElement("div");
  div.setAttribute("id","canvas");
  body.appendChild(div);

  Juego.init("canvas");
}

Juego.crearMapaMinado = function (contenedor) {
  var ancho = Juego.niveles[Juego.nivelActual].ancho,
    alto = Juego.niveles[Juego.nivelActual].alto,
    casilla;
  for (var i = 0; i < alto; i++) {
    for (var j = 0; j < ancho; j++) {
      casilla = document.createElement("div");
      casilla.classList.add("casilla");
      casilla.setAttribute("data-y", i);
      casilla.setAttribute("data-x", j);
      casilla.addEventListener("click", function(){
        var casilla = event.target,
        descubierta = casilla.querySelector(".descubierta");
        if (!descubierta) {
          Juego.checkCasillero(casilla);
        }
      });
      contenedor.appendChild(casilla);
    }
  }
  for (var cant=1;cant<=Juego.niveles[Juego.nivelActual].cantidadBombas;cant++){
    var i = Math.floor(Math.random() * Juego.niveles[Juego.nivelActual].ancho),
        j = Math.floor(Math.random() * Juego.niveles[Juego.nivelActual].alto);
    Juego.agregarBomba(i,j);
  } 
};

Juego.agregarBomba = function(x,y){
  Juego.mapaBombas[Juego.mapaBombas.length] = [x,y];
};



Juego.checkCasillero = function(casilla){
  var dataX = casilla.getAttribute("data-x"),
  dataY = casilla.getAttribute("data-y"),
  bomba, vecinos, vecinoX, vecinoY,bombasCerca,casilleros;
  if(Juego.isBomba(dataX,dataY)){
      Juego.state = "finished";
      alert("Perdiste!");
      casilla.classList.add("descubierta");
      casilla.classList.add("bomba");
  }else{
    if(Juego.state != "finished"){
      if(Juego.bombasCerca(casilla)>0){
        casilla.classList.add("descubierta");
      }else{
        Juego.descubrirVacios(dataX,dataY);
      }
    }
  }
  var cantidadCasillas = Number(document.getElementsByClassName("casilla").length);
  var cantidadBombas = Number(Juego.niveles[Juego.nivelActual].cantidadBombas);
  if(cantidadCasillas - cantidadBombas == document.getElementsByClassName("descubierta").length){
    Juego.state = "ganaste";
  }
  if (Juego.state == "ganaste"){
    alert("Ganaste!");
  }
};


Juego.descubrirVacios = function(x,y){
  var dataX,dataY,
      casilla = Juego.getCasilla(x,y),
      cantidadBombas, termino = false;
  dataX = casilla.getAttribute("data-x");
  dataY = casilla.getAttribute("data-y");

  //recorrido inverso hacia arriba e izquierda
  while(!termino){
    //voy para arriba
    while(y>=0){

      //voy para la izquierda
      while(x>=0){
        if(Juego.bombasCerca(Juego.getCasilla(x,y)) > 0){
           x = -1;
        }
        x--;
      }
      x = dataX;

      //voy para la derecha
      while(x < Juego.niveles[Juego.nivelActual].ancho){
        if(Juego.bombasCerca(Juego.getCasilla(x,y)) > 0){
           x = 1000;
        }
        x++;
      }
      x = dataX;

      y--;
      if(y >= 0){
        if(Juego.bombasCerca(Juego.getCasilla(x,y)) > 0){
           y = -1;
        }
      }
     }

    //voy para abajo
    x = dataX;
    y = dataY; 
    while(y < Juego.niveles[Juego.nivelActual].alto){
      
      //voy para la izquierda
      while(x>=0){
        if(x<0){
          if(Juego.bombasCerca(Juego.getCasilla(x,y)) > 0){
             x = -1;
          }
        }
        x--;
      }
      x = dataX;

      //voy para la derecha
      while(x<Juego.niveles[Juego.nivelActual].ancho){
        if(x>Juego.niveles[Juego.nivelActual].ancho && y>Juego.niveles[Juego.nivelActual].alto){
          if(Juego.bombasCerca(Juego.getCasilla(x,y)) > 0){
             x = Number(Juego.niveles[Juego.nivelActual].ancho) +1;
          }
        }
        x++;
      }
      x = dataX;
      y++;

      if(y > Juego.niveles[Juego.nivelActual].alto && x > Juego.niveles[Juego.nivelActual].ancho){
        termino = true;
      }else{
        if(y < Juego.niveles[Juego.nivelActual].alto && x < Juego.niveles[Juego.nivelActual].ancho){
          if(Juego.bombasCerca(Juego.getCasilla(x,y)) > 0){
             x = Number(Juego.niveles[Juego.nivelActual].ancho) +1;
             termino = true;
          }
        }
      }
    }
    termino =true;
  }
}
 

Juego.getCasilla = function(x,y){
  var dataX,dataY, casilleros = document.getElementsByClassName("casilla");

  for(var i = 0;casilleros.length > i; i++){
    dataX = casilleros[i].getAttribute("data-x");
    dataY = casilleros[i].getAttribute("data-y");
    if(dataX == x && dataY == y)
      return casilleros[i];
  }
}

Juego.bombasCerca = function(casilla){
  var bombasCerca = 0;
  vecinos = Juego.getVecinos(casilla);
  vecinos.forEach(e =>{
      var dataX = e.getAttribute("data-x"),
          dataY = e.getAttribute("data-y");
      if(Juego.isBomba(dataX,dataY)){
        bombasCerca++;
      }
  });
  if(!casilla.classList.contains("descubierta") && !Juego.isBombaObj(casilla)){
    if(bombasCerca == 0)
      casilla.classList.add("descubierta");

    if(bombasCerca == 1){
      casilla.classList.add("cercania1");
      casilla.classList.add("descubierta");
    }
    if(bombasCerca == 2){
      casilla.classList.add("cercania2");
      casilla.classList.add("descubierta");
    }
    if(bombasCerca == 3){
      casilla.classList.add("cercania3");
      casilla.classList.add("descubierta");
    }
    if(bombasCerca == 4){
      casilla.classList.add("cercania4");
      casilla.classList.add("descubierta");
    }
  }
  return bombasCerca;
}

Juego.getVecinos = function(casilla){
  var vecinos = [],
  dataX = casilla.getAttribute("data-x"),
  dataY = casilla.getAttribute("data-y"),
  allCasillas = document.getElementsByClassName("casilla"),
  dataXmin = Number(dataX)-2,
  dataXmax =  Number(dataX)+2,
  dataYmin =  Number(dataY)-2,
  dataYmax =  Number(dataY)+2,
  altX, altY, toErase;

  for (var i = 0; allCasillas.length > i; i++){
    altX = allCasillas[i].getAttribute("data-x");
    altY = allCasillas[i].getAttribute("data-y");
    if (altX > dataXmin && altY > dataYmin){
      if(altX < dataXmax && altY < dataYmax){
        if(altX == dataX && altY == dataY){
        }else{
          vecinos.push(allCasillas[i]);
        }
      }
    }
  }
  return vecinos;
}


Juego.isBomba = function(x,y){
  var bomba = false;
    Juego.mapaBombas.forEach(element => {
    if(element[0] == x && element[1] == y){
      bomba = true;
    }
  });
  return bomba;
}

Juego.isBombaObj = function(casilla){
  var bomba = false,
  dataX = casilla.getAttribute("data-x"),
  dataY = casilla.getAttribute("data-y");
    Juego.mapaBombas.forEach(element => {
    if(element[0] == dataX && element[1] == dataY){
      bomba = true;
    }
  });
  return bomba;
}