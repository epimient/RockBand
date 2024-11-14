// Lista de pistas y sus títulos
const tracks = [
    { title: "Ghosts in the Machine", src: "audio/Ghosts in the Machine.mp3" },
    { title: "Whispers in the Dark", src: "audio/Whispers in the Dark.mp3" },
    { title: "Eternal Midnight", src: "audio/Eternal Midnight.mp3" },
  ];
  
  // Variables de elementos
  let currentTrack = 0;
  const audioPlayer = document.getElementById('audio-player');
  const trackTitle = document.getElementById('track-title');
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const playIcon = document.getElementById('play-icon');
  
  // Función para cargar una pista
  function loadTrack(trackIndex) {
    currentTrack = trackIndex;
    audioPlayer.src = tracks[currentTrack].src;
    trackTitle.textContent = tracks[currentTrack].title;
    progressBar.value = 0;
  }
  
  // Reproducir o pausar la pista
  playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playIcon.src = "img/stop.svg"; // Cambia el icono a stop
    } else {
      audioPlayer.pause();
      playIcon.src = "img/play.svg"; // Cambia el icono a play
    }
  });
  
  // Función para ir a la pista anterior
  prevBtn.addEventListener('click', () => {
    if (currentTrack > 0) {
      loadTrack(currentTrack - 1);
      audioPlayer.play();
      playIcon.src = "imagenes/stop.svg";
    }
  });
  
  // Función para ir a la siguiente pista
  nextBtn.addEventListener('click', () => {
    if (currentTrack < tracks.length - 1) {
      loadTrack(currentTrack + 1);
      audioPlayer.play();
      playIcon.src = "imagenes/stop.svg";
    }
  });
  
  // Actualizar la barra de progreso mientras la pista se reproduce
  audioPlayer.addEventListener('timeupdate', () => {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  });
  
  // Permitir al usuario avanzar o retroceder en la pista usando la barra de progreso
  progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
  });
  
  // Cargar la primera pista al iniciar
  loadTrack(currentTrack);
  