const songDatabase = {
    songs: [
        {
            id: 1,
            title: "Test Song 1",
            artist: "Test Artist 1",
            cover: "https://picsum.photos/200?1",
            file: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
        },
        {
            id: 2,
            title: "Test Song 2",
            artist: "Test Artist 2",
            cover: "https://picsum.photos/200?2",
            file: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav"
        },
        {
            id: 3,
            title: "Test Song 3",
            artist: "Test Artist 3",
            cover: "https://picsum.photos/200?3",
            file: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"
        },
        {
            id: 4,
            title: "Test Song 4",
            artist: "Test Artist 4",
            cover: "https://picsum.photos/200?4",
            file: "https://www2.cs.uic.edu/~i101/SoundFiles/PinkPanther60.wav"
        },
        {
            id: 5,
            title: "Test Song 5",
            artist: "Test Artist 5",
            cover: "https://picsum.photos/200?5",
            file: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav"
        }
    ],

    searchSongs: function(searchTerm) {
        if (!searchTerm) return [];
        
        searchTerm = searchTerm.toLowerCase();
        return this.songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm)
        );
    },

    getSongById: function(id) {
        return this.songs.find(song => song.id === id);
    },

    getRandomSongs: function(count) {
        const shuffled = [...this.songs].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, shuffled.length));
    },

    getFeaturedPlaylists: function() {
        return [
            { id: 'p1', title: 'Test Playlist 1', description: 'Test Description 1', cover: 'https://picsum.photos/200?6' },
            { id: 'p2', title: 'Test Playlist 2', description: 'Test Description 2', cover: 'https://picsum.photos/200?7' },
            { id: 'p3', title: 'Test Playlist 3', description: 'Test Description 3', cover: 'https://picsum.photos/200?8' },
            { id: 'p4', title: 'Test Playlist 4', description: 'Test Description 4', cover: 'https://picsum.photos/200?9' }
        ];
    }
};

window.songDatabase = songDatabase;
