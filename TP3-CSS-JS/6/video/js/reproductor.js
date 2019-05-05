var document = document || {},
    console = console || {},
    window = window || {},
    Reproductor = Reproductor || {};

Reproductor.iniciar = function(){
  var videos = ["http://thenewcode.com/assets/videos/dev-tools-roundabout.mp4",
            "http://thenewcode.com/assets/videos/estee.mp4",
             "http://thenewcode.com/assets/videos/editable.mp4",
           "http://thenewcode.com/assets/videos/fashion.mp4",
         "http://thenewcode.com/assets/videos/backflip.mp4"];
  window.addEventListener("DOMContentLoaded", function(){
     var reproductor = document.getElementById("reproductor"),videoActual = 0,
          titulo = document.getElementById("titulo");
    document.getElementById("play").addEventListener("click",function(){
      reproductor.paused ? reproductor.play() : reproductor.pause();
    });
    document.getElementById("next").addEventListener("click",function(){
      videoActual++;
      if(videoActual>=videos.length){
        videoActual = 0;
      }
      reproductor.src = videos[videoActual];
      reproductor.play;
      titulo.innerText = Reproductor.getNombre(videos[videoActual]);
    });
    document.getElementById("back").addEventListener("click",function(){
      if(videoActual-1<0){
        videoActual = videos.length-1;
      }else{
        videoActual--;
      }
      reproductor.src = videos[videoActual];
      reproductor.play;
      titulo.innerText = Reproductor.getNombre(videos[videoActual]);
    });
    reproductor.src = videos[0];
    titulo.innerText = Reproductor.getNombre(videos[0]);
    reproductor.play;
    reproductor.addEventListener("ended",function(){//bucle de reproduccion
      videoActual = videos.indexOf(reproductor.src);
      if(videoActual<=videos.length-2){
        videoActual++;
      }else{
        videoActual=0;
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
