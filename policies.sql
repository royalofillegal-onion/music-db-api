-- Enable Row Level Security
alter table playlists enable row level security;
alter table recently_played enable row level security;
alter table user_playlists enable row level security;
alter table playlist_items enable row level security;
alter table user_favorites enable row level security;
alter table user_history enable row level security;

-- Playlists policies
create policy "Public playlists are viewable by everyone"
  on playlists for select
  using (true);

create policy "Users can insert their own playlists"
  on playlists for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own playlists"
  on playlists for update
  using (auth.uid() = user_id);

create policy "Users can delete their own playlists"
  on playlists for delete
  using (auth.uid() = user_id);

-- Recently Played policies
create policy "Users can view their own recently played"
  on recently_played for select
  using (auth.uid() = user_id);

create policy "Users can insert their own recently played"
  on recently_played for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own recently played"
  on recently_played for delete
  using (auth.uid() = user_id);

-- User Playlists policies
create policy "Users can view their own playlists"
  on user_playlists for select
  using (auth.uid() = user_id or is_public = true);

create policy "Users can insert their own playlists"
  on user_playlists for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own playlists"
  on user_playlists for update
  using (auth.uid() = user_id);

create policy "Users can delete their own playlists"
  on user_playlists for delete
  using (auth.uid() = user_id);

-- Playlist Items policies
create policy "Users can view items in their playlists"
  on playlist_items for select
  using (
    exists (
      select 1 from user_playlists
      where user_playlists.id = playlist_items.playlist_id
      and (user_playlists.user_id = auth.uid() or user_playlists.is_public = true)
    )
  );

create policy "Users can insert items in their playlists"
  on playlist_items for insert
  with check (
    exists (
      select 1 from user_playlists
      where user_playlists.id = playlist_items.playlist_id
      and user_playlists.user_id = auth.uid()
    )
  );

create policy "Users can update items in their playlists"
  on playlist_items for update
  using (
    exists (
      select 1 from user_playlists
      where user_playlists.id = playlist_items.playlist_id
      and user_playlists.user_id = auth.uid()
    )
  );

create policy "Users can delete items from their playlists"
  on playlist_items for delete
  using (
    exists (
      select 1 from user_playlists
      where user_playlists.id = playlist_items.playlist_id
      and user_playlists.user_id = auth.uid()
    )
  );

-- User Favorites policies
create policy "Users can view their own favorites"
  on user_favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert their own favorites"
  on user_favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own favorites"
  on user_favorites for delete
  using (auth.uid() = user_id);

-- User History policies
create policy "Users can view their own history"
  on user_history for select
  using (auth.uid() = user_id);

create policy "Users can insert their own history"
  on user_history for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own history"
  on user_history for delete
  using (auth.uid() = user_id); 
