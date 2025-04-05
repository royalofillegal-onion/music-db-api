import { getCurrentUser } from './auth.js';

class AudioPlayer {
  constructor() {
    this.audio = new Audio();
    this.currentPlaylist = null;
    this.currentIndex = 0;
    this.isPlaying = false;
    this.volume = 1;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.audio.addEventListener('ended', () => this.playNext());
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
  }

  async playPlaylist(playlist, startIndex = 0) {
    this.currentPlaylist = playlist;
    this.currentIndex = startIndex;
    await this.playCurrentSong();
  }

  async playCurrentSong() {
    if (!this.currentPlaylist || !this.currentPlaylist[this.currentIndex]) return;

    const song = this.currentPlaylist[this.currentIndex];
    this.audio.src = song.audio_url;
    this.audio.volume = this.volume;
    
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.logPlay(song.id);
      this.updateUI();
    } catch (error) {
      console.error('Error playing song:', error);
    }
  }

  async playNext() {
    if (!this.currentPlaylist) return;
    
    this.currentIndex = (this.currentIndex + 1) % this.currentPlaylist.length;
    await this.playCurrentSong();
  }

  async playPrevious() {
    if (!this.currentPlaylist) return;
    
    this.currentIndex = (this.currentIndex - 1 + this.currentPlaylist.length) % this.currentPlaylist.length;
    await this.playCurrentSong();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
    this.updateUI();
  }

  setVolume(volume) {
    this.volume = volume;
    this.audio.volume = volume;
  }

  seek(time) {
    this.audio.currentTime = time;
  }

  updateProgress() {
    const progress = (this.audio.currentTime / this.audio.duration) * 100;
    // Update progress bar in UI
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  updateDuration() {
    // Update duration display in UI
    const durationDisplay = document.getElementById('duration');
    if (durationDisplay) {
      durationDisplay.textContent = this.formatTime(this.audio.duration);
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  updateUI() {
    // Update play/pause button
    const playButton = document.getElementById('play-button');
    if (playButton) {
      playButton.textContent = this.isPlaying ? '⏸️' : '▶️';
    }

    // Update current song info
    if (this.currentPlaylist && this.currentPlaylist[this.currentIndex]) {
      const song = this.currentPlaylist[this.currentIndex];
      const titleElement = document.getElementById('current-song-title');
      const artistElement = document.getElementById('current-song-artist');
      const coverElement = document.getElementById('current-song-cover');

      if (titleElement) titleElement.textContent = song.title;
      if (artistElement) artistElement.textContent = song.artist;
      if (coverElement) coverElement.src = song.cover_url;
    }
  }

  async logPlay(songId) {
    const user = getCurrentUser();
    if (!user) return;

    try {
      await supabase
        .from('recently_played')
        .insert([
          {
            user_id: user.id,
            playlist_id: songId
          }
        ]);
    } catch (error) {
      console.error('Error logging play:', error);
    }
  }
}

// Create a singleton instance
const player = new AudioPlayer();

export default player; 
