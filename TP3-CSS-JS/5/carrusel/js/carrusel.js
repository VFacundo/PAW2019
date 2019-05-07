var window = window || {},
  document = document || {},
  console = console || {},
  Carrusel = Carrusel || {};

Carrusel.container = "slide",
Carrusel.estadoElemento,
Carrusel.imgActiva,
Carrusel.cantImgCargadas,
Carrusel.cantImg = Carrusel.imagenes.length;
Carrusel.timeOut = 4000;
Carrusel.estadoSlide = "auto",
Carrusel.idIntervalo;

document.addEventListener("DOMContentLoaded", function(event) {
  Carrusel.init("slide");
});

Carrusel.init = function (contenedor) {
  var btnNext,btnBack;
  Carrusel.container = document.getElementById(contenedor);
  ///////////////////////EVENT NEXT//////////////////////
  btnNext = document.getElementById("next");
  btnBack = document.getElementById("back");
  window.addEventListener("keydown",function(e){
    if(e.keyCode == 39){
      btnNext.click();
    }
    if(e.keyCode == 37){
      btnBack.click();
    }
  });
  btnNext.addEventListener("click",function(){
    var ul = document.getElementById("contenedorImg");
    ul.children[Carrusel.imgActiva].classList.remove("activa");
    Carrusel.imgActiva++;
    if(Carrusel.imgActiva < Carrusel.cantImg-1){
      ul.children[Carrusel.imgActiva].classList.add("activa");
    }else {
      Carrusel.imgActiva = 0;
      ul.children[Carrusel.imgActiva].classList.add("activa");
    }
    Carrusel.resetIntervalo();
  });///////////////////////EVENT NEXT//////////////////////
  /////////////////////EVENT BACK//////////////////////
    btnBack.addEventListener("click",function(){
    var ul = document.getElementById("contenedorImg")
    ul.children[Carrusel.imgActiva].classList.remove("activa");
    Carrusel.imgActiva--;
    if(Carrusel.imgActiva > 0){
      ul.children[Carrusel.imgActiva].classList.add("activa");
    }else {
      Carrusel.imgActiva = Carrusel.cantImg-1;
      ul.children[Carrusel.imgActiva].classList.add("activa");
    }
    Carrusel.resetIntervalo();
  });/////////////////////EVENT BACK//////////////////////
  Carrusel.crearEstructura();
  Carrusel.estadoElemento = document.querySelector('#estado').children[0];
  Carrusel.cargar();
  Carrusel.iniciarMov();
}

Carrusel.reinit = function (){
  div = document.getElementById("slide");
  body = document.getElementsByTagName("body")[0];
  div.remove();
  div = document.createElement("div");
  div.setAttribute("id","slide");
  body.appendChild(div);
  Carrusel.init("slide");
  Carrusel.estadoSlide == "parado";
}

Carrusel.resetIntervalo = function(){
  clearInterval(Carrusel.idIntervalo);//Detengo el Intervalo
  Carrusel.idIntervalo = setInterval(Carrusel.Slide,Carrusel.timeOut);//Lo inicio "Reiniciado"
}

Carrusel.iniciarMov = function(){
  Carrusel.idIntervalo = setInterval(Carrusel.Slide,Carrusel.timeOut);
}

Carrusel.Slide = function(){
  var ul = document.getElementById("contenedorImg"),reInterval;
    if(Carrusel.estadoSlide != "auto"){
      clearInterval(Carrusel.idIntervalo);
      f = new Date();
      console.log(f.getSeconds());
    }
    if(Carrusel.imgActiva < Carrusel.cantImg-1){
      ul.children[Carrusel.imgActiva].classList.remove("activa");
      Carrusel.imgActiva++;
      ul.children[Carrusel.imgActiva].classList.add("activa");
    }else{
      ul.children[Carrusel.imgActiva].classList.remove("activa");
      Carrusel.imgActiva = 0;
      ul.children[Carrusel.imgActiva].classList.add("activa");
    }
    f = new Date();
    console.log(f.getSeconds());
}

Carrusel.crearEstructura = function(){
  var divImgContainer = document.createElement("div"),
      divEstado = document.createElement("div"),
      span = document.createElement("span");

  divImgContainer.setAttribute("id","contenedor");
  divEstado.setAttribute("id","estado");
    divEstado.appendChild(span);
  Carrusel.container.appendChild(divImgContainer);
  Carrusel.container.appendChild(divEstado);
}

Carrusel.cambiarRepresentacion = function(){
  var select = document.getElementById("representacion"), div, body;
  for ( var i = 0, len = select.options.length; i < len; i++ ) {
    opt = select.options[i];
    if ( opt.selected === true ) {
        if(opt.value == "numeros"){
          Carrusel.representacion = 0;
        }
        if(opt.value == "letras"){
          Carrusel.representacion = 1;
        }
        if(opt.value == "dibujos"){
          Carrusel.representacion = 2;
        }
        break;
    }
  }
  Carrusel.reinit();
}

Carrusel.loadingImg = function () {
}

Carrusel.cargar = function() {
  var fragment;
  Carrusel.cantImgCargadas = 0;
  Carrusel.loadingElement;
  fragment = Carrusel.cargarContenedorImg();
  Carrusel.container.insertBefore( fragment, Carrusel.container.firstChild );
  document.getElementById("contenedorImg").children[0].classList.add("activa");
  Carrusel.imgActiva = 0;
};

Carrusel.cargarContenedorImg = function() {
  var fragment = document.createDocumentFragment(),
      ul = document.createElement("ul"),item,
      spanDot,
      contentDot = document.getElementById("contentDot");

  ul.setAttribute("id","contenedorImg");
  for ( var i = 0; i < Carrusel.cantImg; i++ ) {
    item = Carrusel.cargarImg(i);
    ul.appendChild(item);
    spanDot = document.createElement("span");
    spanDot.classList.add("dot");
    spanDot.innerText = i;//Borrar Esto
    spanDot.dataset.nroImg = i;
    spanDot.addEventListener("click",Carrusel.pasarImgDot);
    contentDot.appendChild(spanDot);
  }
  fragment.appendChild(ul);
  return fragment;
}

Carrusel.pasarImgDot = function(){
  var span = event.target, ul = document.getElementById("contenedorImg");
  ul.children[Carrusel.imgActiva].classList.remove("activa");
  Carrusel.imgActiva = span.dataset.nroImg;
  ul.children[Carrusel.imgActiva].classList.add("activa");
  Carrusel.resetIntervalo();
}
// return an <li> with a <img> in it
Carrusel.cargarImg = function(i) {
  var item = document.createElement('li'),
      img = document.createElement('img');

  img.onload = function (){
    Carrusel.cantImgCargadas ++;
    Carrusel.estadoElemento.innerHTML = "Cargando "+Carrusel.cantImgCargadas+"/"+Carrusel.cantImg;
    if(Carrusel.cantImgCargadas == Carrusel.cantImg){
      Carrusel.estadoElemento.parentElement.remove();
    }
  };
  img.src = Carrusel.imagenes[i]["src"];
  item.appendChild(img);
  return item;
}
