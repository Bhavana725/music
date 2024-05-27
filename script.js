const songs = [
    { songName: "Waiting for you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Arcade", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg" },
    { songName: "Butterfly", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg" },
    { songName: "Serendipity", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg" },
    { songName: "Butter", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg" },
    { songName: "Still With You", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg" },
    { songName: "Let Me Down Slowly", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg" },
    { songName: "Lovely", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg" },
    { songName: "On My Way", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg" },
    { songName: "Sab Tera", filePath: "songs/10.mp3", coverPath: "covers/10.jpeg" },
    { songName: "Sah Keh Raha Hai", filePath: "songs/11.mp3", coverPath: "covers/11.jpeg" },
    { songName: "Spring Day", filePath: "songs/12.mp3", coverPath: "covers/12.jpeg" },
    { songName: "Deja Vu", filePath: "songs/13.mp3", coverPath: "covers/13.jpeg" },
    { songName: "Sugar Rush Ride", filePath: "songs/14.mp3", coverPath: "covers/14.jpeg" },
];

const audio = new Audio();
const cover = document.getElementById('cover');
const songTitle = document.getElementById('song-title');
const artistAlbum = document.getElementById('artist-album');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const progress = document.getElementById('progress');
const playlist = document.querySelector('.playlist');

let currentSongIndex = 0;
function loadSong(songIndex) {
    const song = songs[songIndex];
    audio.src = song.filePath;
    cover.src = song.coverPath;
    songTitle.textContent = song.songName;
    artistAlbum.textContent = "Unknown Artist - Unknown Album";
    playSong(); // Call playSong() to automatically start playback
  }
  
  function playSong() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '&#10074;&#10074;'; // Pause icon
    }
}

function pauseSong() {
    audio.pause();
    playBtn.innerHTML = '&#9658;'; // Play icon
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong(); // Call playSong() to start playback
  }
  
  function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong(); // Call playSong() to start playback
  }
  

function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
}

function setProgress() {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

function setVolume() {
    audio.volume = volumeControl.value;
}

// Event listeners
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
progress.addEventListener('input', setProgress);
volumeControl.addEventListener('input', setVolume);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

// Populate playlist
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.songName;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playSong();
    });
    playlist.appendChild(li);
});

// Load first song
loadSong(currentSongIndex);