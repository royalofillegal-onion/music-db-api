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
}
