var window = window || {},
  document = document || {},
  console = console || {},
  Carrucel = Carrucel || {};

Carrucel.container = "slide",
Carrucel.estadoElemento,
Carrucel.imgActiva,
Carrucel.cantImgCargadas,
Carrucel.cantImg = Carrucel.imagenes.length;
Carrucel.timeOut = 4000;
Carrucel.estadoSlide = "auto";

document.addEventListener("DOMContentLoaded", function(event) {
  Carrucel.init("slide");
});

Carrucel.init = function (contenedor) {
  Carrucel.container = document.getElementById(contenedor);
  Carrucel.crearEstructura();
  Carrucel.estadoElemento = document.querySelector('#estado');
  Carrucel.cargar();   
  
  Carrucel.autoSlide();  
}

Carrucel.reinit = function (){
  div = document.getElementById("slide");
  body = document.getElementsByTagName("body")[0];
  div.remove();
  div = document.createElement("div");
  div.setAttribute("id","slide");
  body.appendChild(div);
  Carrucel.init("slide");
  Carrucel.estadoSlide == "parado";
}

Carrucel.autoSlide = function(){
  var ul = document.getElementById("contenedorImg"), interval,reInterval;
  interval = setInterval(() => {
    if(Carrucel.imgActiva < Carrucel.cantImg){
      ul.children[Carrucel.imgActiva].classList.remove("activa");
      Carrucel.imgActiva++;
      ul.children[Carrucel.imgActiva].classList.add("activa");
    }else{
      Carrucel.imgActiva = 0;
    }
    if(Carrucel.estadoSlide != "auto"){
      clearInterval(interval)
    }
  }, Carrucel.timeOut);

  setTimeout(function(){
      if(Carrucel.estadoSlide != "auto"){
        Carrucel.estadoSlide = "auto";
        Carrucel.autoSlide();
      }
    }, 3000);
  
}

Carrucel.crearEstructura = function(){
  var divImgContainer = document.createElement("div"),
      divEstado = document.createElement("div");
      progreso = document.createElement("progreso")
  divImgContainer.setAttribute("id","contenedor");
  divEstado.setAttribute("id","estado");
  progreso.setAttribute("max",Carrucel.cantImg);
  progreso.setAttribute("value",Carrucel.cantImgCargadas);
  Carrucel.container.appendChild(divImgContainer);
  Carrucel.container.appendChild(divEstado);
  Carrucel.container.appendChild(progreso);
}


Carrucel.cambiarRepresentacion = function(){
  var select = document.getElementById("representacion"), div, body;
  for ( var i = 0, len = select.options.length; i < len; i++ ) {
    opt = select.options[i];
    if ( opt.selected === true ) {
        if(opt.value == "numeros"){
          Carrucel.representacion = 0;
        }
        if(opt.value == "letras"){
          Carrucel.representacion = 1;
        }
        if(opt.value == "dibujos"){
          Carrucel.representacion = 2;
        }
        break;
    }
  }
  Carrucel.reinit();
}

Carrucel.loadingImg = function () {
}

Carrucel.cargar = function() {
  var fragment;
  Carrucel.cantImgCargadas = 0;
  Carrucel.loadingElement;
  fragment = Carrucel.cargarContenedorImg();
  Carrucel.container.insertBefore( fragment, Carrucel.container.firstChild );
  document.getElementById("contenedorImg").children[0].classList.add("activa");
  Carrucel.imgActiva = 0;
};


Carrucel.cargarContenedorImg = function() {
  var fragment = document.createDocumentFragment(),
      ul = document.createElement("ul");
  ul.setAttribute("id","contenedorImg");
  for ( var i = 0; i < Carrucel.cantImg; i++ ) {
    var item = Carrucel.cargarImg(i);
    ul.appendChild(item);
  }
  fragment.appendChild(ul);
  return fragment;
}

// return an <li> with a <img> in it
Carrucel.cargarImg = function(i) {
  var item = document.createElement('li'),
      img = document.createElement('img');
  
  img.onload = function (){
    Carrucel.cantImgCargadas ++;
    Carrucel.estadoElemento.innerHTML = "Cargando "+Carrucel.cantImgCargadas+"/"+Carrucel.cantImg;
    if(Carrucel.cantImgCargadas == Carrucel.cantImg){
      Carrucel.estadoElemento.remove();
    }
  };
  img.src = Carrucel.imagenes[i]["src"];
  item.appendChild( img );
  return item;
}
