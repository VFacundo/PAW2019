var window = window || {},
  document = document || {},
  console = console || {},
  Carrusel = Carrusel || {};

Carrusel.container = "slide",
Carrusel.estadoElemento,
Carrusel.imgActiva,
Carrusel.cantImgCargadas,
Carrusel.cantImg = Carrusel.imagenes.length;
Carrusel.timeOut = 30000;
Carrusel.animationTime = "1.5s";
Carrusel.estadoSlide = "auto";

document.addEventListener("DOMContentLoaded", function(event) {
  Carrusel.init("slide");
});

Carrusel.init = function (contenedor) {
  var btnNext,btnBack;
  Carrusel.container = document.getElementById(contenedor);
  Carrusel.container.style.setProperty("--animation-time",Carrusel.animationTime);
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
    Carrusel.setActivo("adelante")
  });

  /////////////////////EVENT BACK//////////////////////
  btnBack.addEventListener("click",function(){
    Carrusel.setActivo("atras")
  });

  Carrusel.crearEstructura();
  Carrusel.estadoElemento = document.querySelector('#estado').children[0];
  Carrusel.cargar();
  Carrusel.autoSlide();
  images = document.getElementsByTagName("img");
}

Carrusel.setActivo = function(direccion){
   var ul = document.getElementById("contenedorImg");
    if(document.getElementsByClassName("reset").length>0){
        document.getElementsByClassName("reset")[0].classList.remove("reset");
    }
    document.getElementsByClassName("activa")[0].classList.add("reset");
    document.getElementsByClassName("activa")[0].classList.remove("activa");
    document.getElementsByClassName("dot")[Carrusel.imgActiva].classList.remove("activeDot");
    if(direccion == "atras"){
        if(Carrusel.imgActiva == 0){
            Carrusel.imgActiva = Carrusel.cantImg-1;
        }else{
            if(Carrusel.imgActiva == Carrusel.cantImg-1){
                Carrusel.imgActiva --;
            }else{
                if(Carrusel.imgActiva>0 && Carrusel.imgActiva<Carrusel.cantImg-1){
                    Carrusel.imgActiva --;
                }                 
            }
        }
        ul.children[Carrusel.imgActiva].classList.add("activa"); 
    }
    if(direccion == "adelante"){
      if(Carrusel.imgActiva <  Carrusel.cantImg-1){
          Carrusel.imgActiva++;  
      }else{
          Carrusel.imgActiva = 0;
      }      
      ul.children[Carrusel.imgActiva].classList.add("activa");
      document.getElementsByClassName("dot")[Carrusel.imgActiva].classList.add("activeDot");
    }
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

Carrusel.autoSlide = function(){
  var ul = document.getElementById("contenedorImg"),reInterval;
  interval = setInterval(() => {
    if(Carrusel.estadoSlide != "auto"){
      clearInterval(interval)
    }else{
        Carrusel.setActivo("adelante");
    }
    
  }, Carrusel.timeOut);
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
        if(opt.value == "slideshowDer"){
          Carrusel.container.style.setProperty("--animation-time",Carrusel.animationTime);
          document.getElementById("contenedorImg").style.setProperty("--animation-type-in","right-fade-in");
          document.getElementById("contenedorImg").style.setProperty("--animation-type-out","right-fade-out");
        }
        if(opt.value == "slideShowTop"){
          console.log("top")
          Carrusel.container.style.setProperty("--animation-time",Carrusel.animationTime);
          document.getElementById("contenedorImg").style.setProperty("--animation-type-in","top-fade-in");
          document.getElementById("contenedorImg").style.setProperty("--animation-type-out","top-fade-out");
        }
        if(opt.value == "zoom"){
          Carrusel.container.style.setProperty("--animation-time",Carrusel.animationTime);
          document.getElementById("contenedorImg").style.setProperty("--animation-type-in","zoom-fade-in");
          document.getElementById("contenedorImg").style.setProperty("--animation-type-out","zoom-fade-out");
        }
        break;
    }
  }
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
  document.getElementsByClassName("dot")[Carrusel.imgActiva].classList.add("activeDot");
  Carrusel.container.style.setProperty("--animation-time",Carrusel.animationTime);
  document.getElementById("contenedorImg").style.setProperty("--animation-type-in","right-fade-in");
  document.getElementById("contenedorImg").style.setProperty("--animation-type-out","right-fade-out");
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
  ul.children[Carrusel.imgActiva+1].classList.remove("proxima");
  document.getElementsByClassName("dot")[Carrusel.imgActiva].classList.remove("activeDot");
  Carrusel.imgActiva = Number(span.dataset.nroImg);
  document.getElementsByClassName("dot")[Carrusel.imgActiva].classList.add("activeDot");
  if(Carrusel.imgActiva == Carrusel.cantImg-1){
    ul.children[0].classList.add("proxima");
  }else{
    ul.children[Carrusel.imgActiva+1].classList.add("proxima");
  }
  ul.children[Carrusel.imgActiva].classList.add("activa");
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
  item.appendChild( img );
  return item;
}
