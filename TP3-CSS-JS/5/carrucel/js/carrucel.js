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
  document.getElementById("next").addEventListener("click",function(){
    var ul = document.getElementById("contenedorImg")
    ul.children[Carrucel.imgActiva].classList.remove("activa");
    Carrucel.imgActiva++;
    if(Carrucel.imgActiva < Carrucel.cantImg-1){
      ul.children[Carrucel.imgActiva].classList.add("activa");
    }else {
      Carrucel.imgActiva = 0;
      ul.children[Carrucel.imgActiva].classList.add("activa");
    }
  });
  document.getElementById("back").addEventListener("click",function(event){
    var ul = document.getElementById("contenedorImg")
    ul.children[Carrucel.imgActiva].classList.remove("activa");
    Carrucel.imgActiva--;
    if(Carrucel.imgActiva > 0){
      ul.children[Carrucel.imgActiva].classList.add("activa");
    }else {
      Carrucel.imgActiva = Carrucel.cantImg-1;
      ul.children[Carrucel.imgActiva].classList.add("activa");
    }
  });
  Carrucel.crearEstructura();
  Carrucel.estadoElemento = document.querySelector('#estado').children[0];
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
    if(Carrucel.imgActiva < Carrucel.cantImg-1){
      ul.children[Carrucel.imgActiva].classList.remove("activa");
      Carrucel.imgActiva++;
      ul.children[Carrucel.imgActiva].classList.add("activa");
    }else{
      ul.children[Carrucel.imgActiva].classList.remove("activa");
      Carrucel.imgActiva = 0;
      ul.children[Carrucel.imgActiva].classList.add("activa");
    }
    if(Carrucel.estadoSlide != "auto"){
      clearInterval(interval)
    }
  }, Carrucel.timeOut);
}


Carrucel.crearEstructura = function(){
  var divImgContainer = document.createElement("div"),
      divEstado = document.createElement("div"),
      span = document.createElement("span");

  divImgContainer.setAttribute("id","contenedor");
  divEstado.setAttribute("id","estado");
    divEstado.appendChild(span);
  Carrucel.container.appendChild(divImgContainer);
  Carrucel.container.appendChild(divEstado);
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
      ul = document.createElement("ul"),item,
      spanDot,
      contentDot = document.getElementById("contentDot");

  ul.setAttribute("id","contenedorImg");
  for ( var i = 0; i < Carrucel.cantImg; i++ ) {
    item = Carrucel.cargarImg(i);
    ul.appendChild(item);
    spanDot = document.createElement("span");
    spanDot.classList.add("dot");
    spanDot.innerText = i;//Borrar Esto
    spanDot.dataset.nroImg = i;
    spanDot.addEventListener("click",Carrucel.pasarImgDot);
    contentDot.appendChild(spanDot);
  }
  fragment.appendChild(ul);
  return fragment;
}

Carrucel.pasarImgDot = function(){
  var span = event.target, ul = document.getElementById("contenedorImg");
  ul.children[Carrucel.imgActiva].classList.remove("activa");
  Carrucel.imgActiva = span.dataset.nroImg;
  ul.children[Carrucel.imgActiva].classList.add("activa");
}
// return an <li> with a <img> in it
Carrucel.cargarImg = function(i) {
  var item = document.createElement('li'),
      img = document.createElement('img');

  img.onload = function (){
    Carrucel.cantImgCargadas ++;
    Carrucel.estadoElemento.innerHTML = "Cargando "+Carrucel.cantImgCargadas+"/"+Carrucel.cantImg;
    if(Carrucel.cantImgCargadas == Carrucel.cantImg){
      Carrucel.estadoElemento.parentElement.remove();
    }
  };
  img.src = Carrucel.imagenes[i]["src"];
  item.appendChild( img );
  return item;
}
