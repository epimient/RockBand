// Lista de canciones con artista y álbum
const songs = [
  { name: "Ghosts in the Machine", src: "audio/Ghosts in the Machine.mp3", artist: "Nightfall Asylum", album: "Haunted Whispers", duration: "3:45" },
  { name: "Whispers in the Dark", src: "audio/Whispers in the Dark.mp3", artist: "Nightfall Asylum", album: "Haunted Whispers", duration: "4:10" },
  { name: "Eternal Midnight", src: "audio/Eternal Midnight.mp3", artist: "Nightfall Asylum", album: "Haunted Whispers", duration: "5:02" }
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const songInfo = document.getElementById('song-info');
const progressBar = document.getElementById('progress-bar');
let isDragging = false;
const body = document.body; // Para aplicar el cambio de cursor en el cuerpo de la página

// Función para activar el cursor personalizado temporalmente
function activateCustomCursor() {
  body.classList.add('custom-cursor');
  setTimeout(() => {
    body.classList.remove('custom-cursor');
  }, 1000); // Cambia el cursor por 1 segundo
}

// Función para cargar canción
function loadSong(index) {
  audioPlayer.src = songs[index].src;
  songInfo.textContent = `Nombre: ${songs[index].name} | Artista: ${songs[index].artist} | Álbum: ${songs[index].album}`;
  currentSongIndex = index;
  audioPlayer.load();
}

// Función para reproducir canción
function playSong() {
  audioPlayer.play();
  playButton.style.display = 'none';
  pauseButton.style.display = 'inline';
}

// Función para pausar canción
function pauseSong() {
  audioPlayer.pause();
  playButton.style.display = 'inline';
  pauseButton.style.display = 'none';
}

// Función para la siguiente canción
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
  activateCustomCursor(); // Activa el cursor personalizado al cambiar la canción
}

// Función para la canción anterior
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
  activateCustomCursor(); // Activa el cursor personalizado al cambiar la canción
}

// Seleccionar canción desde la lista
function selectSong(index) {
  loadSong(index);
  playSong();
}

// Función para actualizar la barra de progreso en tiempo real
audioPlayer.addEventListener('timeupdate', () => {
  if (!isDragging) {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progressPercent;
  }
});

// Función para permitir hacer clic en la barra de progreso para cambiar el tiempo
progressBar.addEventListener('input', (e) => {
  isDragging = true;
  const seekTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

progressBar.addEventListener('change', () => {
  isDragging = false;
});

// Event listeners
playButton.addEventListener('click', playSong);
pauseButton.addEventListener('click', pauseSong);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

// Cargar y reproducir la primera canción al iniciar
loadSong(currentSongIndex);
playSong();
