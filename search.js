// Search for songs and playlists
async function search(query) {
  try {
    // Search in playlists
    const { data: playlists, error: playlistsError } = await supabase
      .from('playlists')
      .select('*')
      .or(`title.ilike.%${query}%,artist.ilike.%${query}%`);

    if (playlistsError) throw playlistsError;

    // Search in user playlists
    const { data: userPlaylists, error: userPlaylistsError } = await supabase
      .from('user_playlists')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    if (userPlaylistsError) throw userPlaylistsError;

    return {
      success: true,
      results: {
        songs: playlists,
        playlists: userPlaylists
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Filter search results
function filterResults(results, filters) {
  let filtered = { ...results };

  if (filters.type) {
    if (filters.type === 'songs') {
      filtered.playlists = [];
    } else if (filters.type === 'playlists') {
      filtered.songs = [];
    }
  }

  if (filters.genre) {
    filtered.songs = filtered.songs.filter(song => 
      song.genre.toLowerCase() === filters.genre.toLowerCase()
    );
  }

  if (filters.category) {
    filtered.songs = filtered.songs.filter(song => 
      song.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  return filtered;
}

// Render search results
function renderResults(results) {
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  resultsContainer.innerHTML = '';

  // Render songs
  if (results.songs && results.songs.length > 0) {
    const songsSection = document.createElement('div');
    songsSection.className = 'search-section';
    songsSection.innerHTML = '<h3>Songs</h3>';

    const songsList = document.createElement('div');
    songsList.className = 'songs-list';

    results.songs.forEach(song => {
      const songElement = document.createElement('div');
      songElement.className = 'song-item';
      songElement.innerHTML = `
        <img src="${song.cover_url}" alt="${song.title}">
        <div class="song-info">
          <h4>${song.title}</h4>
          <p>${song.artist}</p>
        </div>
        <button onclick="player.playPlaylist([${JSON.stringify(song)}])">Play</button>
      `;
      songsList.appendChild(songElement);
    });

    songsSection.appendChild(songsList);
    resultsContainer.appendChild(songsSection);
  }

  // Render playlists
  if (results.playlists && results.playlists.length > 0) {
    const playlistsSection = document.createElement('div');
    playlistsSection.className = 'search-section';
    playlistsSection.innerHTML = '<h3>Playlists</h3>';

    const playlistsList = document.createElement('div');
    playlistsList.className = 'playlists-list';

    results.playlists.forEach(playlist => {
      const playlistElement = document.createElement('div');
      playlistElement.className = 'playlist-item';
      playlistElement.innerHTML = `
        <img src="${playlist.cover_url || 'default-playlist.jpg'}" alt="${playlist.name}">
        <div class="playlist-info">
          <h4>${playlist.name}</h4>
          <p>${playlist.description || ''}</p>
        </div>
        <button onclick="loadPlaylist('${playlist.id}')">View</button>
      `;
      playlistsList.appendChild(playlistElement);
    });

    playlistsSection.appendChild(playlistsList);
    resultsContainer.appendChild(playlistsSection);
  }

  if (!results.songs?.length && !results.playlists?.length) {
    resultsContainer.innerHTML = '<p>No results found</p>';
  }
}

// Handle search input
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value.trim();

  if (!query) return;

  search(query)
    .then(({ success, results, error }) => {
      if (success) {
        renderResults(results);
      } else {
        console.error('Search error:', error);
      }
    });
}

// Initialize search functionality
function initSearch() {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (e.target.value.trim().length >= 3) {
        handleSearch(e);
      }
    });
  }
}

export {
  search,
  filterResults,
  renderResults,
  handleSearch,
  initSearch
}; 
