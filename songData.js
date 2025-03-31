// Song database with extended music collection
const songDatabase = {
    songs: [
        {
            id: 1,
            title: "Shape of You",
            artist: "Ed Sheeran",
            cover: "https://picsum.photos/200?1",
            file: "path/to/shape-of-you.mp3",
            duration: "3:53"
        },
        {
            id: 2,
            title: "Blinding Lights",
            artist: "The Weeknd",
            cover: "https://picsum.photos/200?2",
            file: "path/to/blinding-lights.mp3",
            duration: "3:20"
        },
        {
            id: 3,
            title: "Bad Guy",
            artist: "Billie Eilish",
            cover: "https://picsum.photos/200?3",
            file: "path/to/bad-guy.mp3",
            duration: "3:14"
        },
        {
            id: 4,
            title: "Stay",
            artist: "The Kid LAROI & Justin Bieber",
            cover: "https://picsum.photos/200?4",
            file: "path/to/stay.mp3",
            duration: "2:21"
        },
        {
            id: 5,
            title: "Levitating",
            artist: "Dua Lipa",
            cover: "https://picsum.photos/200?5",
            file: "path/to/levitating.mp3",
            duration: "3:23"
        },
        {
            id: 6,
            title: "Butter",
            artist: "BTS",
            cover: "https://picsum.photos/200?6",
            file: "path/to/butter.mp3",
            duration: "2:44"
        },
        {
            id: 7,
            title: "good 4 u",
            artist: "Olivia Rodrigo",
            cover: "https://picsum.photos/200?7",
            file: "path/to/good-4-u.mp3",
            duration: "2:58"
        },
        {
            id: 8,
            title: "Heat Waves",
            artist: "Glass Animals",
            cover: "https://picsum.photos/200?8",
            file: "path/to/heat-waves.mp3",
            duration: "3:59"
        },
        {
            id: 9,
            title: "Save Your Tears",
            artist: "The Weeknd & Ariana Grande",
            cover: "https://picsum.photos/200?9",
            file: "path/to/save-your-tears.mp3",
            duration: "3:35"
        },
        {
            id: 10,
            title: "Peaches",
            artist: "Justin Bieber",
            cover: "https://picsum.photos/200?10",
            file: "path/to/peaches.mp3",
            duration: "3:18"
        },
        {
            id: 11,
            title: "Dynamite",
            artist: "BTS",
            cover: "https://picsum.photos/200?11",
            file: "path/to/dynamite.mp3",
            duration: "3:19"
        },
        {
            id: 12,
            title: "drivers license",
            artist: "Olivia Rodrigo",
            cover: "https://picsum.photos/200?12",
            file: "path/to/drivers-license.mp3",
            duration: "4:02"
        },
        {
            id: 13,
            title: "Watermelon Sugar",
            artist: "Harry Styles",
            cover: "https://picsum.photos/200?13",
            file: "path/to/watermelon-sugar.mp3",
            duration: "2:54"
        },
        {
            id: 14,
            title: "Don't Start Now",
            artist: "Dua Lipa",
            cover: "https://picsum.photos/200?14",
            file: "path/to/dont-start-now.mp3",
            duration: "3:03"
        },
        {
            id: 15,
            title: "Mood",
            artist: "24kGoldn ft. iann dior",
            cover: "https://picsum.photos/200?15",
            file: "path/to/mood.mp3",
            duration: "2:21"
        }
    ],

    playlists: [
        {
            id: 'p1',
            title: 'Top Hits 2024',
            description: 'Popular hits',
            cover: 'https://picsum.photos/200?6'
        },
        {
            id: 'p2',
            title: 'Chill Vibes',
            description: 'Relaxing playlist',
            cover: 'https://picsum.photos/200?7'
        },
        {
            id: 'p3',
            title: 'Workout Mix',
            description: 'Energy boost',
            cover: 'https://picsum.photos/200?8'
        },
        {
            id: 'p4',
            title: 'Study Focus',
            description: 'Concentration music',
            cover: 'https://picsum.photos/200?9'
        }
    ],

    // Search functionality
    searchSongs: function(searchTerm) {
        if (!searchTerm) return [];
        
        searchTerm = searchTerm.toLowerCase();
        return this.songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm)
        );
    },

    // Get song by ID
    getSongById: function(id) {
        return this.songs.find(song => song.id === id);
    },

    // Get random songs
    getRandomSongs: function(count) {
        const shuffled = [...this.songs].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },

    // Get featured playlists
    getFeaturedPlaylists: function() {
        return this.playlists;
    },

    // Get trending songs (random selection for demo)
    getTrendingSongs: function(count = 10) {
        return this.getRandomSongs(count);
    },

    // Get recommended songs (random selection for demo)
    getRecommendedSongs: function(count = 10) {
        return this.getRandomSongs(count);
    }
};

// Make songDatabase globally available
window.songDatabase = songDatabase;
