var window = window || {},
  document = document || {},
  console = console || {},
  Juego = Juego || {};


Juego.contenedor;
Juego.representacion = 0;
Juego.state = "";
Juego.mapLetras = new Map();
Juego.allLetras = {
  "letra" : String,
  "numero": Number,
  "img"   : String
}
Juego.fraseActual;

Juego.init = function (contenedor) {
  Juego.state = "initialized";
  Juego.contenedor = contenedor;
  Juego.fraseActual = Juego.frases[Math.floor(Math.random() * Number(Juego.frases.length))];
  document.addEventListener("DOMContentLoaded", function(event) {
    if (typeof Juego.contenedor === "string") {
      Juego.contenedor = document.getElementById(Juego.contenedor);
      Juego.crearEstructura();
    }
  });
}

Juego.reinit = function (){
  div = document.getElementById("canvas");
  body = document.getElementsByTagName("body")[0];
  div.remove();
  div = document.createElement("div");
  div.setAttribute("id","canvas");
  body.appendChild(div);
  Juego.init("canvas");
  Juego.contenedor = document.getElementById(Juego.contenedor);
  Juego.crearEstructura();
}

Juego.crearEstructura = function(){
  var tablaLetras = document.createElement("table"),
      trLetras = document.createElement("tr"),
      trCripto = document.createElement("tr"),
      divFrase,
      th, td, claves = [], rnd, j = 0, span,
      termino = false;
  Juego.mapLetras = new Map();
  //TABLE
  //Genero ABC HTML
  for (var i = 65; i < 91; i++) {
    th = document.createElement("th");
    th.innerHTML = String.fromCharCode(i);
    trLetras.appendChild(th);
  }
  tablaLetras.appendChild(trLetras);
  //Genero mapa letras
  while(!termino){
    rnd = Math.floor(Math.random() * 28);
    if(!claves.includes(rnd, 0)){
      claves[j] = rnd;
      Juego.allLetras = new Object();
      Juego.allLetras["letra"] = String.fromCharCode(Number(rnd)+97);
      Juego.allLetras["numero"] = rnd;
      Juego.allLetras["img"] = "por ahora ninguna";
      Juego.mapLetras.set(String.fromCharCode(j+65),Juego.allLetras);
      td = document.createElement("td");
      if(Juego.fraseActual["frase"].toUpperCase().includes(String.fromCharCode(Number(j)+65))){
        td.setAttribute("contenteditable","true");
        td.addEventListener("DOMCharacterDataModified",function(event){
          var value, td = event.target, pos;
          value = Number(td.parentElement.innerHTML); 
          if(td.length > 2 || isNaN(value)){
            td.parentElement.innerHTML = " ";
          }else{
            pos = td.parentElement.getAttribute("pos");
            key = Juego.mapLetras.get(value);
            if(String.fromCharCode(Number(pos)+65) == key){
              Juego.blockAll(key);
            } 
          }
        });
      }else{
        if(Juego.representacion == 0){
          td.innerHTML = Juego.mapLetras.get(String.fromCharCode(j+65))["numero"];
        }
        if(Juego.representacion == 1){
          td.innerHTML = Juego.mapLetras.get(String.fromCharCode(j+65))["letra"];
        }
        if(Juego.representacion == 2){
          td.innerHTML = Juego.mapLetras.get(String.fromCharCode(j+65))["img"];
        }
      }
      td.setAttribute("pos",j);
      trCripto.appendChild(td);      
      j++;
    }
    if(claves.length>25 || j>25){
      termino = true;
    }
  }
  tablaLetras.appendChild(trCripto);
  Juego.contenedor.appendChild(tablaLetras);

  //DIV FRASE
  divFrase = document.createElement("div")
  divFrase.setAttribute("id","frase");
  for(var i = 0;String(Juego.fraseActual["frase"]).length>i;i++){
    div = document.createElement("div");
    spanOculto = document.createElement("span");
    spanCripto = document.createElement("span");
    spanOculto.setAttribute("contenteditable","true");
    spanOculto.addEventListener("DOMCharacterDataModified",function(event){
      var pos, span = event.target, input;
      pos = span.parentElement.getAttribute("pos");
      number = Juego.mapLetras.get(Number(pos));
      if(span.length > 1 ){
        span.parentElement.innerHTML = " ";
      }
      input = span.textContent.substr(0,1).toUpperCase();
      key = Juego.mapLetras.get(input);
      if(input == String(Juego.fraseActual["frase"]).substr(pos,1).toUpperCase()){
        Juego.blockAll(input);
      }
    });
    if(Juego.fraseActual["frase"].substr(i,1) === ' '){
      spanOculto.classList.add("espacio");
    }else{
      spanOculto.classList.add("spanOculto");
      spanOculto.setAttribute("pos",i);
      if(Juego.representacion == 0){        
        spanCripto.innerHTML = Juego.mapLetras.get(Juego.fraseActual["frase"].substr(i,1).toUpperCase())["numero"];
      }
      if(Juego.representacion == 1){
        spanCripto.innerHTML = Juego.mapLetras.get(Juego.fraseActual["frase"].substr(i,1).toUpperCase())["letra"];
      }
      if(Juego.representacion == 2){
        spanCripto.innerHTML = Juego.mapLetras.get(Juego.fraseActual["frase"].substr(i,1).toUpperCase())["img"];
      }
    }
    div.appendChild(spanOculto);
    div.appendChild(spanCripto);
    divFrase.appendChild(div);
  }
  Juego.contenedor.appendChild(divFrase);
}

Juego.blockAll = function(input){
  var allSpan = document.getElementsByClassName("spanOculto"),
      allTd = document.getElementsByTagName("td"),
      posTabla, tdVacios = 0;
  for(var i = 0; allSpan.length > i ;i++){
    pos = allSpan[i].getAttribute("pos");
    if(Juego.fraseActual["frase"].substr(pos,1).toUpperCase() == input){
      allSpan[i].innerText = input;
      allSpan[i].setAttribute("contenteditable","false");
      allSpan[i].classList.add("spanLock");
      allSpan[i].classList.remove("spanOculto");

      posTabla = input.charCodeAt(input);
      if(Juego.representacion == 0){        
        allTd[Number(posTabla)-65].innerHTML = Juego.mapLetras.get(String.fromCharCode(posTabla))["numero"];
      }
      if(Juego.representacion == 1){
        allTd[Number(posTabla)-65].innerHTML =  Juego.mapLetras.get(String.fromCharCode(posTabla))["letra"];
      }
      if(Juego.representacion == 2){
        allTd[Number(posTabla)-65].innerHTML =  Juego.mapLetras.get(String.fromCharCode(posTabla))["img"];
      }
      allTd[Number(posTabla)-65].setAttribute("contenteditable","false");
      allTd[Number(posTabla)-65].classList.add("encontrado");
      i--;
    }
  }
  for(var i = 0; allTd.length > i ;i++){
    if(allTd[i].innerHTML.length <1){
      tdVacios ++;
    }
  }
  if(tdVacios == 0){
    Juego.state = "ganado";
    alert("Ganaste!")
    btn = document.createElement("button");
    btn.innerText = "Jugar otra vez";
    btn.setAttribute("onclick","Juego.reinit()");
    document.getElementById("canvas").appendChild(btn);
  }
}

Juego.cambiarRepresentacion = function(){
  var select = document.getElementById("representacion"), div, body;
  for ( var i = 0, len = select.options.length; i < len; i++ ) {
    opt = select.options[i];
    if ( opt.selected === true ) {
        if(opt.value == "numeros"){
          Juego.representacion = 0;
        }
        if(opt.value == "letras"){
          Juego.representacion = 1;
        }
        if(opt.value == "dibujos"){
          Juego.representacion = 2;
        }
        break;
    }
  }
  Juego.reinit();
}
