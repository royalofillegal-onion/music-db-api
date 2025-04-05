-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Playlists table
create table playlists (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  artist text not null,
  cover_url text not null,
  audio_url text not null,
  category text not null,
  duration integer, -- Duration in seconds
  genre text,
  release_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade
);

-- Recently Played table
create table recently_played (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  playlist_id uuid references playlists(id) on delete cascade,
  played_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Playlists table (for custom playlists)
create table user_playlists (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  description text,
  cover_url text,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Playlist Items table (for custom playlists)
create table playlist_items (
  id uuid default uuid_generate_v4() primary key,
  playlist_id uuid references user_playlists(id) on delete cascade,
  song_id uuid references playlists(id) on delete cascade,
  position integer not null,
  added_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Favorites table
create table user_favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  playlist_id uuid references playlists(id) on delete cascade,
  added_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User History table
create table user_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  playlist_id uuid references playlists(id) on delete cascade,
  played_at timestamp with time zone default timezone('utc'::text, now()) not null,
  duration integer -- Duration played in seconds
);

-- Create indexes for better performance
create index idx_playlists_category on playlists(category);
create index idx_playlists_user on playlists(user_id);
create index idx_recently_played_user on recently_played(user_id);
create index idx_user_playlists_user on user_playlists(user_id);
create index idx_playlist_items_playlist on playlist_items(playlist_id);
create index idx_user_favorites_user on user_favorites(user_id);
create index idx_user_history_user on user_history(user_id); 
