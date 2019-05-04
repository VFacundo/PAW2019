var document = document || {},
    console = console || {},
    window = window || {},
    Reproductor = Reproductor || {};

Reproductor.iniciar = function(){
  var videos = ["http://thenewcode.com/assets/videos/dev-tools-roundabout.mp4",
            "http://thenewcode.com/assets/videos/estee.mp4",
             "http://thenewcode.com/assets/videos/editable.mp4",
           "http://thenewcode.com/assets/videos/fashion.mp4"];
  window.addEventListener("DOMContentLoaded", function(){
     var reproductor = document.getElementById("reproductor"),videoActual = 0,
          titulo = document.getElementById("titulo");
    reproductor.src = videos[0];
    titulo.innerText = Reproductor.getNombre(videos[0]);
    reproductor.play;
    reproductor.addEventListener("ended",function(){//bucle de reproduccion
      if(videoActual>=videos.length-1){
        videoActual = 0;
      }else{
        videoActual = videos.indexOf(reproductor.src);
        videoActual++;
      }
      this.src = videos[videoActual];
      this.play;
      titulo.innerText = Reproductor.getNombre(videos[videoActual]);
    });
    Reproductor.playList(videos);
  });
}

Reproductor.getNombre = function(linkVideo){
  var nombre,array;
  array = linkVideo.split("/");
  nombre = array[array.length-1];
  return nombre;
}

Reproductor.play = function(){
  var reproductor = document.getElementById("reproductor"), li = event.target,
      titulo = document.getElementById("titulo");
  reproductor.src = li.dataset.video;
  titulo.innerText = Reproductor.getNombre(li.dataset.video);
}

Reproductor.playList = function(videos){
  var list = document.getElementById("playlist"),li;

  for (var i = 0; i < videos.length; i++) {
    li = document.createElement("li");
    li.dataset.video = videos[i];
    li.innerText = Reproductor.getNombre(videos[i]);
    li.addEventListener("click",Reproductor.play);
    list.appendChild(li);
  }
}
