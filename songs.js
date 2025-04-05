import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Supabase Configuration
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

// Song data functions
export async function fetchPlaylists(category = null) {
    try {
        let query = supabase
            .from('playlists')
            .select('*')
            .order('created_at', { ascending: false });

        if (category) {
            query = query.eq('category', category);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching playlists:', error);
        return { success: false, error: error.message };
    }
}

export async function fetchRecentlyPlayed(userId) {
    try {
        const { data, error } = await supabase
            .from('recently_played')
            .select(`
                playlist_id,
                played_at,
                playlists (
                    id,
                    title,
                    artist,
                    cover_url,
                    audio_url,
                    category,
                    duration
                )
            `)
            .eq('user_id', userId)
            .order('played_at', { ascending: false })
            .limit(10);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching recently played:', error);
        return { success: false, error: error.message };
    }
}

export async function logPlay(userId, playlistId) {
    try {
        const { data, error } = await supabase
            .from('recently_played')
            .insert([
                { 
                    user_id: userId,
                    playlist_id: playlistId,
                    played_at: new Date().toISOString()
                }
            ]);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error logging play:', error);
        return { success: false, error: error.message };
    }
}

export async function searchSongs(query) {
    try {
        const { data, error } = await supabase
            .from('playlists')
            .select('*')
            .or(`title.ilike.%${query}%,artist.ilike.%${query}%`);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error searching songs:', error);
        return { success: false, error: error.message };
    }
}

export async function getSongById(songId) {
    try {
        const { data, error } = await supabase
            .from('playlists')
            .select('*')
            .eq('id', songId)
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching song:', error);
        return { success: false, error: error.message };
    }
}

// Export supabase instance for direct use if needed
export { supabase }; 
