class MusicPlayer {
            constructor() {
                this.songs = [
                    {
                        id: 1,
                        title: 'Naatu Naatu',
                        artist: 'Rahul Sipligunj, Kaala Bhairava',
                        imageUrl: 'https://i.scdn.co/image/ab67616d0000b273b28e80589e7e5c87da1f3ca4',
                        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                        duration: '3:32'
                    },
                    {
                        id: 2,
                        title: 'Tillu Anna DJ Pedithe',
                        artist: 'Ram Miriyala',
                        imageUrl: 'https://c.saavncdn.com/199/DJ-Tillu-Telugu-2022-20220123173114-500x500.jpg',
                        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                        duration: '4:15'
                    },
                    {
                        id: 3,
                        title: 'Srivalli',
                        artist: 'Sid Sriram',
                        imageUrl: 'https://c.saavncdn.com/222/Pushpa-The-Rise-Telugu-2021-20211213161522-500x500.jpg',
                        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                        duration: '3:58'
                    },
                    {
                        id: 4,
                        title: 'Oo Antava',
                        artist: 'Indravathi Chauhan',
                        imageUrl: 'https://c.saavncdn.com/222/Pushpa-The-Rise-Telugu-2021-20211213161522-500x500.jpg',
                        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
                        duration: '3:27'
                    },
                    {
                        id: 1,
                        title: 'Naatu Naatu',
                        artist: 'Rahul Sipligunj, Kaala Bhairava',
                        imageUrl: 'https://i.scdn.co/image/ab67616d0000b273b28e80589e7e5c87da1f3ca4',
                        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                        duration: '3:32'
                    },
                    {
                        id: 2,
                        title: 'Tillu Anna DJ Pedithe',
                        artist: 'Ram Miriyala',
                        imageUrl: 'https://c.saavncdn.com/199/DJ-Tillu-Telugu-2022-20220123173114-500x500.jpg',
                        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                        duration: '4:15'
                    },
                    {
                        id: 3,
                        title: 'Srivalli',
                        artist: 'Sid Sriram',
                        imageUrl: 'https://c.saavncdn.com/222/Pushpa-The-Rise-Telugu-2021-20211213161522-500x500.jpg',
                        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                        duration: '3:58'
                    },
                    {
                        id: 4,
                        title: 'Oo Antava',
                        artist: 'Indravathi Chauhan',
                        imageUrl: 'https://c.saavncdn.com/222/Pushpa-The-Rise-Telugu-2021-20211213161522-500x500.jpg',
                        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
                        duration: '3:27'
                    }
                ];
        
                this.currentSongIndex = 0;
                this.isPlaying = false;
                this.queue = [];
                this.favorites = new Set(JSON.parse(localStorage.getItem('favorites')) || []);
                this.playlists = this.loadPlaylists();
                this.initializeElements();
                this.setupEventListeners();
                this.renderSongs();
                this.loadSong(0);
            }
        
            initializeElements() {
                // Player elements
                this.audioPlayer = document.getElementById('audioPlayer');
                this.playPauseBtn = document.getElementById('playPauseBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.prevBtn = document.getElementById('prevBtn');
                this.shuffleBtn = document.getElementById('shuffleBtn');
                this.repeatBtn = document.getElementById('repeatBtn');
                this.currentSongImg = document.getElementById('currentSongImg');
                this.currentSongTitle = document.getElementById('currentSongTitle');
                this.currentSongArtist = document.getElementById('currentSongArtist');
                this.currentTimeEl = document.getElementById('currentTime');
                this.durationEl = document.getElementById('duration');
                this.progressBar = document.getElementById('progress');
                this.timeSlider = document.getElementById('timeSlider');
                this.volumeSlider = document.getElementById('volumeSlider');
        
                // UI elements
                this.searchInput = document.getElementById('searchInput');
                this.songsGrid = document.getElementById('songsGrid');
                this.playlistContainer = document.getElementById('playlistContainer');
                this.fileInput = document.getElementById('localSongInput');
                this.skipForwardBtn = document.getElementById('skipForward');
                this.skipBackwardBtn = document.getElementById('skipBackward');
                this.sidebar = document.getElementById('sidebar');
                this.toggleSidebarBtn = document.getElementById('toggleSidebar');
                this.bottomMenuToggle = document.getElementById('bottomMenuToggle');
                this.songOptionsMenu = document.getElementById('songOptionsMenu');
                this.notification = document.getElementById('notification');
                this.overlay = document.getElementById('overlay');
            }
        
            setupEventListeners() {
                // Playback controls
                this.playPauseBtn.addEventListener('click', () => this.togglePlay());
                this.nextBtn.addEventListener('click', () => this.nextSong());
                this.prevBtn.addEventListener('click', () => this.previousSong());
                this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
                this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        
                // Audio events
                this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
                this.audioPlayer.addEventListener('ended', () => this.handleSongEnd());
                this.audioPlayer.addEventListener('loadedmetadata', () => {
                    this.durationEl.textContent = this.formatTime(this.audioPlayer.duration);
                });
        
                // UI controls
                this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
                
                // Sidebar toggle
                this.toggleSidebarBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleSidebar();
                });
        
                this.bottomMenuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.sidebar.classList.remove('collapsed');
                    this.overlay.classList.add('active');
                });
        
                this.overlay.addEventListener('click', () => {
                    this.sidebar.classList.add('collapsed');
                    this.overlay.classList.remove('active');
                    this.songOptionsMenu.classList.remove('active');
                });
        
                // Volume control
                this.volumeSlider.addEventListener('input', (e) => {
                    this.audioPlayer.volume = e.target.value / 100;
                });
        
                // Time control
                this.timeSlider.addEventListener('input', (e) => {
                    const time = (this.audioPlayer.duration * e.target.value) / 100;
                    this.audioPlayer.currentTime = time;
                });
        
                // Skip buttons
                if (this.skipForwardBtn) {
                    this.skipForwardBtn.addEventListener('click', () => this.skipTime(10));
                }
                if (this.skipBackwardBtn) {
                    this.skipBackwardBtn.addEventListener('click', () => this.skipTime(-10));
                }
        
                // File upload
                if (this.fileInput) {
                    this.fileInput.addEventListener('change', (e) => this.handleLocalFileUpload(e));
                }
        
                // Song options menu
                document.addEventListener('click', (e) => {
                    if (e.target.closest('.song-options-btn')) {
                        e.stopPropagation();
                        const songCard = e.target.closest('.song-card');
                        const songId = parseFloat(songCard.dataset.id);
                        this.showSongOptions(songId);
                    } else if (!e.target.closest('.song-options-menu') && 
                              !e.target.closest('.song-options-btn')) {
                        this.songOptionsMenu.classList.remove('active');
                    }
                });
        
                // Close menu button
                const closeMenuBtn = this.songOptionsMenu.querySelector('.close-menu');
                if (closeMenuBtn) {
                    closeMenuBtn.addEventListener('click', () => {
                        this.songOptionsMenu.classList.remove('active');
                    });
                }
            }
        
            toggleSidebar() {
                const isMobile = window.innerWidth <= 768;
                this.sidebar.classList.toggle('collapsed');
                
                if (isMobile) {
                    this.overlay.classList.toggle('active');
                }
            }
        
            loadSong(index) {
                const song = this.songs[index];
                if (song) {
                    this.audioPlayer.src = song.audioUrl;
                    this.currentSongImg.src = song.imageUrl;
                    this.currentSongTitle.textContent = song.title;
                    this.currentSongArtist.textContent = song.artist;
                    
                    // Reset progress
                    this.timeSlider.value = 0;
                    this.progressBar.style.width = '0%';
                    
                    // Initialize volume
                    this.audioPlayer.volume = this.volumeSlider.value / 100;
                    
                    this.showNotification('Now Playing', song.title);
                }
            }
        
            togglePlay() {
                if (this.audioPlayer.paused) {
                    this.audioPlayer.play();
                    this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    this.audioPlayer.pause();
                    this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
                this.isPlaying = !this.audioPlayer.paused;
            }
        
            nextSong() {
                if (this.queue.length > 0) {
                    const nextSong = this.queue.shift();
                    const nextIndex = this.songs.findIndex(s => s.id === nextSong.id);
                    if (nextIndex !== -1) {
                        this.currentSongIndex = nextIndex;
                        this.loadSong(this.currentSongIndex);
                        if (this.isPlaying) this.togglePlay();
                    }
                } else {
                    this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
                    this.loadSong(this.currentSongIndex);
                    if (this.isPlaying) this.togglePlay();
                }
            }
        
            previousSong() {
                this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
                this.loadSong(this.currentSongIndex);
                if (this.isPlaying) this.togglePlay();
            }
        
            handleSearch(query) {
                const filteredSongs = this.songs.filter(song => 
                    song.title.toLowerCase().includes(query.toLowerCase()) ||
                    song.artist.toLowerCase().includes(query.toLowerCase())
                );
                this.renderSongs(filteredSongs);
            }
        
            updateProgress() {
                const { currentTime, duration } = this.audioPlayer;
                const progressPercent = (currentTime / duration) * 100;
                this.progressBar.style.width = `${progressPercent}%`;
                this.timeSlider.value = progressPercent;
                this.currentTimeEl.textContent = this.formatTime(currentTime);
            }
        
            formatTime(time) {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                return `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        
            skipTime(seconds) {
                this.audioPlayer.currentTime += seconds;
            }
        
            showNotification(title, message) {
                const notificationTitle = this.notification.querySelector('.notification-title');
                const notificationMessage = this.notification.querySelector('.notification-message');
                
                notificationTitle.textContent = title;
                notificationMessage.textContent = message;
                
                this.notification.classList.add('active');
                
                setTimeout(() => {
                    this.notification.classList.remove('active');
                }, 3000);
            }
        
            handleLocalFileUpload(event) {
                const files = event.target.files;
                for (let file of files) {
                    const localSong = {
                        id: Date.now() + Math.random(),
                        title: file.name.replace(/\.[^/.]+$/, ""),
                        artist: 'Local File',
                        imageUrl: 'https://via.placeholder.com/200',
                        audioUrl: URL.createObjectURL(file),
                        duration: '0:00',
                        isLocal: true
                    };
                    this.songs.push(localSong);
                }
                this.renderSongs();
                this.showNotification('Songs Added', `${files.length} songs uploaded successfully`);
            }
        
            showSongOptions(songId) {
                const song = this.songs.find(s => s.id === songId);
                if (!song) return;
        
                this.songOptionsMenu.classList.add('active');
                
                const menuItems = this.songOptionsMenu.querySelectorAll('li');
                menuItems.forEach(item => {
                    item.onclick = () => {
                        const action = item.dataset.action;
                        switch(action) {
                            case 'add-playlist':
                                this.showPlaylistModal(songId);
                                break;
                            case 'queue':
                                this.addToQueue(songId);
                                break;
                            case 'favorite':
                                this.toggleFavorite(songId);
                                break;
                            case 'share':
                                // Implement share functionality
                                break;
                        }
                        this.songOptionsMenu.classList.remove('active');
                    };
                });
            }
        
            renderSongs(songsToRender = this.songs) {
                this.songsGrid.innerHTML = songsToRender.map(song => `
                    <div class="song-card" data-id="${song.id}">
                        <div class="song-card-header">
                            <div class="song-image-container">
                                <img src="${song.imageUrl}" alt="${song.title}">
                                <div class="song-duration">${song.duration}</div>
                            </div>
                            <button class="song-options-btn">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                        </div>
                        <div class="song-details">
                            <h3>${song.title}</h3>
                            <p>${song.artist}</p>
                        </div>
                    </div>
                `).join('');
        
                this.songsGrid.querySelectorAll('.song-card').forEach(card => {
                    card.addEventListener('click', (e) => {
                        if (!e.target.closest('.song-options-btn')) {
                            const songId = parseFloat(card.dataset.id);
                            const songIndex = this.songs.findIndex(s => s.id === songId);
                            if (songIndex !== -1) {
                                this.currentSongIndex = songIndex;
                                this.loadSong(this.currentSongIndex);
                                this.togglePlay();
                            }
                        }
                    });
                });
            }
        
            addToQueue(songId) {
                const song = this.songs.find(s => s.id === songId);
                if (song) {
                    this.queue.push(song);
                    this.showNotification('Added to Queue', `${song.title} will play next`);
                }
            }
        
            toggleFavorite(songId) {
                if (this.favorites.has(songId)) {
                    this.favorites.delete(songId);
                    this.showNotification('Removed from Favorites', 'Song removed from your favorites');
                } else {
                    this.favorites.add(songId);
                    this.showNotification('Added to Favorites', 'Song added to your favorites');
                }
                localStorage.setItem('favorites', JSON.stringify([...this.favorites]));
            }
        
            loadPlaylists() {
                return JSON.parse(localStorage.getItem('playlists')) || [];
            }
        }
        
        // Initialize the player when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            const player = new MusicPlayer();
        });
