import { getCurrentUser } from './auth.js';

// Fetch all playlists
async function fetchPlaylists(category = null) {
  try {
    let query = supabase
      .from('playlists')
      .select('*');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { success: true, playlists: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Fetch user's custom playlists
async function fetchUserPlaylists() {
  const user = getCurrentUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  try {
    const { data, error } = await supabase
      .from('user_playlists')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw error;
    return { success: true, playlists: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Create a new playlist
async function createPlaylist(name, description, isPublic = false) {
  const user = getCurrentUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  try {
    const { data, error } = await supabase
      .from('user_playlists')
      .insert([
        {
          name,
          description,
          is_public: isPublic,
          user_id: user.id
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, playlist: data[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Add song to playlist
async function addSongToPlaylist(playlistId, songId) {
  const user = getCurrentUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  try {
    // Get current max position
    const { data: maxPos } = await supabase
      .from('playlist_items')
      .select('position')
      .eq('playlist_id', playlistId)
      .order('position', { ascending: false })
      .limit(1);

    const nextPosition = maxPos.length > 0 ? maxPos[0].position + 1 : 0;

    const { data, error } = await supabase
      .from('playlist_items')
      .insert([
        {
          playlist_id: playlistId,
          song_id: songId,
          position: nextPosition
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, item: data[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Remove song from playlist
async function removeSongFromPlaylist(playlistId, songId) {
  const user = getCurrentUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  try {
    const { error } = await supabase
      .from('playlist_items')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('song_id', songId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Update playlist details
async function updatePlaylist(playlistId, updates) {
  const user = getCurrentUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  try {
    const { data, error } = await supabase
      .from('user_playlists')
      .update(updates)
      .eq('id', playlistId)
      .eq('user_id', user.id)
      .select();

    if (error) throw error;
    return { success: true, playlist: data[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Delete playlist
async function deletePlaylist(playlistId) {
  const user = getCurrentUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  try {
    const { error } = await supabase
      .from('user_playlists')
      .delete()
      .eq('id', playlistId)
      .eq('user_id', user.id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export {
  fetchPlaylists,
  fetchUserPlaylists,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  updatePlaylist,
  deletePlaylist
}; 
