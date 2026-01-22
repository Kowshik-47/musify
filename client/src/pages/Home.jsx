import React, { useEffect, useState } from 'react';
import SongCard from '../components/music/SongCard';
import PlaylistCard from '../components/music/PlaylistCard';

const Home = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  // Dummy data for demonstration
  useEffect(() => {
    // Replace with actual API calls
    setRecentlyPlayed([
      {
        _id: '1',
        title: 'Song 1',
        artist: 'Artist 1',
        albumArt: 'https://via.placeholder.com/200',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      {
        _id: '2',
        title: 'Song 2',
        artist: 'Artist 2',
        albumArt: 'https://via.placeholder.com/200',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      },
      // Add more dummy songs
    ]);

    setFeaturedPlaylists([
      {
        _id: '1',
        name: 'Today\'s Top Hits',
        coverImage: 'https://via.placeholder.com/200',
        description: 'The hottest tracks right now',
      },
      {
        _id: '2',
        name: 'Chill Vibes',
        coverImage: 'https://via.placeholder.com/200',
        description: 'Relax and unwind',
      },
      // Add more dummy playlists
    ]);
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-spotify-light-gray to-spotify-gray p-8">
      <h1 className="text-4xl font-bold mb-8">{greeting()}</h1>

      {/* Recently Played */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recentlyPlayed.map((song) => (
            <SongCard key={song._id} song={song} songs={recentlyPlayed} />
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;